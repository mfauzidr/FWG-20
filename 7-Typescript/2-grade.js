"use strict";
const inputScore = [60, 90, 85, 95];
const getFinalScore = (inputScore) => {
    const isValidInput = (input) => {
        for (const score of input) {
            if (score < 0 || score > 100) {
                return { message: "Input nilai harus berada di antara 0 dan 100." };
            }
        }
        return null;
    };
    const validation = isValidInput(inputScore);
    if (validation !== null) {
        return validation;
    }
    const getMean = (input) => {
        const total = input.reduce((acc, curr) => acc + curr, 0);
        return total / input.length;
    };
    const getGrade = (mean) => {
        if (mean >= 90 && mean <= 100) {
            return "A";
        }
        if (mean >= 80 && mean <= 89) {
            return "B";
        }
        if (mean >= 70 && mean <= 79) {
            return "C";
        }
        if (mean >= 60 && mean <= 69) {
            return "D";
        }
        return "E";
    };
    const mean = getMean(inputScore);
    const grade = getGrade(mean);
    return `Nilai rata-rata: ${mean.toFixed()}, Grade: ${grade}`;
};
console.log(getFinalScore(inputScore));
