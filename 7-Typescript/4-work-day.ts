const cekHariKerja = (day: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      const dataDay: string[] = ['senin', 'selasa', 'rabu', 'kamis', 'jumat']
      let cek = dataDay.find((item) => {
        return item === day
      })
      if (cek) {
        resolve(cek)
      } else {
        reject(new Error('Hari ini bukan hari kerja'))
      }
    }, 3000)
  })
}

cekHariKerja('senin')
  .then((hasil) => {
    console.log('Hari kerja:', hasil);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  })

const checkHariKerja = async (day: string): Promise<void> => {
  try {
    const result = await cekHariKerja(day)
    console.log(`${result} adalah hari kerja.`)
  } catch (error) {
    const errMessage = (error as Error).message
    console.error(`Error: ${errMessage}`)
  }
}

checkHariKerja('selasa')
checkHariKerja('minggu')
