"use strict";
const addition = function (...bil) {
    if (bil.length < 3) {
        return undefined;
    }
    let total = 0;
    for (let num of bil) {
        total += num;
    }
    return total;
};
const result = addition(1, 2, 3, 4, 5);
if (typeof result === 'number') {
    console.log(result.toString());
}
else {
    console.log("Banyak bilangan harus lebih dari 2");
}
