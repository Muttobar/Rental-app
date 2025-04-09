package handlers

import (
	"fmt"
	"math"
	"time"

	"github.com/Muttobar/Rental-app/backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var DB *gorm.DB // Инициализируйте в main.go

func CreateTenant(c *gin.Context) {
	fmt.Println("Получен запрос на создание арендатора") // Логирование
	var tenant models.Tenant
	if err := c.ShouldBindJSON(&tenant); err != nil {
		fmt.Println("Ошибка парсинга JSON:", err) // Логирование
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	fmt.Printf("Создаем арендатора: %+v\n", tenant) // Логирование
	result := DB.Create(&tenant)
	if result.Error != nil {
		fmt.Println("Ошибка базы данных:", result.Error) // Логирование
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	fmt.Println("Успешно создан арендатор ID:", tenant.ID) // Логирование
	c.JSON(200, tenant)
}

func ListTenants(c *gin.Context) {
	var tenants []models.Tenant
	result := DB.Find(&tenants)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(200, tenants)
}
func CalculateRating(tenantID uint) float64 {
	var payments []models.Payment
	DB.Where("tenant_id = ? AND paid = ?", tenantID, true).Find(&payments)

	timelyPayments := 0
	for _, p := range payments {
		if p.PaidDate.Before(p.DueDate) || p.PaidDate.Equal(p.DueDate) {
			timelyPayments++
		}
	}

	var tenant models.Tenant
	if result := DB.First(&tenant, tenantID); result.Error != nil {
		return 0.0, result.Error // Добавить обработку ошибки
	}
	leaseDuration := time.Since(tenant.CreatedAt).Hours() / 24 / 30 // Месяцы
	if len(payments) == 0 {
		return 5.0 // Дефолтный рейтинг
	}
	rating := float64(timelyPayments)/float64(len(payments))*0.7 + (leaseDuration * 0.3)
	return math.Min(rating, 5.0) // Максимум 5 звезд
}
