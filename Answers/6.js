/* ********************************************************* */
/* 6. Какие есть способы привязать контекст и в чем разница? */
/* ********************************************************* */

// можно привязать контекст с помощью Function.prototype.call(), Function.prototype.apply() и Function.prototype.bind()
// первые два вызывают функцию с некоторым контекстом, а последний - возвращает обёрточную функцию, которая уже привязана
// к некоторому контексту, и её можно вызвать с любыми аргументами.


const f = function() {
    console.log(this)
    console.log(arguments)  // добавил вывод аргументов
}

// function bind(this, context) {} // в таком виде функцию создать не получится, 
// потому что ключевое слово this используется в качестве аргумента.
// перепишу её таким образом:

function bind(fn, context) { 
    // возвращает функцию, которая при вызове возвращает вызов своего первого параметра fn
    // c привязкой к контексту второго параметра context, и передаёт в этот вызов fn аргументы,
    // которые мы можем передать обёрточной функции (в нашем случае - функции test)
    return function() {
        return fn.apply(context, arguments)
    };
}

const test = bind(f, window)

test() // -> window   -> Arguments []
test(1, 2) // -> window   -> Arguments(2) [1, 2]


// использование Function.prototype.call() в аналогичном случае могло бы выглядеть так:
f.call(window)
f.call(window, 1, 2)
// использование Function.prototype.apply() так:
f.apply(window)
f.apply(window, [1, 2])
// использование Function.prototype.bind() так:
const test2 = f.bind(window)
test2()
test2(1, 2)

// встроенный Function.prototype.bind(thisArg[, arg1[, arg2]]) позволяет ещё задавать дополнительные параметры для карринга функций.
const test3 = f.bind(window, 1)
test3()  // -> window   -> Arguments(1) [1]
test3(2)  // -> window   -> Arguments(2) [1, 2]
