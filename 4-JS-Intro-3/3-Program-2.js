// deklarasi poin awal
let userPoints = 0;

// array rewardsList 
const rewardsList = [
  { name: "Gift Card", points: 500 },
  { name: "Movie Ticket", points: 200 },
  { name: "Coffee Mug", points: 750 },
  { name: "T-shirt", points: 300 },
  { name: "Book", points: 250 },
  { name: "Headphones", points: 800 },
  { name: "Fitness Tracker", points: 1000 },
  { name: "Bluetooth Speaker", points: 700 },
  { name: "Smartwatch", points: 1200 },
  { name: "Gaming Console", points: 1500 }
];

// fungsi displayRewards untuk menampilkan daftar hadiah yang bisa ditukarkan
const displayRewards = async () => {
  console.log("Berikut daftar hadiah yang bisa Anda tukarkan:");
  rewardsList.forEach((reward, index) => {
    console.log(`${index + 1}. ${reward.name} (${reward.points} poin)`);
  });
};

// fungsi getUserInput untuk meminta input jumlah poin dari pengguna
const getUserInput = async () => {
  return new Promise((resolve, reject) => {
    process.stdout.write("Masukkan jumlah poin yang Anda miliki: ");
    process.stdin.once('data', (input) => {
      const points = parseInt(input.toString().trim());
      if (isNaN(points) || points <= 0) {
        reject(new Error("Jumlah poin harus berupa angka positif lebih dari 0."));
      } else {
        resolve(points);
      }
    });
  });
};

// fungsi findRewards untuk mencari hadiah yang dapat ditukarkan berdasarkan jumlah poin pengguna
const findRewards = async (points) => {
  return rewardsList.filter(reward => reward.points <= points);
};

// fungsi redeemReward untuk menukarkan hadiah yang dipilih dengan jumlah poin yang dimiliki pengguna
const redeemReward = async (selectedReward, remainingPoints) => {
  if (remainingPoints < selectedReward.points) {
    throw new Error("Poin yang Anda miliki tidak cukup untuk menukarkan hadiah ini.");
  }
  remainingPoints -= selectedReward.points;
  return `
  Anda berhasil menukarkan hadiah: ${selectedReward.name}
  Sisa poin Anda: ${remainingPoints}
  `;
};

// fungsi displayMessageSuccess untuk menampilkan pesan sukses
const displayMessageSuccess = (message) => {
  return console.log(message);
};

// fungsi handleErrors untuk menangani pesan kesalahan
const handleErrors = (errorMessage) => {
  return console.error(errorMessage);
};

// fungsi utama yang mengatur alur program
const main = async () => {
  try {
    await displayRewards(); // Menampilkan daftar hadiah
    userPoints = await getUserInput(); // Meminta input jumlah poin dari pengguna
    const availableRewards = await findRewards(userPoints); // Mencari hadiah yang dapat ditukarkan
    if (availableRewards.length === 0) { // Jika tidak ada hadiah yang dapat ditukarkan
      throw new Error("Poin yang Anda miliki tidak cukup untuk menukarkan hadiah.");
    }
    console.log("Hadiah yang dapat Anda tukarkan:"); // Menampilkan hadiah yang dapat ditukarkan
    availableRewards.forEach((reward, index) => {
      console.log(`${index + 1}. ${reward.name} (${reward.points} poin)`);
    });
    process.stdout.write("Masukkan nomor hadiah yang ingin Anda tukarkan: ");
    process.stdin.once('data', async (input) => {
      const selectedRewardIndex = parseInt(input.toString().trim()) - 1;
      const selectedReward = availableRewards[selectedRewardIndex];
      try {
        const result = await redeemReward(selectedReward, userPoints); // Menukarkan hadiah yang dipilih
        displayMessageSuccess(result); // Menampilkan pesan sukses
        process.exit(1);
      } catch (error) {
        handleErrors(error.message); // Menangani kesalahan
        process.exit(1);
      }
    });
  } catch (error) {
    handleErrors(error.message); // Menangani kesalahan
    process.exit(1);
  }
};

// Menampilkan pesan selamat datang dan menjalankan fungsi utama
console.log("Selamat datang di Program Kalkulasi Poin dan Penukaran Hadiah");
main().catch(error => {
  handleErrors(error.message); // Menangani kesalahan
});
