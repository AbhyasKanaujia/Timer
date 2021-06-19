var timerRunning = false;
var initialState = true;
var allowLapOnceAfterPause = true;
var currentStartTimeAsLapBegin = false;
var lapBegin;
var beginTime;
var difference;

function toggleTimer() {
    timerRunning = !timerRunning;
    initializeTimer();
    if (timerRunning) {
        timerCycle();
        allowLapOnceAfterPause = true;
    }
    updateUIToggle();

}

function initializeTimer() {
    if (initialState) {
        beginTime = moment();
        lapBegin = moment(beginTime);
        initialState = false;
    } else {
        beginTime = moment().subtract(difference);
        lapBegin = moment().subtract(difference);
    }

    if (currentStartTimeAsLapBegin) {
        lapBegin = moment();
        currentStartTimeAsLapBegin = false
    }
}

function resetTimer() {
    timerRunning = false;
    initialState = true;
    resetLapTable();
    updateUINewTime(0, 0, 0, 0);
    updateUIReset();
}

function lap() {
    if (timerRunning) {
        var now = moment();
        var currentLapTime = moment.duration(now.diff(lapBegin));
        var totalTime = moment.duration(now.diff(beginTime));
        updateLapTable(currentLapTime, totalTime);
        lapBegin = moment(now);
    }
    if (!timerRunning && allowLapOnceAfterPause) {
        var pausedAt = moment(beginTime).add(difference);
        var currentLapTime = moment.duration(pausedAt.diff(lapBegin));
        var totalTime = moment.duration(pausedAt.diff(beginTime));

        updateLapTable(currentLapTime, totalTime);
        lapBegin = moment(now);
        allowLapOnceAfterPause = false;
        currentStartTimeAsLapBegin = true;
        document.querySelector('#flagButton').disabled = true;
    }
}

function timerCycle() {
    if (timerRunning) {
        var now = moment();
        difference = moment.duration(now.diff(beginTime));

        updateUINewTime(difference.as('hours'), difference.as('minutes'), difference.as('seconds'), difference.as('milliseconds'));
        setTimeout("timerCycle()", 100);
    }
}

function updateUINewTime(hour, minute, second, millisecond) {
    hour = parseInt(hour);
    minute = parseInt(minute);
    second = parseInt(second);
    millisecond = parseInt(parseInt(millisecond) % 1000 / 100);

    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;

    document.querySelector('#hourDisplay').innerText = hour;
    document.querySelector('#minuteDisplay').innerText = minute;
    document.querySelector('#secondDisplay').innerText = second;
    document.querySelector('#millisecondDisplay').innerText = millisecond;
}


function updateUIToggle() {
    if (!initialState) {
        document.querySelector('#stopButton').disabled = false;
        document.querySelector('#flagButton').disabled = false;
    }
    if (timerRunning) {
        document.querySelector('#toggleButtonIcon').classList.remove('fa-play');
        document.querySelector('#toggleButtonIcon').classList.add('fa-pause');
    }
    else {
        document.querySelector('#toggleButtonIcon').classList.remove('fa-pause');
        document.querySelector('#toggleButtonIcon').classList.add('fa-play');
    }


}

function updateUIReset() {
    document.querySelector('#stopButton').disabled = true;
    document.querySelector('#flagButton').disabled = true;
    document.querySelector('#toggleButtonIcon').classList.remove('fa-pause');
    document.querySelector('#toggleButtonIcon').classList.add('fa-play');
}