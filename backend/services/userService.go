package services

import (
    "database/sql"
    "parking_app/backend/models"
    "fmt"
)

// CreateUser создает нового пользователя в базе данных.
func CreateUser(db *sql.DB, user models.User) (models.User, error) {
    query := `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`
    result, err := db.Exec(query, user.Username, user.Email, user.PasswordHash)
    if err != nil {
        return models.User{}, fmt.Errorf("ошибка при создании пользователя: %v", err)
    }

    lastInsertID, err := result.LastInsertId()
    if err != nil {
        return models.User{}, fmt.Errorf("не удалось получить ID вставленного пользователя: %v", err)
    }

    user.ID = int(lastInsertID)
    return user, nil
}
