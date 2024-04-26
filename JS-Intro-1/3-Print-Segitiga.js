const printSegitiga = 7
if(typeof printSegitiga != "number" || printSegitiga <= 0){
    console.log("Data harus number / Data harus > 0")
} else {
    for(let i = printSegitiga-1; i >= 0; i--){
        let segitiga = ""
        for(let j = 0; j <= i; j++){
            segitiga += j+1
        }
        console.log(segitiga)
    }
}
