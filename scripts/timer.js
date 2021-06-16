var timerRunning = false;
var initialState = true;
var beginTime;
var timerDisplay;
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
    minute = parseInt(minute) % 60;
    second = parseInt(second) % 60;
    millisecond = parseInt(millisecond % 10);

    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;

    $('#hourDisplay').text(hour);
    $('#minuteDisplay').text(minute);
    $('#secondDisplay').text(second);
    $('#millisecondDisplay').text(millisecond);
}


function updateUIToggle() {
    if (!initialState) {
        $('#stopButton').prop('disabled', false);
        $('#flagButton').prop('disabled', false);
    }
    if (timerRunning) {
        $('#toggleButtonIcon').removeClass('fa-play');
        $('#toggleButtonIcon').addClass('fa-pause');
        $('#stopButton').prop('disabled', false);
        $('#flagButton').prop('disabled', false);
    } else {
        $('#toggleButtonIcon').removeClass('fa-pause');
        $('#toggleButtonIcon').addClass('fa-play');
    }

}

