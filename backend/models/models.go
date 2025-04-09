package models

import "time"

type Tenant struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	Rating    float64   `gorm:"default:5.0" json:"rating"` // Комментарий ВНЕ тега
}

type Property struct {
	ID          uint       `gorm:"primaryKey" json:"id"`
	Address     string     `json:"address" binding:"required"`
	Size        float64    `json:"size"`
	Price       float64    `json:"price"`
	Description string     `json:"description"`
	TenantID    uint       `json:"tenant_id"` // Добавим связь с арендатором
	Photos      []Document `json:"photos" gorm:"foreignKey:PropertyID"`
}

type Payment struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	Amount     float64   `json:"amount" binding:"required"`
	DueDate    time.Time `json:"due_date" binding:"required"`
	Paid       bool      `json:"paid" gorm:"default:false"`
	PaidDate   time.Time `json:"paid_date"`
	TenantID   uint      `json:"tenant_id"`
	PropertyID uint      `json:"property_id"`
}

type Document struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	URL        string `json:"url" binding:"required"`
	Type       string `json:"type"`
	TenantID   uint   `json:"tenant_id"`
	PropertyID uint   `json:"property_id"`
}
