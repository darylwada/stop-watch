var $startBtn = document.querySelector('.start-btn')
var $elapsedTime = document.querySelector('.elapsed-time')
var timerRunning = false

function updateTime() {
  $elapsedTime.textContent = parseInt($elapsedTime.textContent) + 1
}

function startTimer() {
  timerRunning = !timerRunning
  setInterval(updateTime, 1000)
}

$startBtn.addEventListener('click', startTimer)
