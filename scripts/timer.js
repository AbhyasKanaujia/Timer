var timerRunning = false;
var initialState = true;
var beginTime;
var difference;

function toggleTimer() {
    timerRunning = !timerRunning;
    initializeTimer();
    if (timerRunning) timerCycle();
    updateUIToggle();

}

function initializeTimer() {
    if (initialState) {
        beginTime = moment();
        initialState = false;
    } else {
        beginTime = moment().subtract(difference);
    }
}

function resetTimer() {
    timerRunning = false;
    initialState = true;
    updateUINewTime(0, 0, 0, 0);
    updateUIReset();
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
    millisecond = parseInt((millisecond % 1000) / 100);

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
    document.querySelector('#stopButton').disabled = false;
    document.querySelector('#flagButton').disabled = false;
    document.querySelector('#toggleButtonIcon').classList.remove('fa-pause');
    document.querySelector('#toggleButtonIcon').classList.add('fa-play');
}