const isPalindrome = (word) => {
    let reversed = ""
    const lower = word.toLowerCase()
    for (let i = lower.length - 1; i >= 0; i--) {
        reversed += lower[i]
    }

    if (reversed === lower) {
        return word + " adalah kata palindrom"
    }
    return word + " bukan kata palindrom"

}

const inputWord = "Malam"

console.log(isPalindrome(inputWord))
