const hitungDiskon = (harga, voucher) => {
    if (voucher === 'FAZZFOOD50' && harga >= 50000) {
        return Math.min(harga * 0.5, 50000)
    } else if (voucher === 'DITRAKTIR60' && harga >= 25000) {
        return Math.min(harga * 0.6, 30000)
    }
    return 0
}
const hitungBiayaPengiriman = (jarak) => {
    return 5000 + Math.max(0, jarak - 2) * 3000
}
const hitungTotalBiaya = (harga, voucher, jarak, pajak, callbackDiskon, callbackBiayaPengiriman) => {
    const diskon = callbackDiskon(harga, voucher)
    const biayaPengiriman = callbackBiayaPengiriman(jarak)
    if (pajak) {
        harga += harga * 0.05
    }
    return harga - diskon + biayaPengiriman
}
const hargaMakanan = 60000
const kodeVoucher = 'FAZZFOOD50'
const jarakPengiriman = 4
const dikenakanPajak = true
const totalBiaya = hitungTotalBiaya(hargaMakanan, kodeVoucher, jarakPengiriman, dikenakanPajak, hitungDiskon, hitungBiayaPengiriman)
console.log("Total Biaya: " + totalBiaya)

