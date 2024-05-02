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
            harga += harga * 0.05;
        }
        return harga - diskon + biayaPengiriman;
    };

    const diskon = hitungDiskon(harga, voucher);
    const biayaPengiriman = hitungBiayaPengiriman(jarak);

    return hitungTotalBiaya(harga, diskon, biayaPengiriman, pajak);
};

const hargaMakanan = 50000;
const kodeVoucher = 'FAZZFOOD50';
const jarakPengiriman = 4;
const dikenakanPajak = true;
const totalBiaya = FazzFood(hargaMakanan, kodeVoucher, jarakPengiriman, dikenakanPajak);
console.log("Total Biaya: " + totalBiaya);
