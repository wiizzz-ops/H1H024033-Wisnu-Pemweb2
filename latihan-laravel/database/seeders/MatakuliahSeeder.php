<?php

namespace Database\Seeders;
use App\Models\Matakuliah;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MatakuliahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $daftar = [
            ['kode' => 'IF201', 'nama' => 'Pemrograman Web II', 'sks' => 3, 'semester' => 3],
            ['kode' => 'IF202', 'nama' => 'Basis Data', 'sks' => 3, 'semester' => 3],
            ['kode' => 'IF203', 'nama' => 'Struktur Data', 'sks' => 4, 'semester' => 2],
            ['kode' => 'IF204', 'nama' => 'Jaringan Komputer', 'sks' => 2, 'semester' => 4],
            ['kode' => 'IF205', 'nama' => 'Kecerdasan Buatan', 'sks' => 3, 'semester' => 5],
        ];

        foreach ($daftar as $item) {
            Matakuliah::create($item);
        }
    }
}
