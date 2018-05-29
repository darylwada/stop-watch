var $startBtn = document.querySelector('.start-btn')
var $elapsedTime = document.querySelector('.elapsed-time')

function updateTime() {
  $elapsedTime.textContent = parseInt($elapsedTime.textContent) + 1
}

function startTimer() {
  setInterval(updateTime, 1000)
}

$startBtn.addEventListener('click', startTimer)
