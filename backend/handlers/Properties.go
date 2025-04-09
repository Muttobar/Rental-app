package handlers

import (
	"github.com/Muttobar/Rental-app/backend/models"
	"github.com/gin-gonic/gin"
)

func CreateProperty(c *gin.Context) {
	var property models.Property
	if err := c.ShouldBindJSON(&property); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if result := DB.Create(&property); result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(200, property)
}

func ListProperties(c *gin.Context) {
	var properties []models.Property
	if result := DB.Preload("Photos").Find(&properties); result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(200, properties)
}
