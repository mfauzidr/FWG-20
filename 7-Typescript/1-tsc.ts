console.log(`TypeScript adalah bahasa pemrograman yang menggunakan tipe data statis dan dikonversi menjadi JavaScript. 
Typescript membantu menjaga keamanan dan pemeliharaan kode dengan memeriksa tipe data secara ketat sebelum runtime, mengurangi kesalahan dan meningkatkan kualitas perangkat lunak.
TypeScript juga memiliki dukungan untuk fitur-fitur modern seperti arrow function, async/await, class, dan modul, yang mempermudah pengembangan aplikasi yang kompleks.`)

console.log("Contoh penggunaan typescript")

interface Kubus {
  sisi: number
}

const hitungLuas = (kubus: Kubus): number => {
  return 6 * kubus.sisi * kubus.sisi
}

const hitungVolume = (kubus: Kubus): number => {
  return kubus.sisi * kubus.sisi * kubus.sisi
}

const kubus1: Kubus = { sisi: 5 }
console.log("Luas Kubus:", hitungLuas(kubus1))
console.log("Volume Kubus:", hitungVolume(kubus1))
