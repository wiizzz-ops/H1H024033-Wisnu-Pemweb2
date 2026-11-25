export function normalisasiNama(nama) {
  return nama.toLowerCase().replace(/_/g, '')
}

export function ambilGalatValidasi(galat) {
  const hasil = {}
  const isi = galat.response && galat.response.data ? galat.response.data.galat : null

  if (!isi) {
    return hasil
  }

  if (Array.isArray(isi)) {
    isi.forEach((item) => {
      hasil[normalisasiNama(item.field)] = item.pesan
    })
  } else {
    Object.keys(isi).forEach((kunci) => {
      hasil[normalisasiNama(kunci)] = Array.isArray(isi[kunci]) ? isi[kunci][0] : isi[kunci]
    })
  }

  return hasil
}