


/* 1.Filter
Method ini dimiliki oleh data Array 
Bersifat Tidak Mutasi */
console.log("Contoh Kasus Filter")
const arr1 = [1, 2, 3, 4, 5, 6]
function bilGanjil(value) {
    return value % 2 !== 0
}
console.log(arr1.filter(bilGanjil))

/* 2. forEach
Method ini dimiliki oleh data Array 
Bersifat Tidak Mutasi */
console.log("Contoh Kasus forEach()")
const arr2 = [1, 2, 3, 4, 5]

arr2.forEach(function (arr2, index) {
    console.log(`Element ${index}: ${arr2}`)
})

/* 3. find
Method ini dimiliki oleh data Array 
Bersifat Tidak Mutasi */
console.log("Contoh Kasus find()")
const umur = [25, 30, 18, 12, 40]
const adultAge = umur.find(umur => umur > 18)
console.log(adultAge)

/* 4. reduce
Method ini dimiliki oleh data Array 
Bersifat Mutasi */
console.log("Contoh Kasus reduce()")

const arr3 = [1, 2, 3, 4, 5]

const sum = arr3.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue
}, 0)

console.log(sum)

/* 5. indexOf
Method ini dimiliki oleh data Array dan string
Bersifat Tidak Mutasi */
console.log("Contoh kasus indexOf()")
const buah = ["apple", "banana", "cherry", "apple"]
const index1 = buah.indexOf("cherry")
const index2 = buah.indexOf("orange")

console.log(index1)
console.log(index2)

/* 6. every
Method ini dimiliki oleh data Array 
Bersifat Tidak Mutasi */
console.log("Contoh kasus every()")
const every = [2, 4, 6, 8, 10]
const isAllEven = every.every(function (kondisi) {
    return kondisi % 2 === 0
})
if (isAllEven) {
    console.log("Semua data dalam array every merupakan bilangan genap.")
} else {
    console.log("Tidak semua data dalam array every1 merupakan bilangan genap.")
}

/* 7. slice
Method ini dimiliki oleh data Array dan String
Bersifat Tidak Mutasi */
console.log("Contoh kasus slice()")
const fruits = ["apple", "banana", "cherry", "pineapple", "mango"]
const slicedFruits = fruits.slice(1, 4)
console.log(fruits);
console.log(slicedFruits)

/* 8. shift
Method ini dimiliki oleh data Array 
Bersifat Mutasi */
console.log("Contoh kasus shift()")
const removedFruit = fruits.shift()

console.log(removedFruit)
console.log(fruits)

/* 9. toLowerCase dan toUpperCase
Method ini dimiliki oleh data String 
Bersifat Tidak Mutasi */
console.log("Contoh kasus lower/uppercase")
const text = "Saya Belajar Javascript"
const lower = text.toLowerCase()
const upper = text.toUpperCase()

console.log(text)
console.log(`Lowercased: ${lower}, uppercase: ${upper}`)

/* 10. concat
Method ini dimiliki oleh data Array dan String
Bersifat Tidak Mutasi */
console.log("Contoh kasus concat()")
const array1 = ["A", "B", "C"]
const array2 = [1, 2, 3]
const string1 = "Belajar"
const string2 = "Javascript"
const concatArray = array1.concat(array2)
const concatSring = string1.concat(string2)

console.log(concatArray)
console.log(concatSring)
