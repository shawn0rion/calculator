function add (a, b){
    console.log(parseInt(a), b);
    return parseFloat(a) + parseFloat(b);
}

function subtract (a, b){
    return parseFloat(a) - parseFloat(b);
}

function multiply (a, b){
    return parseFloat(a) * parseFloat(b);
}

function divide (a, b){
    return parseFloat(a) / parseFloat(b);
}

function operate(){
    let a = memory[0];
    let operator = memory[1];
    let b = memory[2];
    let calc = {
        '+': add(a, b),
        '-': subtract(a, b),
        '*': multiply(a, b),
        '/': divide(a, b),
    };
    let result = calc[operator];
    memory = [];
    memory.push(Math.round((result + Number.EPSILON) * 100) / 100);
    return Math.round((result + Number.EPSILON) * 100) / 100;
}

function workingMemory(e) {
    let arg = e.target.innerHTML;

    // [2] -> = -> [2]
    if (memory.length != 3 && arg == '='){
        console.log('invalid input: ' + arg);
    }
    if (memory.length < 1 && !(isNaN(arg))){
        memory.push(arg);
        return arg;
    }
    if (memory[memory.length - 1].includes('.') && arg == '.'){
        console.log('invalid input: ' + arg);
        return memory[memory.length - 1];
    }

    // [2] -> 2 -> [22]
    if ((!(isNaN(arg)) || arg === '.') && !(isNaN((memory[memory.length - 1])))){
        return memory[memory.length - 1] += arg;
        // return memory[memory.length - 1];
    }
    // [22] -> + -> [22, +]
    // does not accept '='
    if (e.target.className === 'operator' && !(isNaN(memory[memory.length-1]))){
        memory.push(arg);
        return arg;
    }
    // [2, +] -> 3 -> [2, +, 3]
    if (isNaN(memory[memory.length - 1]) && !(isNaN(arg))){
        memory.push(arg);
        return arg;
    }
    if (memory.length == 3 && arg === '='){
        return operate();
    }
    //operator errors
    if (memory.length == 0){
        return '';
    } else{
        return memory[memory.length - 1];
    }
}

function toDisplay (e) {
    display.innerHTML = workingMemory(e);
    console.log(memory);
}

let memory = []
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => digit.addEventListener('click', toDisplay));
const operators = document.querySelectorAll('.operator');
operators.forEach((arg) => arg.addEventListener('click', toDisplay));
const equals = document.querySelector('#equals');
equals.addEventListener('click', toDisplay);
const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', toDisplay);

const display = document.getElementById('display');

// memory[0] = 0.5;
// memory[1] = '+';
// memory[2] = '1';
// console.log(operate());