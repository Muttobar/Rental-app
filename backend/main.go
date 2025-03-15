package main

import (
	"fmt"
	"os"

	"rental-app/backend/handlers"
	"rental-app/backend/models"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Загрузка .env файла
	godotenv.Load()

	// Подключение к БД
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s",
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB"),
		os.Getenv("POSTGRES_PORT"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	handlers.DB = db
	if err != nil {
		panic("DB connection failed")
	}

	// Автомиграция таблиц
	db.AutoMigrate(&models.Tenant{}, &models.Property{}, &models.Payment{}, &models.Document{})

	// Инициализация роутера
	r := gin.Default()

	// Роуты для арендаторов
	r.POST("/tenants", handlers.CreateTenant)
	r.GET("/tenants", handlers.ListTenants)

	// Запуск сервера
	port := os.Getenv("PORT")
	fmt.Printf("Server running on :%s\n", port)
	r.Run(":" + port)
}
