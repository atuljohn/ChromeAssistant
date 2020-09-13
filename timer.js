// Timer from https://medium.com/@abhi9bakshi/why-javascript-timer-is-unreliable-and-how-can-you-fix-it-9ff5e6d34ee0
// Deprecated above.
// Following from https://github.com/gt-webdev/tomato

function init() {
  addMessageListeners();
  console.log("Added message listeners I think");
  //startMyTimer();
  addOnClick();
  console.log("After startTimer");
}

function startMyTimer() {
  console.log("Hello to myFunction");
  chrome.runtime.sendMessage({ "command": "startTimer" });  
}

function stopMyTimer() {
  console.log("Bye bye to my timer");
  chrome.runtime.sendMessage({
    "command": "stopTimer"
  });
}
function addMessageListeners() {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.command === "updateTime") {
        var time = request.time;
        document.getElementById("time").innerText = time;
      }
    });
console.log("Added message listener for a command updateTime.");
}


function addOnClick() {
  // for starting creating a new message
  // for stopping create another message

  document.getElementById("start").onclick = function() {
    console.log("Starting timer with button");
    startMyTimer();
  }

  document.getElementById("stop").onclick = function() {
    console.log("Stopping timer with button");
    stopMyTimer();
  }
}
document.addEventListener('DOMContentLoaded', init);