package routes

import (
    "parking_app/backend/handlers"
    "github.com/gin-gonic/gin"
    "parking_app/backend/middlewares"
)

func RegisterRoutes(r *gin.Engine) {
    r.POST("/register", handlers.RegisterHandler)
    r.POST("/login", handlers.LoginHandler)
    r.GET("/me",middleware.AuthMiddleware(),handlers.MeHandler)
}
