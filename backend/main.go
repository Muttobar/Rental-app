package main

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Модели данных
type Tenant struct {
	ID        uint      `gorm:"primaryKey"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
}

func main() {
	// Подключение к PostgreSQL
	dsn := "host=localhost user=postgres password=postgres dbname=rental port=5432"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}
	db.AutoMigrate(&Tenant{})

	// Роутер Gin
	r := gin.Default()

	// Пример API
	r.POST("/tenants", func(c *gin.Context) {
		var tenant Tenant
		if err := c.ShouldBindJSON(&tenant); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		db.Create(&tenant)
		c.JSON(200, tenant)
	})

	fmt.Println("Server running on :8080")
	r.Run(":8080")
}
