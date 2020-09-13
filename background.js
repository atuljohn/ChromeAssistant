var states = {
    "off": "nothing to see here",
    "pomodoro": "still nothing to see"
};

var currentState = "off";
var timer;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    if(request.command === "startTimer" && currentState === "off") {
        startTimer();
        sendResponse({message : "Timer started"});
    }
    if(request.command === "stopTimer") {
        stopTimer();
        currentState = "off";
        sendResponse({message : "Timer stopped"});
    }
})


function startTimer() {
    console.log("insider startTimer");
    // Creates a moment object that reads current time or something.
    var start = moment();
    timer = setInterval(function() {
      // diff give the difference between the current time and 
      // a moment object we had created some time back.
      var diff = moment().diff(start, 'seconds');
      updateTime(diff);
      if (diff > 10) {
          clearInterval(timer);
          notifyUser();
      }
      //document.getElementById("time").innerText = diff;
    }, 1000);
    currentState = "pomodoro";
  }

  function stopTimer() {
        console.log("Insider stopTimer");
        clearInterval(timer);
        timer = null;
        chrome.runtime.sendMessage({
            command: "timerChathu"
        });
  }

  function updateTime(diff) {
      chrome.runtime.sendMessage({
          "command": "updateTime",
          "time": diff});
  }

  function notifyUser() {
      var opts = {
          "type": "basic",
          "title": "Break Time!",
          "message": "Time for a break!",
          "iconUrl": "/images/get_started16.png"
      };
      var idBase = "pomodoro";
      var id = idBase + (new Date()).getTime();
      chrome.notifications.create(id, opts, function() {
          console.log("notification sent");
      });
  }