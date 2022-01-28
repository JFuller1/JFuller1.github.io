'use strict';
//Login Pop Up
const showForm = document.getElementById('show');
const form = document.getElementById('form');
const header = document.querySelector('header');
const main = document.querySelector('main');
const overlay = document.getElementById('overlay');
let open = false;

showForm.addEventListener('click', () => {
    form.style.display = 'inline';
    overlay.classList.toggle('darken');
    if(open) {
        open = false;
    } else {
        open = true;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape' && open == true) {
        form.style.display = 'none';
        overlay.classList.toggle('darken');
        open = false;
    }
})

overlay.addEventListener('click', function(){
    form.style.display = 'none';
    overlay.classList.toggle('darken');
    open = false;
});

// Login 

const password = '12345678';
const username = 'jaeden';

const pswrdInput = document.getElementById('pswrd2');
const loginUsername = document.getElementById('username2');
const sub = document.getElementById('send2');
const google = document.getElementById('google');
const bing = document.getElementById('bing');
const buttons1 = document.getElementsByClassName('buttons')
let loggedin = false;

sub.addEventListener('click', function() {
    let $pswrdInput = pswrdInput.value.trim();
    let $loginUsername = loginUsername.value.trim();
    let valid1 = true;

    if($pswrdInput === '') {
        pswrdInput.classList.add('invalid');
        pswrdInput.placeholder = 'Password Input Empty';
        pswrdInput.style.backgroundColor = '#fecbc8';
        valid1 = false;
    } else if($pswrdInput != password) {
        pswrdInput.classList.add('invalid');
        pswrdInput.value = '';
        pswrdInput.placeholder = 'Incorrect Password';
        pswrdInput.style.backgroundColor = '#fecbc8';
        valid1 = false;
    }

    if($loginUsername === '') {
        loginUsername.classList.add('invalid');
        loginUsername.placeholder = 'Username Input Empty';
        loginUsername.style.backgroundColor = '#fecbc8';
        valid1 = false;
    } else if($loginUsername != username) {
        loginUsername.classList.add('invalid');
        loginUsername.value = '';
        loginUsername.placeholder = 'Incorrect Username';
        loginUsername.style.backgroundColor = '#fecbc8';
        valid1 = false;
    }

    if(valid1){
        form.style.display = 'none';
        overlay.classList.toggle('darken');

        loggedin = true;

        google.classList.remove('deactive');
        bing.classList.remove('deactive');

        google.classList.add('activer');
        bing.classList.add('activer');
    }
});

pswrdInput.addEventListener('click', function() {
    pswrdInput.classList.remove('invalid');
    pswrdInput.placeholder = 'Password';
    pswrdInput.style.backgroundColor = '#f5f5f5';
});

loginUsername.addEventListener('click', function() {
    loginUsername.classList.remove('invalid');
    loginUsername.placeholder = 'Username';
    loginUsername.style.backgroundColor = '#f5f5f5';
});

const search = document.getElementById('search-bar');
const error = document.getElementById('error');

google.addEventListener('click', function() {
    let result1 = search.value.trim();

    if(!loggedin){
    }
    else if(result1 === '') {
        error.classList.toggle('dissapear');
        setTimeout(() => {error.classList.toggle('dissapear')}, 2000);
    } else {
        window.location.assign('https://www.google.com/search?q=' + result1);
    }
});

bing.addEventListener('click', function() {
    let result2 = search.value.trim();

    if(!loggedin){
    }
    else if(result2 === '') {
        error.classList.toggle('dissapear');
        setTimeout(() => {error.classList.toggle('dissapear')}, 2000);
    } else {
        window.location.assign('https://www.bing.com/search?q=' + result2);
    }
});