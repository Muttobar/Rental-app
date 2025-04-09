package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/Muttobar/Rental-app/backend/handlers"
	"github.com/Muttobar/Rental-app/backend/models"
	"github.com/gin-contrib/cors"
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
	if err != nil {
		panic("DB connection failed")
	}
	handlers.DB = db

	// Автомиграция таблиц
	if err := db.AutoMigrate(
		&models.Tenant{},
		&models.Property{},
		&models.Payment{},
		&models.Document{},
	); err != nil {
		log.Fatal("Migration failed: ", err)

		// Инициализация роутера
		r := gin.Default()

		// CORS middleware ДОЛЖЕН БЫТЬ ПЕРЕД ОПРЕДЕЛЕНИЕМ РОУТОВ
		r.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"*"},
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
			AllowHeaders:     []string{"Origin", "Content-Type"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}))

		// Роуты
		r.POST("/tenants", handlers.CreateTenant)
		r.GET("/tenants", handlers.ListTenants)

		properties := r.Group("/properties")
		{
			properties.POST("/", handlers.CreateProperty)
			properties.GET("/", handlers.ListProperties)
		}

		payments := r.Group("/payments")
		{
			payments.POST("/", handlers.CreatePayment)
			payments.GET("/:tenantId", handlers.GetPayments)
		}

		documents := r.Group("/documents")
		{
			documents.POST("/", handlers.UploadDocument)
		}

		// Финансовый отчет
		r.GET("/report", handlers.GetFinancialReport)

		// Запуск сервера
		port := os.Getenv("PORT")
		fmt.Printf("Server running on :%s\n", port)
		r.Run(":" + port)
	}
}
