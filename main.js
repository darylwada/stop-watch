var $startBtn = document.querySelector('.start-btn')
var $elapsedTime = document.querySelector('.elapsed-time')
var timerRunning = false
var timerInterval

function stopTimer() {
  clearInterval(timerInterval)
}

function updateTime() {
  $elapsedTime.textContent = parseInt($elapsedTime.textContent) + 1
}

function startTimer() {
  timerRunning = !timerRunning
  if (timerRunning) {
    stopTimer()
  }
  else {
    timerInterval = setInterval(updateTime, 1000)    
  }
}

$startBtn.addEventListener('click', startTimer)
