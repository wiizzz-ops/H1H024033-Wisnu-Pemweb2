<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MahasiswaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $fields = $request->filled('fields')
            ? array_map('trim', explode(',', $request->query('fields')))
            : null;

        $tampilkan = fn (string $nama) => is_null($fields) || in_array($nama, $fields, true);

        return [
            'id' => $this->id,
            'nim' => $this->when($tampilkan('nim'), $this->nim),
            'nama' => $this->when($tampilkan('nama'), $this->nama),
            'email' => $this->when($tampilkan('email'), $this->email),
            'angkatan' => $this->when($tampilkan('angkatan'), $this->angkatan),
            'ipk' => $this->when($tampilkan('ipk'), (float) $this->ipk),
            'aktif' => $this->when($tampilkan('aktif'), $this->aktif),
            'program_studi' => $this->whenLoaded('programStudi', function () {
                return [
                    'id' => $this->programStudi->id,
                    'kode' => $this->programStudi->kode,
                    'nama' => $this->programStudi->nama,
                ];
            }),
            'dibuat_pada' => $this->when($tampilkan('dibuat_pada'), $this->created_at->toIso8601String()),
        ];
    }
}