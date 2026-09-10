<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MatakuliahController extends Controller
{
    protected array $daftarMatakuliah = [
        ['kode' => 'TK101', 'nama' => 'Pemrograman Web II', 'sks' => 3],
        ['kode' => 'TK102', 'nama' => 'Basis Data', 'sks' => 3],
        ['kode' => 'TK103', 'nama' => 'Manajemen Projek', 'sks' => 4],
        ['kode' => 'TK104', 'nama' => 'Jaringan Komputer', 'sks' => 2],
        ['kode' => 'TK105', 'nama' => 'Komputer Medis', 'sks' => 3],
    ];

    public function index(Request $request)
    {
        $kataKunci = $request->query('q', '');

        $hasil = $this->daftarMatakuliah;

        if ($kataKunci !== '') {
            $hasil = array_filter($hasil, function ($mk) use ($kataKunci) {
                return str_contains(strtolower($mk['nama']), strtolower($kataKunci))
                    || str_contains(strtolower($mk['kode']), strtolower($kataKunci));
            });
        }

        return view('matakuliah.index', [
            'daftarMatakuliah' => $hasil,
            'kataKunci' => $kataKunci,
        ]);
    }

    public function show(string $kode)
    {
        $matakuliah = collect($this->daftarMatakuliah)->firstWhere('kode', $kode);

        return view('matakuliah.show', [
            'matakuliah' => $matakuliah,
            'kode' => $kode,
        ]);
    }
}