/* *********************************************************************************** */
/* 4. Заполнить матрицу N*N (10 000 элементов) целыми, случайными, уникальными числами */
/* *********************************************************************************** */

function generateMatrix(size, valuesArrGenerator) {
    let valuesArr = valuesArrGenerator(0, size * size);
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            // matrix[i].push(i * size + j);
            matrix[i].push(numbersArr.splice(Math.floor(Math.random() * valuesArr.length), 1)[0]);
        }
    }
    return matrix;
}

function generateRandomUniqueNumbersArr(min, max) {
    let nums = [];
    for (let i = min; i < max + 1; i++) nums.push(i);
    return nums;
}


generateMatrix(100, generateRandomUniqueNumbersArr);