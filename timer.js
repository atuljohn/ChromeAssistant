// Timer from https://medium.com/@abhi9bakshi/why-javascript-timer-is-unreliable-and-how-can-you-fix-it-9ff5e6d34ee0
// Deprecated above.
// Following from https://github.com/gt-webdev/tomato

function init() {
  addMessageListeners();
  console.log("Added message listeners I think");
  startMyTimer();
  console.log("After startTimer");
}

function startMyTimer() {
  console.log("Hello to myFunction");
  chrome.runtime.sendMessage({ "command": "startTimer" },
    function (response) {
      console.log(response.message);
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

document.addEventListener('DOMContentLoaded', init);