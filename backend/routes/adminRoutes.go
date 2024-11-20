package routes

import (
	"parking_app/backend/handlers" 
	"github.com/gin-gonic/gin"
)

// SetupRoutes настраивает маршруты
func SetupRoutes(router *gin.Engine) {
	// Группа маршрутов для администрирования
	adminRoutes := router.Group("/admin")
	{
		// Маршрут для получения администратора по user_id
		adminRoutes.GET("/:user_id", handlers.GetAdminByUserIDHandler)
	}
}
