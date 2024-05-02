
const bahasaIndo = 70
const bahasaInggris = 98
const mtk = 79
const ipa = 99

if (typeof bahasaIndo!= "number" || typeof bahasaInggris!= "number" || typeof mtk!= "number" || typeof ipa!= "number") {
  console.log("Data harus di isi / Data harus berupa angka")
  } else {
    const mean = (bahasaIndo + bahasaInggris + mtk + ipa) / 4

    let rounding = mean.toFixed()
  
    if (rounding >= 90 && rounding <= 100) {
      console.log(
`Rata - rata = ${mean}
Pembulatan = ${rounding}
Grade = A`)
    } else if (rounding >= 80 && rounding < 90) {
      console.log(
`Rata - rata = ${mean}
Pembulatan = ${rounding}
Grade = B`)
    } else if (rounding >= 70 && rounding < 80) {
      console.log(
`Rata - rata = ${mean}
Pembulatan = ${rounding}
Grade = C`)
    } else if (rounding >= 60 && rounding < 70) {
      console.log(
`Rata - rata = ${mean}
Pembulatan = ${rounding}
Grade = D`)
    } else if (rounding >= 0 && rounding < 60) {
      console.log(
`Rata - rata = ${mean}
Pembulatan = ${rounding}
Grade = E`)
    } else {
      console.log("Nilai diluar batas")
    }
  } 
  