//1. Получить в скрипте аргумент(process.argv) перемножить его на 2 и вывести в консоль результа

var process = require('process');

if (process.argv.length < 3) {
    console.error("Parameter should be passed");
    return;
}
var value = process.argv[2];
var util = require('util');

if (!util.isNumber(value))
{
    console.error("Parameter should be number");
    return;
}

console.log(`Value: ${value * 2}`);
