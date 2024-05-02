const cekHariKerja = (day) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dataDay = ['senin', 'selasa', 'rabu', 'kamis', 'jumat']
            let cek = dataDay.find((item) => {
                return item === day
            })
            if (cek) {
                resolve(cek)
            } else {
                reject(new Error('Hari ini bukan hari kerja'))
            }
        }, 3000)
    })
}

//then catch
cekHariKerja('senin')
    .then((hasil) => {
        console.log('Hari kerja:', hasil);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
//then disini jika kita berhasil menemukan hari kerja (contohnya "senin"), maka blok kode dalam then akan dijalankan yaitu mencetak pesan "Hari kerja: [hari]" di mana [hari] adalah hari yang ditemukan.

//catch disini saat input kita adalah hari yang bukan hari kerja (misalnya "minggu"), maka blok kode dalam catch akan dijalankan yaitu mencetak pesan kesalahan yang memberitahu kita bahwa 'Hari ini bukan hari kerja'.

// try catch
const checkHariKerja = async (day) => {
    try {
        const result = await cekHariKerja(day)
        console.log(`${result} adalah hari kerja.`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
};
//pada try catch ini, kita menggunakan try untuk mencoba sesuatu dan catch untuk menangkap masalah jika ada.
//kita menggunakan await untuk menunggu hingga kita mendapatkan jawaban apakah hari tersebut adalah hari kerja atau bukan. Jika jawabannya adalah hari kerja, kita mencetak pesan positif. Namun, jika jawabannya bukan hari kerja, kita mencetak pesan kesalahan

checkHariKerja('senin')
checkHariKerja('minggu')

