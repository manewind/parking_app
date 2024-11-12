    package main

    import (
        "database/sql"
        "fmt"
        "log"
        "net/http"

        "github.com/gin-gonic/gin"
        _ "github.com/denisenkom/go-mssqldb" 
    )


    func getTables(db *sql.DB) ([]string, error) {
        rows, err := db.Query(`
            SELECT TABLE_NAME
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_TYPE = 'BASE TABLE' 
              AND TABLE_NAME NOT LIKE 'spt_%' 
              AND TABLE_NAME NOT IN ('MSreplication_options')`)
        if err != nil {
            return nil, fmt.Errorf("ошибка при выполнении запроса: %v", err)
        }
        defer rows.Close()
    
        var tables []string
        for rows.Next() {
            var tableName string
            if err := rows.Scan(&tableName); err != nil {
                return nil, fmt.Errorf("ошибка при сканировании строки: %v", err)
            }
            tables = append(tables, tableName)
        }
    
        if err := rows.Err(); err != nil {
            return nil, fmt.Errorf("ошибка при обработке результатов: %v", err)
        }
    
        return tables, nil
    }
    

    func main() {
        db := connectToDB()
        defer db.Close()

        var result int
        err := db.QueryRow("SELECT 1").Scan(&result)
        if err != nil {
            log.Fatalf("Ошибка при выполнении тестового запроса: %v\n", err)
        } else {
            fmt.Printf("Соединение с базой данных установлено, результат запроса: %d\n", result)
        }

        
        r := gin.Default()

        
        r.GET("/tables", func(c *gin.Context) {
            tables, err := getTables(db)
            if err != nil {
                c.JSON(http.StatusInternalServerError, gin.H{
                    "error": fmt.Sprintf("Ошибка при получении таблиц: %v", err),
                })
                return
            }

            
            c.JSON(http.StatusOK, gin.H{
                "tables": tables,
            })
        })

        
        r.GET("/ping", func(c *gin.Context) {
            c.JSON(http.StatusOK, gin.H{
                "message": "pong",
            })
        })

        
        err = r.Run(":8080")
        if err != nil {
            log.Fatalf("Ошибка при запуске сервера: %v\n", err)
        }
    }
