fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Tidak ada respon dari jaringan');
        }
        return response.json()
    })
    .then(data => {
        const userNames = data.map(user => ({ name: user.name }))
        console.log(userNames)
    })
    .catch(error => {
        console.error('Fetch error:', error)
    });
