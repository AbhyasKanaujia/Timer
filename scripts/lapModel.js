var lapDurations = [];

function addLap(lapDuration) {
    lapDurations.push(lapDuration.as('milliseconds'));
}

function getFastestLap() {
    return lapDurations.indexOf(Math.min(...lapDurations));
}

function getSlowestLap() {
    return lapDurations.indexOf(Math.max(...lapDurations));
}


function getAverageLap() {
    var sum = lapDurations.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    var avg = (sum / lapDurations.length) || 0;

    console.log(sum);
    console.log(avg);
}

function resetLapModel() {
    lapDurations = [];
}

function getLastLap() {
    return lapDurations[lapDurations.length - 1];
}