let data = {
    id          : 1,
    name        : "Leanne Graham",
    username    : "Bret",
    email       : "Sincere@april.biz",
    address     : 
    {
        street  : "Kulas Light",
        suite   : "Apt. 556",
        city    : "Gwenborough",
        zipcode : "92998-3874",
    },
    phone       : "1-770-736-8031 x56442",
    website     : "hildegard.org",
}

//Mengubah data dengan spread operator
let dataSaya = {
    ...data,
    name: "Mochammad Fauzi Dwi Rusdiansyah",
    email: "mfdr.fauzi97@gmail.com",
    hobby: ["Gaming","Dancing"],
}
//Mengambil data dengan destructing
let { street, city } = dataSaya.address

// console.log(data)
console.log(dataSaya)
console.log(`Street: ${street}`)
console.log(`City: ${city}`) 