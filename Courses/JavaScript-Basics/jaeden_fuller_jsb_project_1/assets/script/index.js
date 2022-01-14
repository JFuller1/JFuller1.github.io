'use strict';

const btn1 = document.getElementById('button1');
const btn2 = document.getElementById('button2');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const para1 = document.getElementById('para1');
const para2 = document.getElementById('para2');

const colorMode = document.getElementById('colorChange');
let clicked = false;

btn1.addEventListener('click', function(){
    const value = input1.value.trim();
    if(value == "") {
        para1.innerText = 'No number was entered';
    } else if (isNaN(value)) {
        para1.innerText = 'Input must be a valid number';
    } else {
        const Fah = value * 1.8 + 32;
        para1.innerText = `${value}°C is ${Fah.toFixed(1)}°F`;
    }
});

btn2.addEventListener('click', function(){
    const value = input2.value.trim();
    if(value == "") {
        para2.innerText = 'No number was entered';
    } else if (isNaN(value)) {
        para2.innerText = 'Input must be a valid number';
    } else {
        const Cel = (value - 32) * 5 / 9;
        para2.innerText = `${value}°F is ${Cel.toFixed(1)}°C`;
    }
});

colorMode.addEventListener('click', function(){
    document.querySelector('body').classList.toggle('bodyDark');
    document.querySelectorAll('h2').forEach(item => {item.classList.toggle('h2Dark')});
    document.querySelector('header').classList.toggle('headingDark');
    colorMode.classList.toggle('colButtonDark');
    document.querySelectorAll('hr').forEach(item => {item.classList.toggle('hrDark')});
    btn1.classList.toggle('buttonDark');
    btn2.classList.toggle('buttonDark');
    input1.classList.toggle('textDark');
    input2.classList.toggle('textDark');
    document.querySelectorAll('p').forEach(item => {item.classList.toggle('pDark')});
    

    if(clicked) {
        colorMode.innerText = 'Dark Mode';
        clicked = false;
    } else {
        colorMode.innerText = 'Light Mode';
        clicked = true;
    }
});