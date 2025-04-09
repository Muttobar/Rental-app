package handlers

import (
	"github.com/Muttobar/Rental-app/backend/models"
	"github.com/gin-gonic/gin"
)

func UploadDocument(c *gin.Context) {
	var doc models.Document
	if err := c.ShouldBindJSON(&doc); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if result := DB.Create(&doc); result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(200, doc)
}
