package main

import (
	"database/sql"
	"fmt"
	"log"
)

func CreateTables(db *sql.DB) {
	tables := []string{
		`IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'users' AND xtype = 'U')
		CREATE TABLE users (
			id INT PRIMARY KEY IDENTITY(1,1),
			username VARCHAR(50) UNIQUE NOT NULL,
			password_hash VARCHAR(255) NOT NULL,
			email VARCHAR(100) UNIQUE,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		`IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'admins' AND xtype = 'U')
		CREATE TABLE admins (
			id INT PRIMARY KEY IDENTITY(1,1),
			user_id INT FOREIGN KEY REFERENCES users(id),
			role VARCHAR(50),
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		`IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'parking_slots' AND xtype = 'U')
		CREATE TABLE parking_slots (
			id INT PRIMARY KEY IDENTITY(1,1),
			slot_number INT NOT NULL,
			is_occupied BIT DEFAULT 0,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		`IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'vehicles' AND xtype = 'U')
		CREATE TABLE vehicles (
			id INT PRIMARY KEY IDENTITY(1,1),
			user_id INT FOREIGN KEY REFERENCES users(id),
			license_plate VARCHAR(20) UNIQUE NOT NULL,
			vehicle_type VARCHAR(50),
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		
	}

	for _, query := range tables {
		_, err := db.Exec(query)
		if err != nil {
			log.Fatalf("Ошибка при создании таблицы: %v", err)
		}
		fmt.Println("Таблица создана успешно!")
	}
}
