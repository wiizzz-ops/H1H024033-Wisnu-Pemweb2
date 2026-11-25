import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { simpanMahasiswa } from '../api/layananMahasiswa'
import { ambilGalatValidasi, normalisasiNama } from '../api/galat'

const daftarKolom = [
  { nama: 'program_studi_id', label: 'ID Program Studi', tipe: 'number' },
  { nama: 'nim', label: 'NIM', tipe: 'text' },
  { nama: 'nama', label: 'Nama', tipe: 'text' },
  { nama: 'email', label: 'Email', tipe: 'email' },
  { nama: 'angkatan', label: 'Angkatan', tipe: 'number' },
  { nama: 'ipk', label: 'IPK', tipe: 'number' },
]

export default function TambahMahasiswa() {
  const [form, setForm] = useState({
    program_studi_id: '',
    nim: '',
    nama: '',
    email: '',
    angkatan: '',
    ipk: '',
  })
  const [galatField, setGalatField] = useState({})
  const [pesanGalat, setPesanGalat] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)

  const navigasi = useNavigate()

  function ubahNilai(peristiwa) {
    setForm({ ...form, [peristiwa.target.name]: peristiwa.target.value })
  }

  async function tanganiKirim(peristiwa) {
    peristiwa.preventDefault()

    setPesanGalat('')
    setGalatField({})
    setSedangMemuat(true)

    const data = {
      program_studi_id: Number(form.program_studi_id),
      nim: form.nim,
      nama: form.nama,
      email: form.email,
      angkatan: Number(form.angkatan),
      ipk: Number(form.ipk),
    }

    try {
      await simpanMahasiswa(data)

      navigasi('/mahasiswa')
    } catch (galat) {
      if (galat.response && galat.response.status === 422) {
        setGalatField(ambilGalatValidasi(galat))
        setPesanGalat(galat.response.data.pesan)
      } else if (galat.response) {
        const isi = galat.response.data
        setPesanGalat(isi.pesan || isi.message || 'Terjadi kesalahan pada server')
      } else {
        setPesanGalat('Tidak dapat menghubungi server')
      }
    } finally {
      setSedangMemuat(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h1>Tambah Mahasiswa</h1>

      {pesanGalat && <p style={{ color: 'crimson' }}>{pesanGalat}</p>}

      <form onSubmit={tanganiKirim} noValidate>
        {daftarKolom.map((kolom) => (
          <div key={kolom.nama} style={{ marginBottom: 12 }}>
            <label htmlFor={kolom.nama}>{kolom.label}</label>
            <br />
            <input
              id={kolom.nama}
              name={kolom.nama}
              type={kolom.tipe}
              step={kolom.nama === 'ipk' ? '0.01' : undefined}
              value={form[kolom.nama]}
              onChange={ubahNilai}
            />
            {galatField[normalisasiNama(kolom.nama)] && (
              <div style={{ color: 'crimson', fontSize: 13 }}>
                {galatField[normalisasiNama(kolom.nama)]}
              </div>
            )}
          </div>
        ))}

        <button type="submit" disabled={sedangMemuat}>
          {sedangMemuat ? 'Menyimpan' : 'Simpan'}
        </button>{' '}
        <Link to="/mahasiswa">Batal</Link>
      </form>
    </div>
  )
}