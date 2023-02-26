function add (a, b){
    return parseInt(a) + parseInt(b);
}

function subtract (a, b){
    return parseInt(a) - parseInt(b);
}

function multiply (a, b){
    return parseInt(a) * parseInt(b);
}

function divide (a, b){
    return parseInt(a) / parseInt(b);
}

function operate(a, b){
    let calc = {
        '+': add(a, b),
        '-': subtract(a, b),
        '*': multiply(a, b),
        '/': divide(a, b),
    };
    let operator = ""
    return calc[operator];
}

function toDisplay (e) {
    display.innerHTML = e.target.innerHTML;

}

const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => digit.addEventListener('click', toDisplay));
const operators = document.querySelectorAll('.operator');
operators.forEach((arg) => arg.addEventListener('click', toDisplay));
const equals = document.getElementById('equals');
equals.addEventListener('click', toDisplay);

const display = document.getElementById('display');