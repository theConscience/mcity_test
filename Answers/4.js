/* ******************************** */
/* 4. В чем отличие let, const, var */
/* ******************************** */ 

// var видна повсеместно, внутри функции в которой объявлена, и hoist'ится внутри, т.е. всплывает,
// засчёт чего может быть доступна до момента её объявления со значением undefined,
// переменные через var можно объявлять сколько угодно раз внутри одной области видимости
// если var объявлена в цикле - то пересоздаётся заново каждую итерацию

// let - её область видимости - блок {...} т.е. её можно объявить внутри if и код снаружи
// не будет подозревать о её существовании, переменная объявленная таким образом - доступна только после объявления
// переменные let могут быть объявлены единожды внутри одной ОВ
// let созданная внутри оператора цикла, и внутри самого цикла - существует только внутри него
// каждой итерации соответствует отдельная переменная let, и если внутри цикла есть объявления функций,
// то в замыкании каждой будет соответствующая для этой итерации переменная let

// const создаёт константу, по функционалу схожую с let, за исключением того, что её нельзя менять после создания.
// если создан константный объект - то его свойства менять можно, нельзя менять только его самого.


console.log(a);  // -> undefined т.к. a "всплывает"
console.log(b);  // -> ReferenceError т.к. b не определена

if (true) {
    var a = 10;
    b = b + a;  // -> ReferenceError т.к. b не определена
    let b = 20;
    // обращаться к b можно начиная отсюда
}
// а здесь обращаться к b уже не получится - не определена