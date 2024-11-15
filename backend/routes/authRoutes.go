package routes

import (
    "parking_app/backend/handlers"
    "github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
    r.POST("/register", handlers.RegisterHandler)
}
