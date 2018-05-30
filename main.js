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
  $resetBtn.textContent = 'Reset'
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
  // Change the text depending on whether the timer has started or not
  if (stopWatchState.isStarted) {
    $startBtn.textContent = 'Pause'
  }
  if (stopWatchState.isPaused) {
    $startBtn.textContent = 'Start'
  }
  // Change the background color depending on whether the timer is paused or not
  if (stopWatchState.isPaused) {
    $startBtn.classList.remove('started')
  }
  else if (!stopWatchState.isPaused) {
    $startBtn.classList.add('started')
  }
  return $startBtn
}

function renderStopWatch(stopWatchState) {
  document.body.innerHTML = ''
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

function refresh(element) {
  if (!stopWatchState.isPaused && element !== 'button') {
    stopWatchState.timeElapsed += 1
  }
  if (stopWatchState.timeElapsed === stopWatchState.timeLimit) {
    stopTimer()
  }
  document.body.prepend(renderStopWatch(stopWatchState))
}

function resetTimer() {
  stopTimer()
  stopWatchState.isStarted = false
  stopWatchState.isPaused = true
  stopWatchState.timeElapsed = 0
  stopWatchState.timeLimit = null
  stopWatchState.timerInterval = null
  document.body.prepend(renderStopWatch(stopWatchState))
}

function stopTimer() {
  clearInterval(stopWatchState.timerInterval)
}

function startTimer() {
  if (!stopWatchState.isPaused) {
    stopWatchState.isPaused = true
    stopTimer()
    refresh()
  }
  else if (!stopWatchState.isStarted || stopWatchState.isPaused) {
    stopWatchState.isPaused = false
    stopWatchState.timerInterval = setInterval(refresh, 1000)
  }
  stopWatchState.isStarted = true
}

// Initial conditions
var stopWatchState = {
  isStarted: false,
  isPaused: true,
  timeElapsed: 0,
  timeLimit: null,
  timerInterval: null
}

// Add initial content to the page
document.body.prepend(renderStopWatch(stopWatchState))

var $body = document.querySelector('body')
$body.addEventListener('click', function(e) {
  var $startBtn = document.querySelector('.start-btn')
  var $resetBtn = document.querySelector('.reset-btn')
  var $timeLimit = document.querySelector('#time-limit-input')
  stopWatchState.timeLimit = parseInt($timeLimit.value)
  if (e.target === $startBtn) {
    startTimer()
  }
  else if (e.target === $resetBtn) {
    resetTimer()
  }
})
