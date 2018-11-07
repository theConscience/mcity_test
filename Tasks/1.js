/* ********************************************************************************************* */
/* 1. Написать функцию counter() каждый вызов которой увеличивает счётчик и возвращает результат */
/* ********************************************************************************************* */


// 1.1. через глобальную переменную:

var count = 0;

function counter() {
    return ++count;
}

console.log(counter());  // --> 1
console.log(counter());  // --> 2
console.log(counter());  // --> 3


// 1.2. через замыкание:

function makeCounter() {
    var count = 0;

    return function() {
       return ++count;
    }
}

var counter2 = makeCounter();

console.log(counter2());  // --> 1
console.log(counter2());  // --> 2
console.log(counter2());  // --> 3