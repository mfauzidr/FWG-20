const hargaMakanan = 75000;
const kodeVoucher = 'FAZZFOOD50';
const jarakPengiriman = 5;
const dikenakanPajak = true;

const FazzFood = (harga, voucher, jarak, pajak) => {
    const hitungDiskon = (harga, voucher) => {
        if (voucher === 'FAZZFOOD50' && harga >= 50000) {
            return Math.min(harga * 0.5, 50000);
        }
        if (voucher === 'DITRAKTIR60' && harga >= 25000) {
            return Math.min(harga * 0.6, 30000);
        }
        return 0;
    };

    const minBiayaPengiriman = 5000;

    const hitungBiayaPengiriman = (jarak) => {
        return minBiayaPengiriman + Math.max(0, jarak - 2) * 3000;
    };

    const hitungTotalBiaya = (harga, diskon, biayaPengiriman, pajak) => {
        if (pajak) {
            harga = harga + (harga * 0.05) - diskon + biayaPengiriman;
        }
        return harga - diskon + biayaPengiriman;
    };

    const diskon = hitungDiskon(harga, voucher);
    const biayaPengiriman = hitungBiayaPengiriman(jarak);

    const totalBiaya = hitungTotalBiaya(harga, diskon, biayaPengiriman, pajak);
    const pajakValue = pajak ? harga * 0.05 : 0;

    return {
        harga: harga,
        diskon: diskon,
        biayaPengiriman: biayaPengiriman,
        pajak: pajakValue,
        totalBiaya: totalBiaya
    };
};

const cetakDetailPesanan = (detail) => {
    console.log("Harga: " + detail.harga);
    console.log("Diskon: " + detail.diskon);
    console.log("Biaya Pengiriman: " + detail.biayaPengiriman);
    console.log("Pajak: " + detail.pajak);
    console.log("Total Biaya: " + detail.totalBiaya);
};

const detailPesanan = FazzFood(hargaMakanan, kodeVoucher, jarakPengiriman, dikenakanPajak);
cetakDetailPesanan(detailPesanan);