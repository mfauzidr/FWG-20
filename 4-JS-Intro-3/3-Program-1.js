// deklarasi object
const inventoryList = {
  "Laptop": 5,
  "Printer": 3,
  "Scanner": 2,
  "Projector": 0,
  "Office Chair": 10
};

// fungsi untuk menerima input dan return promise dengan value input user
const userInput = async (message) => {
  return new Promise((resolve) => {
    console.log(message);
    process.stdin.once('data', (input) => {
      const selection = input.toString().trim();
      resolve(selection);
    });
  });
};

// fungsi checkStockAvailability menerima selecition user, mengembalikan promise untuk mengecek stok barang.
const checkStockAvailability = async (selection) => {
  return new Promise(async (resolve, reject) => {
    if (!inventoryList.hasOwnProperty(selection)) {
      const newSelection = await userInput("Invalid item selection. Please select a valid item:");
      checkStockAvailability(newSelection).then(resolve).catch(reject); //promise chaining untuk resolve dan reject
    } else {
      if (inventoryList[selection] > 0) {
        resolve({ valid: true, selectedItem: selection });
      } else {
        resolve({ valid: false, selectedItem: selection });
      }
    }
  });
};

// fungsi displayStock untuk menampilkan stok barang.
const displayStock = (item, stock) => {
  console.log(`Current ${item} Stock is ${stock}`);
};

// fungsi displayMessage untuk menampilkan pesan.
const displayMessage = (message) => {
  console.log(message);
};

// fungsi handleErrors untuk menangani pesan kesalahan.
const handleErrors = (errorMessage) => {
  console.error(errorMessage);
};

// fungsi utama yang mengatur alur program.
const main = async () => {
  try {
    let selectedItem = await userInput("Select an item to check its stock:");
    const result = await checkStockAvailability(selectedItem);
    if (result.valid) {
      selectedItem = result.selectedItem;
      displayMessage("Item is available in stock.");
      displayStock(selectedItem, inventoryList[selectedItem]);
      process.exit(1)
    } else {
      displayMessage("Sorry, the item is currently out of stock.");
      process.exit(1)
    }
  } catch (error) {
    handleErrors(error.message);
  }
};

console.log("Welcome to the Inventory Stock Check Program");
console.log("Current Inventory List:");
console.table(inventoryList);

main().catch(error => {
  handleErrors(error.message);
});
