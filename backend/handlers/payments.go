package handlers

import (
	"github.com/Muttobar/Rental-app/backend/models"
	"github.com/gin-gonic/gin"
)

func CreatePayment(c *gin.Context) {
	var payment models.Payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if result := DB.Create(&payment); result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(200, payment)
}

func GetPayments(c *gin.Context) {
	tenantID := c.Param("tenantId")
	var payments []models.Payment
	if result := DB.Where("tenant_id = ?", tenantID).Find(&payments); result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(200, payments)
}
