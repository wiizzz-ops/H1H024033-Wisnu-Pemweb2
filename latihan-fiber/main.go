package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
)

func main () {
	app := fiber.New()

	app.Get("/", func(c fiber.Ctx) error {
		return c.SendString("IWAK TEMPIK!!")
	})

	app.Get("/api/info", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"aplikasi": "IWAK TEMPIK!!",
			"versi":    "1.0.0",
			"status":   "berjalan",
		})
	})
	log.Fatal(app.Listen(":3000"))
}