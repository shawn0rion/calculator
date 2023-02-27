function add (a, b){
    return parseFloat(a) + parseFloat(b);
}

function subtract (a, b){
    return parseFloat(a) - parseFloat(b);
}

function multiply (a, b){
    return parseFloat(a) * parseFloat(b);
}

function divide (a, b){
    if (b == 0){
        return "ERROR";
    }
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
    if (result === "ERROR"){
        memory = [];
        return result;
    }
    memory = [];
    memory.push((Math.round((result + Number.EPSILON) * 100) / 100).toString());
    return Math.round((result + Number.EPSILON) * 100) / 100;
}

function workingMemory(e) {
    let arg = e.target.innerHTML;

    // [2] -> = -> [2]
    if (memory.length < 1 && !(isNaN(arg))){
        memory.push(arg);
        return arg;
    }
    if (memory.length === 0 && isNaN(arg)){
        console.log('invalid input: ' + arg); 
        return '';
    }
    if (memory[memory.length - 1].includes('.') && arg === '.'){
        console.log('invalid input: ' + arg);
        return memory[memory.length - 1];
    }

    // [2] -> 2 -> [22]
    if ((!(isNaN(arg)) || arg === '.') && !(isNaN((memory[memory.length - 1])))){
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
    //operator errors
    return memory[memory.length - 1];
}

function toDisplay (e) {
    display.innerHTML = workingMemory(e);
    console.log(memory);
}

let memory = []
const display = document.getElementById('display');
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => digit.addEventListener('click', toDisplay));
const operators = document.querySelectorAll('.operator');
operators.forEach((arg) => arg.addEventListener('click', toDisplay));
const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', toDisplay);
const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    if (memory.length === 3){
        display.innerHTML = operate();
    }
});

const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    memory = [];
    display.innerHTML = '';
});

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', () => {
    if (memory.length != 0 && !(isNaN(memory[memory.length - 1]))){
        memory[memory.length - 1] = memory[memory.length - 1].slice(0, -1);
        display.innerHTML = memory[memory.length - 1];
    }
});

const negate = document.querySelector('#negate');
negate.addEventListener('click', () => {
    if (memory.length != 0 && !(isNaN(memory[memory.length - 1]))){
        let number = parseFloat(memory[memory.length - 1]);
        memory[memory.length - 1] = (number * -1).toString();
        display.innerHTML =  memory[memory.length - 1];
    }
});