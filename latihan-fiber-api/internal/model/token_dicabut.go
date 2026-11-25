package model

import "time"

type TokenDicabut struct {
    ID          uint      `gorm:"primaryKey"`
    HashToken   string    `gorm:"size:64;uniqueIndex"`
    Kedaluwarsa time.Time `gorm:"index"`
    CreatedAt   time.Time
}
