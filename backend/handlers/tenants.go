package handlers

import (
	"fmt"

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
