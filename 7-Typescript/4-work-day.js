"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cekHariKerja = (day) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dataDay = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
            let cek = dataDay.find((item) => {
                return item === day;
            });
            if (cek) {
                resolve(cek);
            }
            else {
                reject(new Error('Hari ini bukan hari kerja'));
            }
        }, 3000);
    });
};
cekHariKerja('senin')
    .then((hasil) => {
    console.log('Hari kerja:', hasil);
})
    .catch((error) => {
    console.error('Error:', error.message);
});
const checkHariKerja = (day) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cekHariKerja(day);
        console.log(`${result} adalah hari kerja.`);
    }
    catch (error) {
        const errMessage = error.message;
        console.error(`Error: ${errMessage}`);
    }
});
checkHariKerja('selasa');
checkHariKerja('minggu');
