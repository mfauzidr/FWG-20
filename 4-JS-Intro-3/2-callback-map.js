const getMonth = (callback) => {
    setTimeout(() => {
        let error = false
        let month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        if (!error) {
            callback(null, month)
        } else {
            callback(new Error('Sorry Data Not Found'), [])
        }
    }, 4000)
}

const showMonth = (error, data) => {
    if (error) {
        console.error(`Error: ${error.message}`)
    }
    data.map((month, index) => {
        console.log(`Bulan ke-${index + 1}: ${month}`)
    })
};

getMonth(showMonth);