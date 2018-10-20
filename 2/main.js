//Получить 2 аргумента, перемножить их и вывести результат в консоль:

var process = require('process');

if (process.argv.length < 4) {
    console.error("2 Parameters should be passed");
    return;
}
var value1 = +process.argv[2];
var value2 = +process.argv[3];
var util = require('util');

if (!util.isNumber(value1) ||
    !util.isNumber(value2)) {
    console.error(`Parameters should be numbers ${value1}  ${value2}`);
    return;
}

console.log(`Value: ${value1 * value2}`);
