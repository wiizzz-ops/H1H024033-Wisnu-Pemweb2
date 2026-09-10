<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function index()
    {
        $daftarMahasiswa = [
            ['nim' => 'H1H024006', 'nama' => 'Bahtiar', 'angkatan' => 2009],
            ['nim' => 'H1H024048', 'nama' => 'Yoga', 'angkatan' => 2000],
            ['nim' => 'H1H024067', 'nama' => 'Dedi', 'angkatan' => 1965],
        ];

        return view('mahasiswa.index', ['daftarMahasiswa' => $daftarMahasiswa]);
    }
    public function show(string $nim)
    {
        return view('mahasiswa.show', ['nim' => $nim]);
    }

    public function cari(Request $request)
    {
        $kataKunci = $request->query('q', '');

        return response()->json([
            'kata_kunci' => $kataKunci,
            'metode' => $request->method(),
            'path' => $request->path(),
        ]);
    }
}
?>