/* ******************************** */
/* 1. Какие типы данных есть в JS ? */
/* ******************************** */ 

// #1й тип: строка
'какая-то строка';  
"какая-то строка";  
// в es6:
let word1 = 'переменными';
let word2 = 'возможностью';
`какая-то длинная,
многострочная строка с ${word1},
а также с ${word2} делать так:
${'в этой строке всего ' + 3 + ' ' + word1.slice(0, -2) + 'е'}`; 

// #2й тип: число, специального типа для целых и для чисел с плавающей точкой в Js нет
4;
10.75;
// есть специальные числовые значения - Infinity и NaN. Бывает положительная и отрицательная Infinity.
// а NaN не равен ничему, даже самому себе :-/


// #3й тип: булево значение
true;
false;

// #4й тип: object, единственный не примитивный тип объектов
var obj = {
    title: 'Новость дня',
    dateAdded: new Date(Date.now()),
    text: 'Some text...'
}

// #5й тип: null
var ajaxGeneratedHTML = null;

// #6й тип: undefined
var someVar;
var someOtherVar = undefined;
console.log(someVar, someOtherVar);  // -> undefined undefined


// в ES6 ещё есть тип данных Symbol, но я с ним не сталкивался в работе:
var sym1 = Symbol();
