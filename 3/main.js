// аписать калькулятор, который выполняет все арифметические действия, аргументы и знак операции передавать в аргументах призапуске скрипта

var process = require('process');

if (process.argv.length < 5) {
    console.error("Provide 3 parameters. E.g.: 10 + 5");
    return;
}
var value1 = +process.argv[2];
var operator = process.argv[3];
var value2 = +process.argv[4];

if (value1 == NaN || 
    value2 == NaN) {
    console.error("Provide 3 parameters. E.g.: 10 + 5. First and last operands should be numbers");
    return;
}
var result = undefined;
switch(operator) {
    case '+': 
        result = value1 + value2;
        break;
    case '-': 
        result = value1 - value2;
        break;
    case '*': 
        result = value1 * value2;
        break;
    case '/': 
        if (value2 === 0){
            console.error("Division by zero");
            return;
        }

        result = value1 / value2;
        break;
    default:
        console.error('Unknown operator');
        return;
}

console.log(`Result: ${result}`);