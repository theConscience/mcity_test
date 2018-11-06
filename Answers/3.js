/* **************************** */
/* 3. Что выведет console.log ? */
/* **************************** */ 

var a = {b: 1}, b = {b:1};

console.log(NaN == NaN)  // -> false
console.log(a == b)  // -> false т.к. объекты сравниваются по ссылке
console.log(a + b)  // -> '[object Object][object Object]', т.к. каждый объект преобразуется в строку '[objectObject]'
console.log(a - b)  // -> NaN, т.к. будут вычитаться две строки одна из другой