const name = [
    'Abigail', 'Alexandra', 'Alison',
    'Amanda', 'Angela', 'Bella',
    'Carol', 'Caroline', 'Carolyn',
    'Deirdre', 'Diana', 'Elizabeth',
    'Ella', 'Faith', 'Olivia', 'Penelope']

const searchName = (search, limit, cb) => {
    if (typeof search !== 'string') {
        console.log("Input harus bertype string")
    } else {
        const searchLower = search.toLowerCase()
        const hasil = []
        name.forEach(name => {
            if (name.toLowerCase().includes(searchLower)) {
                hasil.push(name)
            }
        })
        cb(hasil, limit)
    }
}

const hasilSearch = (quote, limit) => {
    const result = []
    quote.forEach((name, index) => {
        if (index < limit) {
            result.push(name)
        }
    })
    result.length > 0 ? console.log(result) : console.log("Tidak ada nama yang sesuai.")
}

searchName("an", 3, hasilSearch)


