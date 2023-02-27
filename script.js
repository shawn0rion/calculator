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
    console.log('OPERATE')
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

// store numbers and operators in an array until operate can be called
function workingMemory(arg) {
    //force user to operate or clear or backspace
    if (memory.length == 3){
        return memory[memory.length - 1];
    }

    // [2] -> = -> [2]
    if (memory.length < 1 && !(isNaN(arg))){
        memory.push(arg);
        return arg;
    }
    // [] -> + -> []
    if (memory.length === 0 && isNaN(arg)){
        return '';
    }
    // [2] -> 2 -> [22]
    if (!(isNaN(arg)) && !(isNaN((memory[memory.length - 1])))){
        return memory[memory.length - 1] += arg;
    }
    // if the user changes the operator before inputing another number
    if (isNaN((memory[memory.length - 1])) && isNaN(arg)){
        return memory[memory.length - 1] = arg;
    }
    // [22] -> + -> [22, +]
    if (!(isNaN(memory[memory.length-1]))){
        memory.push(arg);
        return arg;
    }
    // [2, +] -> 3 -> [2, +, 3]
    if (isNaN(memory[memory.length - 1]) && !(isNaN(arg))){
        memory.push(arg);
        return arg;
    }

    // potential operator errors
    return memory[memory.length - 1];
}

let memory = []
const display = document.getElementById('display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');

// mouse input for digits and operators
digits.forEach((digit) => digit.addEventListener('click', () => {
    display.innerHTML = workingMemory(digit.innerHTML);
}));
operators.forEach((operator) => operator.addEventListener('click', () => {
    display.innerHTML = workingMemory(operator.innerHTML);
}))

// keyboard input
document.addEventListener('keydown', function onEvent(e) {
    if (!(isNaN(e.key))){
        display.innerHTML = workingMemory(e.key);
    }
    if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/"){
        display.innerHTML = workingMemory(e.key);
    }
    if (e.key == '.'){
        decimalAction(e.key);
    }
    if (e.key.toLowerCase() == "c"){
        clearAction(e.key);
    }
    if (e.key == "Backspace"){
        backspaceAction(e.key);
    }
    if (e.key == "Enter" || e.key == "="){
        equalsAction(e.key);
    }
    if (e.key == "_"){
        negateAction(e.key);
    }
    console.log(memory);
})

// mouse input for not operator and not digit
const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', decimalAction);

const negate = document.querySelector('#negate');
negate.addEventListener('click', negateAction);

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearAction);

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', backspaceAction);

const equals = document.querySelector('#equals');
equals.addEventListener('click', equalsAction);

// ----------------------------------------
// functions for not operator and not digit

function decimalAction () {
    //if length 0, push 0. into display and memory
    if (memory.length == 0){
        memory.push("0" + decimal.innerHTML);
        display.innerHTML = memory[memory.length - 1];
    };
    if (memory.length != 0 && !(memory[memory.length - 1].includes('.')) 
        && !(isNaN(memory[memory.length - 1]))){
        memory[memory.length - 1] += decimal.innerHTML;
        display.innerHTML = memory[memory.length - 1];
    }
}

function negateAction () {
    if (memory.length != 0 && !(isNaN(memory[memory.length - 1]))){
        let number = parseFloat(memory[memory.length - 1]);
        memory[memory.length - 1] = (number * -1).toString();
        display.innerHTML =  memory[memory.length - 1];
    }
}

function clearAction () {
    memory = [];
    display.innerHTML = '';
}

function backspaceAction() {
    if (memory.length != 0) {
        if (memory[memory.length - 1]){
            memory[memory.length - 1] = memory[memory.length - 1].slice(0, -1);
            display.innerHTML = memory[memory.length - 1];
        }
        if (memory[memory.length - 1] == ''){
            memory.pop(); //in case backspace clears most recent memory slot
        }
    }
}

function equalsAction() {
    if (memory.length === 3){
        display.innerHTML = operate();
    }
}