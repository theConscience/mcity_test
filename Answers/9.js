/* ************************************ */
/* 9. Как работает сборщик мусора в JS? */
/* ************************************ */

// Примитивные типы данных в JS передаются целиком при присвоении значения переменной,
// т.е. строка или число хранятся непосредственно в переменной.
// Поэтому если в переменную присвоили новое значение, а старое было примитивом - оно сразу выбрасывается из памяти.
//
// С объектами и другими не примитивными типами данных дело обстоит хитрее.
// Они создаются в памяти, и в переменных хранятся только ссылки на них.
// В результате на один и тот же объект может быть множество ссылок из разных переменных.
// Сборщик мусора следит за различными ссылками на один и тот же объект, и ждёт
// когда последняя ссылка исчезнет - только после этого объект будет удалён из памяти.
// Но при этом наличие ссылки на объект - не гарантирует что он останется в памяти.
// Иногда бывает ситуация что ссылки на объект остаются, но сам объект оказывается
// недостижим через какие бы то ни было переменные. Тогда он также стирается из памяти.
