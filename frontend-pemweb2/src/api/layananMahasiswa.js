import backend from './backend'

export async function ambilDaftarMahasiswa({ halaman, cari, perHalaman }) {
  const parameter = { cari: cari, per_halaman: perHalaman }

  parameter[backend.parameterHalaman] = halaman

  const respons = await klien.get('/mahasiswa', { params: parameter })

  return {
    data: respons.data.data,
    meta: backend.bacaMeta(respons.data.meta),
  }
}

export async function ambilDetailMahasiswa(id) {
  const respons = await klien.get(`/mahasiswa/${id}`)

  return respons.data
}

export async function simpanMahasiswa(data) {
  const respons = await klien.post('/mahasiswa', data)

  return respons.data
}

export async function hapusMahasiswa(id) {
  const respons = await klien.delete(`/mahasiswa/${id}`)

  return respons.data
}