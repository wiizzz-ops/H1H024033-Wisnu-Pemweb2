const profil = {
  laravel: {
    baseURL: import.meta.env.VITE_API_LARAVEL,
    kolomSandi: 'password',
    parameterHalaman: 'page',
    bacaMeta: (meta) => ({
      halaman: meta.current_page,
      totalHalaman: meta.last_page,
    }),
  },
  fiber: {
    baseURL: import.meta.env.VITE_API_FIBER,
    kolomSandi: 'kata_sandi',
    parameterHalaman: 'halaman',
    bacaMeta: (meta) => ({
      halaman: meta.halaman,
      totalHalaman: meta.total_halaman,
    }),
  },
}

const nama = import.meta.env.VITE_BACKEND || 'laravel'

export const namaBackend = nama

export default profil[nama]