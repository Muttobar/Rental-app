package handlers

import (
	"time"

	"github.com/Muttobar/Rental-app/backend/models"
	"github.com/gin-gonic/gin"
)

func GetFinancialReport(c *gin.Context) {
	var payments []models.Payment
	var result struct {
		TotalIncome     float64 `json:"total_income"`
		TimelyPayments  int     `json:"timely_payments"`
		OverduePayments int     `json:"overdue_payments"`
	}

	// Получаем все оплаченные платежи
	if err := DB.Where("paid = ?", true).Find(&payments).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	// Расчет показателей
	for _, p := range payments {
		result.TotalIncome += p.Amount
		if p.PaidDate.Before(p.DueDate) || p.PaidDate.Equal(p.DueDate) {
			result.TimelyPayments++
		} else {
			result.OverduePayments++
		}
	}

	c.JSON(200, gin.H{
		"report": result,
		"period": time.Now().Format("January 2006"),
	})
}
