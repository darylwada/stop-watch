

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
  // Change the text depending on whether the timer has started or not
  if (stopWatchState.isStarted) {
    $startBtn.textContent = 'Pause'
  }
  else {
    $startBtn.textContent = 'Start'
  }
  // Change the background color depending on whether the timer is paused or not
  if (stopWatchState.isPaused) {
    $startBtn.classList.remove('started')
  }
  else if (!stopWatchState.isPaused) {
    $startBtn.classList.add('started')
  }
  // if (stopWatchState.isStarted) {
  //   $startBtn.addEventListener('click', startTimer)
  // }
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

function refresh() {
  stopWatchState.timeElapsed += 1
  console.log(stopWatchState);
  document.body.prepend(renderStopWatch(stopWatchState))
}

function stopTimer() {
  clearInterval(timerInterval)
}

function startTimer() {
  if (!stopWatchState.isPaused) {
    stopTimer()
  }
  else if (!stopWatchState.isStarted || stopWatchState.isPaused) {
    timerInterval = setInterval(refresh, 1000)
  }
  stopWatchState.isStarted = true
  stopWatchState.isPaused = !stopWatchState.isPaused
}

// Initial conditions
var stopWatchState = {
  isStarted: false,
  isPaused: true,
  timeElapsed: 0,
  timeLimit: 5
}
var timerInterval

// Add initial content to the page
document.body.prepend(renderStopWatch(stopWatchState))

var $body = document.querySelector('body')
$body.addEventListener('click', function(e) {
  var $startBtn = document.querySelector('.start-btn')
  if (e.target === $startBtn) {
    startTimer()
  }
})







// var $startBtn = document.querySelector('.start-btn')
// var $resetBtn = document.querySelector('.reset-btn')
// var $elapsedTime = document.querySelector('.elapsed-time')
// var $timeLimit = document.querySelector('#time-limit-input')
// var timerRunning = false
// var timerInterval
//
// function stopTimer() {
//   clearInterval(timerInterval)
// }
//
// function updateTime() {
//   var elapsedTime = parseInt($elapsedTime.textContent)
//   var timeLimit = parseInt($timeLimit.value)
//   if (elapsedTime === timeLimit) {
//     stopTimer()
//     $elapsedTime.classList.add('expired')
//   }
//   else {
//     $elapsedTime.textContent = elapsedTime + 1
//   }
// }
//
// function startTimer() {
//   if (timerRunning) {
//     stopTimer()
//     $startBtn.textContent = 'Start'
//     $startBtn.classList.remove('started')
//   }
//   else {
//     timerInterval = setInterval(updateTime, 1000)
//     $startBtn.textContent = 'Pause'
//     $startBtn.classList.add('started')
//     $resetBtn.classList.remove('hidden')
//   }
//   timerRunning = !timerRunning
// }
//
// function resetTimer() {
//   stopTimer()
//   $elapsedTime.textContent = 0
//   $elapsedTime.classList.remove('expired')
//   $startBtn.textContent = 'Start'
//   $startBtn.classList.remove('started')
//   $resetBtn.classList.add('hidden')
//   timerRunning = false
// }
//
// $startBtn.addEventListener('click', startTimer)
// $resetBtn.addEventListener('click', resetTimer)
