

/*1.Filter
Contoh kasus */

console.log("Contoh Kasus Filter")
const num1 = [1, 2, 3, 4, 5, 6]
function bilGanjil(value) {
    return value % 2!== 0
}
console.log(num1.filter(bilGanjil))


// const ganjil = num1.filter(num1 => num1 % 2 !== 0)
// console.log(ganjil)

/*2. forEach
contoh penulisan
array.forEach(function(nilai, index) {
    Barisan kode
})

Contoh kasus */
// console.log("Contoh Kasus forEach()")
const num2 = [1, 2, 3, 4, 5]

num2.forEach(function(num2, index) {
    // console.log(`Element ${index}: ${num2}`)
})

/*3. find
contoh kasus */

// console.log("Contoh Kasus find()")
const umur = [25, 30, 18, 12, 40]
const adultAge = umur.find(umur => umur > 18)
// console.log(adultAge)

/*4. reduce

 format penulisan reduce()
 const array = [1, 2, 3, 4]

function reducer(accumulator, currentValue) {
  barisan kode
}
array.reduce(reducer)

contoh kasus */
// console.log("Contoh Kasus reduce()")

const num3 = [1, 2, 3, 4, 5]

const sum = num3.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue
}, 0)

// console.log(sum)

/*5. indexOf

 syntax indexOf()
 array.indexOf(searchElement, fromIndex)

contoh kasus*/

// console.log("Contoh kasus indexOf()")
const buah = ["apple", "banana", "cherry", "apple"]
const index1 = buah.indexOf("cherry")
const index2 = buah.indexOf("orange")

// console.log(index1) 
// console.log(index2) 

/*6. every
 syntax every()

 array.every(function(param) {
     Kondisi yang harus dipenuhi
    return param
 })
 output akan bernilai true atau false

contoh kasus*/

// console.log("Contoh kasus every()")
const every1 = [2, 4, 6, 8, 10]
const isAllEven = every1.every(function(kondisi) {
    return kondisi % 2 === 0
})
// if (isAllEven) {
//     console.log("Semua data dalam array every1 merupakan bilangan genap.")
// } else {
//     console.log("Tidak semua data dalam array every1 merupakan bilangan genap.")
// }

/*7. slice
syntax slice()
array.slice(start, end)

contoh kasus*/

// console.log("Contoh kasus slice()")
const fruits1 = ["apple", "banana", "cherry", "pineapple", "mango"]
const slicedFruits = fruits1.slice(1, 4)

console.log(slicedFruits)

/*8. shift
contoh kasus*/

// console.log("Contoh kasus shift()")
const fruits2 = ["apple", "banana", "cherry"]
const removedFruit = fruits2.shift()

// console.log(removedFruit) 
// console.log(fruits2) 

/* 9. toLowerCase dan toUpperCase
contoh kasus */

// console.log("Contoh kasus lower/uppercase")
const text = "Saya Belajar Javascript"
const lower = text.toLowerCase()
const upper = text.toUpperCase()

// console.log(text)
// console.log(`Lowercased: ${lower}, uppercase: ${upper}`)

/* 10. concat
contoh kasus */

// console.log("Contoh kasus concat()")
const array1 = ["A", "B", "C"]
const array2 = [1, 2, 3]
const concatArray = array1.concat(array2)

// console.log(concatArray)
