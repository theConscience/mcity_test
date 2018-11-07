/* ****************************** */
/* 2. Найти 100-е число Фибоначчи */
/* ****************************** */

function fib (num) {  // через итерации цикла
    var arr = [0, 1];
    for (let i = 2; i <= num; i++) {
        console.log(i);
        arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr[num];
}

function fibRec (num) {  // рекурсивный вариант
    if (num < 2) return num;
    return fibRec(num - 1) + fibRec(num - 2)
}