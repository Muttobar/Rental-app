package handlers

import (
	"rental-app/backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var DB *gorm.DB // Инициализируйте в main.go

func CreateTenant(c *gin.Context) {
	var tenant models.Tenant
	if err := c.ShouldBindJSON(&tenant); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result := DB.Create(&tenant)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

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
