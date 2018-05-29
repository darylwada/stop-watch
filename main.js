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
  if (timerRunning) {
    stopTimer()
    $startBtn.textContent = 'Start'
  }
  else {
    timerInterval = setInterval(updateTime, 1000)
    $startBtn.textContent = 'Pause'
  }
  timerRunning = !timerRunning
}

$startBtn.addEventListener('click', startTimer)
