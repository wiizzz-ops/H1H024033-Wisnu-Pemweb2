@extends('layouts.app')

@section('judul', 'Detail Mahasiswa')

@section('konten')
    <h1 class="h3 mb-1">{{ $mahasiswa->nama }}</h1>
    <p class="text-muted">{{ $mahasiswa->nim }} — {{ $mahasiswa->programStudi->nama }}</p>

    <h2 class="h5 mt-4 mb-3">Matakuliah yang Diambil</h2>
    <table class="table table-bordered bg-white">
        <thead>
            <tr>
                <th>Kode</th>
                <th>Nama</th>
                <th>SKS</th>
                <th>Nilai</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($mahasiswa->matakuliah as $mk)
                <tr>
                    <td>{{ $mk->kode }}</td>
                    <td>{{ $mk->nama }}</td>
                    <td>{{ $mk->sks }}</td>
                    <td>{{ $mk->pivot->nilai ?? '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="4">Belum mengambil matakuliah apa pun</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <a href="{{ route('mahasiswa.data') }}" class="btn btn-secondary mt-3">Kembali</a>
@endsection