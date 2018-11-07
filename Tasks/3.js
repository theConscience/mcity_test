/* *********************************************************************************** */
/* 3. Напиши функцию проверки строки на палиндром «А муза рада музе без ума да разума» */
/*    за один проход, игнорируя пробелы и регистр                                      */
/* *********************************************************************************** */

function palindromeFinder(str) {
    let conditionedStr = str.toLowerCase().replace(/\s+/g, '');
    let reversedConditionedStr = '';
    for (let i = conditionedStr.length - 1; i >= 0; i--) reversedConditionedStr += conditionedStr[i];
    return conditionedStr == reversedConditionedStr;
}

function palindromeFinder2(str) {
    let conditionedStr = str.toLowerCase().replace(/\s+/g, '');
    let lastCharIndex = conditionedStr.length - 1;
    for (let i = lastCharIndex; i >= 0; i--) {
        if (conditionedStr[i] != conditionedStr[lastCharIndex - i]) return false;
    }
    return true;
}

function palindromeFinder3(str) {
    let condStr = str.toLowerCase().replace(/\s+/g, '');
    let reversedStr = condStr.split('').reverse().join('');
    console.log(condStr + '\n' + reversedStr);
    return condStr == reversedStr;
}