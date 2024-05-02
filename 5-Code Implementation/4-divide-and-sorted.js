const divideAndSort = (input) => {
    const numStr = input.toString()
    const parts = numStr.split("0")
    const sortedParts = parts.map(part => {
        const sortedNum = part.split("").sort().join("")
        return sortedNum
    })
    const result = sortedParts.join("")
    return Number(result)
};

const input = 5956560159466056;
const output = divideAndSort(input)
console.log(output)
