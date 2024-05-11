function reverseSentence(text) {
    let kata = ""
    let reversed = ""
    let i = text.length - 1
    while (i >= 0) {
        if (text[i] !== " ") {
            kata = text[i] + kata
        } else {
            reversed = reversed + kata + " "
            kata = ""
        }
        i--;
    }
    reversed = reversed + kata
    return reversed
}

const inputText = "Saya belajar javascript"
const reversedText = reverseSentence(inputText)
console.log(reversedText)