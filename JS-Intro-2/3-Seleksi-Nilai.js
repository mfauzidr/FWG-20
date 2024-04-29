const seleksiNilai = (nilaiAwal, nilaiAkhir, dataArray) => {
    if (typeof nilaiAwal !== 'number' || typeof nilaiAkhir !== 'number') {
        return console.log("nilaiAwal dan nilaiAkhir harus berupa angka!")
    }
    if (!Array.isArray(dataArray)) {
        return console.log("dataArray harus berupa array!")
    }
    if (nilaiAwal > nilaiAkhir) {
        return console.log("Nilai akhir harus lebih besar dari nilai awal!")
    }
    if (dataArray.length <= 5) {
        return console.log("Jumlah angka dalam dataArray harus lebih dari 5")
    }
    const hasilSeleksi = []
    dataArray.forEach((nilai) => {
        if (nilai >= nilaiAwal && nilai <= nilaiAkhir) {
            hasilSeleksi.push(nilai)
        }
    })

    if (hasilSeleksi.length === 0) {
        return console.log("Nilai tidak ditemukan")
    }

    hasilSeleksi.sort((a, b) => a - b)
    return console.log(hasilSeleksi)
}

seleksiNilai(5, 20, [2, 25, 4, 14, 17, 30, 8])
seleksiNilai(15, 3, [2, 25, 4, 14, 17, 30, 8])
seleksiNilai(4, 17, [2, 25, 4])
seleksiNilai(5, 17, [2, 25, 4, 1, 30, 18])



