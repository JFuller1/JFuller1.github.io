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

//Validation

const signupForm = document.getElementById('signupForm');
const fName = document.getElementById('first-name');
const lName = document.getElementById('last-name');
const pswrd = document.getElementById('pswrd');
const email = document.getElementById('email'); 
const uName = document.getElementById('username');
const send = document.getElementById('send');

const emailPattern = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;
const numberCheck = /[0-9]/;

send.addEventListener('click', function() {
    let firstName = fName.value.trim();
    let lastName = lName.value.trim();
    let password = pswrd.value.trim();
    let email1 = email.value.trim();
    let usrnme = uName.value.trim();

    let valid = true;

    if (firstName === '') {
        fName.classList.add('invalid');
        fName.placeholder = 'First Name Input Empty';
        fName.style.backgroundColor = '#fecbc8';
        valid = false;
    }else if(numberCheck.test(firstName)) {
        fName.classList.add('invalid');
        fName.value = '';
        fName.placeholder = 'First Name Input Contains Numbers';
        fName.style.backgroundColor = '#fecbc8';
        valid = false;
    }

    if (lastName === '') {
        lName.classList.add('invalid');
        lName.placeholder = 'Last Name Input Empty';
        lName.style.backgroundColor = '#fecbc8';
        valid = false;
    }else if(numberCheck.test(lastName)) {
         lName.classList.add('invalid');
         lName.value = '';
         lName.placeholder = 'Last Name Input Contains Numbers';
         lName.style.backgroundColor = '#fecbc8';
         valid = false;
    } 

    if (email1 === '') {
        email.classList.add('invalid');
        email.placeholder = 'Email Input Empty';
        email.style.backgroundColor = '#fecbc8';
        valid = false;
    } else {
        if (!emailPattern.test(email1)) {
            email.classList.add('invalid');
            email.value = '';
            email.placeholder = 'Invalid Email Address';
            email.style.backgroundColor = '#fecbc8';
            valid = false;
        }
    }

    if (usrnme === '') {
        uName.classList.add('invalid');
        uName.placeholder = 'Username Input Empty';
        uName.style.backgroundColor = '#fecbc8';
        valid = false;
    }

    if (password === '') {
        pswrd.classList.add('invalid');
        pswrd.placeholder = 'Password Input Empty';
        pswrd.style.backgroundColor = '#fecbc8';
        valid = false;
    } else if (password.length < 8) {
        pswrd.classList.add('invalid');
        pswrd.placeholder = 'Password Must Be Longer Than 8 Characters';
        pswrd.value = '';
        pswrd.style.backgroundColor = '#fecbc8';
        valid = false;
    }

    if(valid) {
        signupForm.submit();
    }
});

fName.addEventListener('click', function() {
    fName.classList.remove('invalid');
    fName.placeholder = 'First Name';
    fName.style.backgroundColor = '#f5f5f5';
});

lName.addEventListener('click', function() {
    lName.classList.remove('invalid');
    lName.placeholder = 'Last Name';
    lName.style.backgroundColor = '#f5f5f5';
});

email.addEventListener('click', function() {
    email.classList.remove('invalid');
    email.placeholder = 'Email';
    email.style.backgroundColor = '#f5f5f5';
});

pswrd.addEventListener('click', function() {
    pswrd.classList.remove('invalid');
    pswrd.placeholder = 'Password';
    pswrd.style.backgroundColor = '#f5f5f5';
});

uName.addEventListener('click', function() {
    uName.classList.remove('invalid');
    uName.placeholder = 'Username';
    uName.style.backgroundColor = '#f5f5f5';
});

// Login 

const password = '12345678';
const username = 'jaeden';

const pswrdInput = document.getElementById('pswrd2');
const loginUsername = document.getElementById('username2');
const sub = document.getElementById('send2');

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
        form.submit();
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
