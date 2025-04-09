package handlers

import (
	"github.com/Muttobar/Rental-app/backend/models"
	"github.com/gin-gonic/gin"
)

func GetFinancialReport(c *gin.Context) {
	var result struct {
		TotalIncome float64
		AvgPayment  float64
		PaidCount   int64
	}

	DB.Model(&models.Payment{}).
		Select("SUM(amount) as total_income, AVG(amount) as avg_payment, COUNT(*) as paid_count").
		Where("paid = ?", true).
		Scan(&result)

	c.JSON(200, result)
}
