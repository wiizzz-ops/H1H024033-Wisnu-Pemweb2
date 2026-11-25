import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ambilDaftarMahasiswa, hapusMahasiswa } from '../api/layananMahasiswa'

export default function DaftarMahasiswa() {
  const [daftar, setDaftar] = useState([])
  const [meta, setMeta] = useState(null)
  const [halaman, setHalaman] = useState(1)
  const [cari, setCari] = useState('')
  const [versiMuat, setVersiMuat] = useState(0)
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const [pesanGalat, setPesanGalat] = useState('')
  const [pesanSukses, setPesanSukses] = useState('')

  useEffect(() => {
    let dibatalkan = false

    async function muatData() {
      setSedangMemuat(true)
      setPesanGalat('')

      try {
        const hasil = await ambilDaftarMahasiswa({
          halaman: halaman,
          cari: cari,
          perHalaman: 10,
        })

        if (dibatalkan === false) {
          setDaftar(hasil.data)
          setMeta(hasil.meta)
        }
      } catch (galat) {
        if (dibatalkan === false) {
          setPesanGalat('Gagal memuat data mahasiswa')
        }
      } finally {
        if (dibatalkan === false) {
          setSedangMemuat(false)
        }
      }
    }

    const penunda = setTimeout(muatData, 400)

    return () => {
      dibatalkan = true
      clearTimeout(penunda)
    }
  }, [halaman, cari, versiMuat])

  async function tanganiHapus(mahasiswa) {
    const yakin = window.confirm(`Hapus data ${mahasiswa.nama} (${mahasiswa.nim})?`)

    if (yakin === false) {
      return
    }

    setPesanGalat('')
    setPesanSukses('')

    try {
      await hapusMahasiswa(mahasiswa.id)

      setPesanSukses('Data mahasiswa berhasil dihapus')

      if (daftar.length === 1 && halaman > 1) {
        setHalaman(halaman - 1)
      } else {
        setVersiMuat(versiMuat + 1)
      }
    } catch (galat) {
      if (galat.response && galat.response.status === 403) {
        setPesanGalat('Anda tidak berwenang menghapus data ini')
      } else {
        setPesanGalat('Gagal menghapus data')
      }
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <h1>Daftar Mahasiswa</h1>

      <Link to="/mahasiswa/tambah">Tambah Mahasiswa</Link>

      <div style={{ marginTop: 12 }}>
        <input
          type="search"
          placeholder="Cari nama atau NIM"
          value={cari}
          onChange={(peristiwa) => {
            setHalaman(1)
            setCari(peristiwa.target.value)
          }}
        />
      </div>

      {sedangMemuat && <p>Memuat data</p>}

      {pesanGalat && <p style={{ color: 'crimson' }}>{pesanGalat}</p>}

      {pesanSukses && <p style={{ color: 'green' }}>{pesanSukses}</p>}

      {sedangMemuat === false && daftar.length === 0 && <p>Data tidak ditemukan</p>}

      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Angkatan</th>
            <th>IPK</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((mahasiswa) => (
            <tr key={mahasiswa.id}>
              <td>{mahasiswa.nim}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.angkatan}</td>
              <td>{mahasiswa.ipk}</td>
              <td>
                <button onClick={() => tanganiHapus(mahasiswa)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {meta && (
        <div style={{ marginTop: 16 }}>
          <button onClick={() => setHalaman(halaman - 1)} disabled={halaman <= 1}>
            Sebelumnya
          </button>

          <span style={{ margin: '0 12px' }}>
            Halaman {meta.halaman} dari {meta.totalHalaman}
          </span>

          <button
            onClick={() => setHalaman(halaman + 1)}
            disabled={meta.halaman >= meta.totalHalaman}
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  )
}