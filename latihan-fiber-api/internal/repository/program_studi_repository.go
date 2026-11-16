package repository

import (
    "time"

    "latihan-fiber-api/internal/config"
    "latihan-fiber-api/internal/model"
)

type ProgramStudiDenganJumlah struct {
    ID              uint      `json:"id"`
    Kode            string    `json:"kode"`
    Nama            string    `json:"nama"`
    Jenjang         string    `json:"jenjang"`
    JumlahMahasiswa int64     `json:"jumlah_mahasiswa"`
    CreatedAt       time.Time `json:"dibuat_pada"`
    UpdatedAt       time.Time `json:"diubah_pada"`
}

func AmbilProgramStudi() ([]ProgramStudiDenganJumlah, error) {
    var daftar []ProgramStudiDenganJumlah

    err := config.DB.Model(&model.ProgramStudi{}).
        Select("program_studi.id, program_studi.kode, program_studi.nama, program_studi.jenjang, program_studi.created_at, program_studi.updated_at, COUNT(mahasiswa.id) AS jumlah_mahasiswa").
        Joins("LEFT JOIN mahasiswa ON mahasiswa.program_studi_id = program_studi.id AND mahasiswa.deleted_at IS NULL").
        Group("program_studi.id").
        Order("program_studi.nama ASC").
        Scan(&daftar).Error

    if err != nil {
        return nil, err
    }

    return daftar, nil
}
