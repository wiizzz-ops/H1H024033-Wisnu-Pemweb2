import klien from './klien'
import backend from './backend'

export async function login(email, kataSandi) {
  const isi = { email: email }

  isi[backend.kolomSandi] = kataSandi

  const respons = await klien.post('/auth/login', isi)

  return respons.data
}

export async function ambilProfil() {
  const respons = await klien.get('/auth/profil')

  return respons.data
}

export async function logout() {
  const respons = await klien.post('/auth/logout')

  return respons.data
}