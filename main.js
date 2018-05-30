var stopWatchState = {
  isStarted: false,
  timeElapsed: 0,
  timeLimit: 5
}

function renderTimeLimit(stopWatchState) {
  var $timeLimitContainer = document.createElement('div')
  var $timeLimitLabel = document.createElement('p')
  var $timeLimitInput = document.createElement('input')
  $timeLimitContainer.classList.add('time-limit-container')
  $timeLimitLabel.classList.add('time-limit-label')
  $timeLimitInput.id = 'time-limit-input'

  $timeLimitLabel.textContent = 'Time Limit'

  $timeLimitContainer.appendChild($timeLimitLabel)
  $timeLimitContainer.appendChild($timeLimitInput)

  return $timeLimitContainer
}

function renderResetBtn(stopWatchState) {
  var $resetBtn = document.createElement('button')
  $resetBtn.classList.add('reset-btn')
  if (!stopWatchState.isStarted) {
    $resetBtn.classList.add('hidden')
  }
  return $resetBtn
}

function renderTime(stopWatchState) {
  var $elapsedTime = document.createElement('div')
  $elapsedTime.classList.add('elapsed-time')
  $elapsedTime.textContent = stopWatchState.timeElapsed
  if (stopWatchState.timeElapsed === stopWatchState.timeLimit) {
    $elapsedTime.classList.add('expired')
  }
  return $elapsedTime
}

function renderStartBtn(stopWatchState) {
  var $startBtn = document.createElement('button')
  $startBtn.classList.add('start-btn')
  if (stopWatchState.isStarted) {
    $startBtn.textContent = 'Pause'
  }
  else {
    $startBtn.textContent = 'Start'
  }
  return $startBtn
}

function renderStopWatch(stopWatchState) {
  var $container = document.createElement('div')
  var $header = document.createElement('h1')
  $header.textContent = 'Stop Watch'
  $container.appendChild($header)
  $container.appendChild(renderTime(stopWatchState))
  $container.appendChild(renderStartBtn(stopWatchState))
  $container.appendChild(renderResetBtn(stopWatchState))
  $container.appendChild(renderTimeLimit(stopWatchState))

  return $container
}

document.body.appendChild(renderStopWatch(stopWatchState))


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
    $elapsedTime.classList.add('expired')
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
  $elapsedTime.classList.remove('expired')
  $startBtn.textContent = 'Start'
  $startBtn.classList.remove('started')
  $resetBtn.classList.add('hidden')
  timerRunning = false
}

$startBtn.addEventListener('click', startTimer)
$resetBtn.addEventListener('click', resetTimer)
