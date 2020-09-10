// Timer from https://medium.com/@abhi9bakshi/why-javascript-timer-is-unreliable-and-how-can-you-fix-it-9ff5e6d34ee0


let start = new Date();
let intervalRef = null;
let timer = document.getElementById('timer');

intervalRef = setInterval(_ => {
  let current = new Date();
  let count = +current - +start;
  
  let ms = count % 1000;
  let s = Math.floor((count /  1000)) % 60;
  let m = Math.floor((count / 60000)) % 60;


  timer = m + ":" + s + ":" + ms;
}, 10);
