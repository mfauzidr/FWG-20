type addResult = number | void
const addition = function (...bil: [...number[]]): addResult {
  if (bil.length < 3) {
    return undefined as void
  }
  let total = 0
  for (let num of bil) {
    total += num
  }
  return total as number
}

const result = addition(1, 2, 3, 4, 5)
if (typeof result === 'number') {
  console.log(result.toString());
} else {
  console.log("Banyak bilangan harus lebih dari 2");
}