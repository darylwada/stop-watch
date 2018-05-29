var $startBtn = document.querySelector('.start-btn')
var $resetBtn = document.querySelector('.reset-btn')
var $elapsedTime = document.querySelector('.elapsed-time')
var $timeLimit = document.querySelector('#time-limit-input')
var timerRunning = false
var timerInterval

function stopTimer() {
  clearInterval(timerInterval)
}

function updateTime() {
  var elapsedTime = parseInt($elapsedTime.textContent)
  var timeLimit = parseInt($timeLimit.value)
  if (elapsedTime === timeLimit) {
    stopTimer()
  }
  else {
    $elapsedTime.textContent = elapsedTime + 1
  }
}

function startTimer() {
  if (timerRunning) {
    stopTimer()
    $startBtn.textContent = 'Start'
    $startBtn.classList.remove('started')
  }
  else {
    timerInterval = setInterval(updateTime, 1000)
    $startBtn.textContent = 'Pause'
    $startBtn.classList.add('started')
    $resetBtn.classList.remove('hidden')
  }
  timerRunning = !timerRunning
}

function resetTimer() {
  stopTimer()
  $elapsedTime.textContent = 0
  $startBtn.textContent = 'Start'
  $startBtn.classList.remove('started')
  $resetBtn.classList.add('hidden')
  timerRunning = false
}

$startBtn.addEventListener('click', startTimer)
$resetBtn.addEventListener('click', resetTimer)
