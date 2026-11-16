package router

import (
    "github.com/gofiber/fiber/v3"

    "latihan-fiber-api/internal/handler"
    "latihan-fiber-api/internal/middleware"
)

func Daftarkan(app *fiber.App, kunciApi string) {
    api := app.Group("/api")

    api.Get("/status", func(c fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "sukses": true,
            "pesan":  "API Fiber aktif",
        })
    })

    mahasiswa := api.Group("/mahasiswa", middleware.KunciApi(kunciApi))

    mahasiswa.Get("/", handler.DaftarMahasiswa)
    mahasiswa.Post("/", handler.BuatMahasiswa)
    mahasiswa.Get("/:id", handler.DetailMahasiswa)
    mahasiswa.Put("/:id", handler.PerbaruiMahasiswa)
    mahasiswa.Delete("/:id", handler.HapusMahasiswa)
    mahasiswa.Post("/:id/pulihkan", handler.PulihkanMahasiswa)

    matakuliah := api.Group("/matakuliah", middleware.KunciApi(kunciApi))

    matakuliah.Get("/", handler.DaftarMatakuliah)
    matakuliah.Post("/", handler.BuatMatakuliah)
    matakuliah.Get("/:id", handler.DetailMatakuliah)
    matakuliah.Put("/:id", handler.PerbaruiMatakuliah)
    matakuliah.Delete("/:id", handler.HapusMatakuliah)

    programStudi := api.Group("/program-studi", middleware.KunciApi(kunciApi))

    programStudi.Get("/", handler.DaftarProgramStudi)
}