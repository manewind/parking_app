
package services

import (
	"database/sql"
	"fmt"
	"time"
	"parking_app/backend/models"
)


func CreateUser(db *sql.DB, user models.User) (*models.User, error) {
	query := `
		INSERT INTO users (username, password_hash, email, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?)
		`
	_, err := db.Exec(query, user.Username, user.PasswordHash, user.Email, time.Now(), time.Now())
	if err != nil {
		return nil, fmt.Errorf("ошибка при создании пользователя: %v", err)
	}
	return &user, nil
}

func GetUserByUsername(db *sql.DB, username string) (*models.User, error) {
	var user models.User
	query := `SELECT id, username, password_hash, email, created_at, updated_at FROM users WHERE username = ?`
	err := db.QueryRow(query, username).Scan(&user.ID, &user.Username, &user.PasswordHash, &user.Email, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil 
		}
		return nil, fmt.Errorf("ошибка при получении пользователя: %v", err)
	}
	return &user, nil
}


func UpdateUser(db *sql.DB, user models.User) error {
	query := `UPDATE users SET password_hash = ?, email = ?, updated_at = ? WHERE username = ?`
	_, err := db.Exec(query, user.PasswordHash, user.Email, time.Now(), user.Username)
	if err != nil {
		return fmt.Errorf("ошибка при обновлении пользователя: %v", err)
	}
	return nil
}
