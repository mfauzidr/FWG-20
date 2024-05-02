const sortNumber = (numStr) => {
    const numArr = new Array(numStr.length)
    for (let i = 0; i < numStr.length; i++) {
        numArr[i] = numStr[i]
    }
    for (let i = 0; i < numArr.length; i++) {
        for (let j = i + 1; j < numArr.length; j++) {
            if (numArr[i] > numArr[j]) {
                const temp = numArr[i]
                numArr[i] = numArr[j]
                numArr[j] = temp
            }
        }
    }
    let sortedNum = ""
    for (let i = 0; i < numArr.length; i++) {
        sortedNum += numArr[i]
    }
    return sortedNum
}

const divideAndSort = (input) => {
    const numStr = input + ""
    let result = ""
    let currentNum = ""
    for (let i = 0; i < numStr.length; i++) {
        const char = numStr[i]
        if (char === "0") {
            result += sortNumber(currentNum)
            currentNum = ""
        } else {
            currentNum += char
        }
    }
    if (currentNum !== "") {
        result += sortNumber(currentNum)
    }
    return Number(result)
}

const input = 5956560159466056;
const output = divideAndSort(input)
console.log(output)

