package handlers

import (
    "fmt"
    "parking_app/backend/models"
    "parking_app/backend/services"
    "parking_app/backend/db"
    "golang.org/x/crypto/bcrypt"
    "github.com/gin-gonic/gin"
    "net/http"
)

func RegisterHandler(c *gin.Context) {
    var user models.User
    err := c.ShouldBindJSON(&user)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Неверный формат данных",
        })
        return
    }

    hash, err := bcrypt.GenerateFromPassword([]byte(user.PasswordHash), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Ошибка при хешировании пароля",
        })
        return
    }

    user.PasswordHash = string(hash)

    dbConn, err := db.ConnectToDB()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": fmt.Sprintf("Ошибка при подключении к базе данных: %v", err),
        })
        return
    }
    defer dbConn.Close()

    createdUser, err := services.CreateUser(dbConn, user)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": fmt.Sprintf("Ошибка при создании пользователя: %v", err),
        })
        return
    }

    // Ответ с созданным пользователем
    c.JSON(http.StatusOK, createdUser)
}
