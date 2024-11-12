package handlers

import (
	// "fmt"
	"net/http"
	// "parking_app/backend/models"
	// "parking_app/backend/services"
	// "golang.org/x/crypto/bcrypt"
	// "encoding/json"
	
)

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	// var user models.User
	// decoder := json.NewDecoder(r.Body)
	// err := decoder.Decode(&user)
	// if err != nil {
	// 	http.Error(w, "Неверный формат данных", http.StatusBadRequest)
	// 	return
	// }

	// hash, err := bcrypt.GenerateFromPassword([]byte(user.PasswordHash), bcrypt.DefaultCost)
	// if err != nil {
	// 	http.Error(w, "Ошибка при хешировании пароля", http.StatusInternalServerError)
	// 	return
	// }

	// user.PasswordHash = string(hash)
	// db := services.ConnectToDB()
	// defer db.Close()

	// createdUser, err := services.CreateUser(db, user)
	// if err != nil {
	// 	http.Error(w, fmt.Sprintf("Ошибка при создании пользователя: %v", err), http.StatusInternalServerError)
	// 	return
	// }

	// // Возвращаем ответ с успешной регистрацией
	// w.WriteHeader(http.StatusOK)
	// json.NewEncoder(w).Encode(createdUser)
}
