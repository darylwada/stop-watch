var $startBtn = document.querySelector('.start-btn')
var $resetBtn = document.querySelector('.reset-btn')
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
  timerRunning = false
}

$startBtn.addEventListener('click', startTimer)
$resetBtn.addEventListener('click', resetTimer)
