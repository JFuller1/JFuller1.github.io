const restart = document.getElementById('reset');
let t = localStorage.getItem('time');
let times = JSON.parse(localStorage.getItem('timeArray'));
times.push(t);
let sTime = JSON.stringify(times);
localStorage.setItem('timeArray', sTime);

restart.addEventListener('click', function() {
    window.location.href = 'index.html';
})

let orderedTimes = [];

times.forEach(elem => {
    if(elem != NaN) {
        let temp = elem.replace(':', '.');
        orderedTimes.push(temp);
    }
})

orderedTimes.sort((a,b) => {return a - b});

orderedTimes.forEach((elem, i) => {
    if(elem != NaN) {
        let temp = elem.replace('.', ':');
        orderedTimes[i] = temp;
    }
})

console.log(orderedTimes);

//Set leaderboard time

const classes = document.querySelectorAll('.time');
const attempt = document.querySelectorAll('.attempt');

classes.forEach((elem, i) => {
    if(orderedTimes[i]) {
        elem.innerText = orderedTimes[i];
        attempt[i].innerText = 'You';
    }
});

// console.log(times.IndexOf())