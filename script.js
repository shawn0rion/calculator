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
    memory.push(result);
    return result;
}

function workingMemory(e) {
    let arg = e.target.innerHTML;
    
    // [2] -> = -> [2]
    if (memory.length != 3 && arg == '='){
        console.log('invalid input: ' + arg);
        return '';
    }
    if (memory.length < 1 && !(isNaN(arg))){
        memory.push(arg);
        return arg;
    }
    // [2] -> 2 -> [22]
    if (!(isNaN(arg)) && !(isNaN((memory[memory.length - 1])))){
        return memory[memory.length - 1] += arg;
    }
    // [22] -> + -> [22, +]
    if (e.target.className === 'operator' && !(isNaN(memory[memory.length-1]))){
        memory.push(arg);
        return arg;
    }
    // [2, +] -> 3 -> [2, +, 3]
    if (isNaN(memory[memory.length - 1]) && !(isNaN(arg))){
        memory.push(arg);
        return arg;
    }
    if (memory.length == 3 && arg == '='){
        return operate();
    }
    //repeating operators
    return memory[memory.length - 1];
}

function toDisplay (e) {
    display.innerHTML = workingMemory(e);
}

let memory = []
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => digit.addEventListener('click', toDisplay));
const operators = document.querySelectorAll('.operator');
operators.forEach((arg) => arg.addEventListener('click', toDisplay));
const equals = document.getElementById('equals');
equals.addEventListener('click', toDisplay);

const display = document.getElementById('display');