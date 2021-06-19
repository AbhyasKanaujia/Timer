var lapUsed = false;
var lapTable;
var rowCount = 0;
var previousFastest = null;
var previousSlowest = null;

function updateLapTable(currentLapTime, totalTime) {
    addLap(currentLapTime);
    if (!lapUsed) initializeTable();
    addRow(currentLapTime, totalTime);
}

function resetLapTable() {
    rowCount = 0;
    previousSlowest = null;
    previousFastest = null;
    lapUsed = false;
    resetLapModel();
    document.querySelector('#lapTable').innerHTML = "";
}

function initializeTable() {
    // Table Headers 
    tableHeaders = document.createElement('tr');
    document.querySelector('#lapTable').appendChild(tableHeaders);

    var columns = ['Lap', 'Time', 'Total'];
    columns.forEach(columnName => {
        var header = document.createElement('th');
        header.setAttribute('scope', 'col'); // bootstrap attribute
        header.innerHTML = columnName;
        tableHeaders.appendChild(header);
    });

    lapUsed = true;
}

function addFastestBadge() {
    var fastestLap = getFastestLap();
    if (previousFastest != fastestLap) {
        var lapTable = document.getElementById('lapTable');
        if (previousFastest !== null) { // remove previous fastest badge
            var rowToUpdate = lapTable.childNodes[lapTable.childElementCount - previousFastest - 1];
            var cellToUpdate = rowToUpdate.childNodes[0];
            cellToUpdate.removeChild(document.getElementById('fastestTableBadge'));
        }
        // add new badge
        var rowToUpdate = lapTable.childNodes[lapTable.childElementCount - fastestLap - 1];
        var cellToUpdate = rowToUpdate.childNodes[0];
        cellToUpdate.innerHTML += ' <span class="badge bg-success" id="fastestTableBadge">Fastest</span>';
        previousFastest = fastestLap;
    }
}


function addSlowestBadge() {
    var slowestLap = getSlowestLap();
    if (slowestLap == (rowCount - 1)) {
        var lapTable = document.getElementById('lapTable');
        if (previousSlowest !== null) { // remove previous slowest badge
            var rowToUpdate = lapTable.childNodes[lapTable.childElementCount - previousSlowest - 1];
            var cellToUpdate = rowToUpdate.childNodes[0];
            cellToUpdate.removeChild(document.getElementById('slowestTableBadge'));
        }
        // add new badge
        var rowToUpdate = lapTable.childNodes[lapTable.childElementCount - slowestLap - 1];
        var cellToUpdate = rowToUpdate.childNodes[0];
        cellToUpdate.innerHTML += ' <span class="badge bg-danger" id="slowestTableBadge">Slowest</span>';
        previousSlowest = slowestLap;
    }
}


function addRow(currentLapTime, totalTime) {
    var row = document.querySelector('#lapTable').insertRow(1);
    var values = [++rowCount, differenceToString(currentLapTime), differenceToString(totalTime)];

    values.forEach(value => {
        var cell = document.createElement('td');
        cell.innerHTML = value;
        row.appendChild(cell);
    });
    addFastestBadge();
    addSlowestBadge();
}

function differenceToString(difference) {
    var hour = parseInt(difference.as('hours'));
    var minute = parseInt(difference.as('minutes')) % 60;
    var second = parseInt(difference.as('seconds')) % 60;
    var millisecond = parseInt(parseInt(difference.as('milliseconds')) % 1000 / 100);


    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;

    return `${hour}:${minute}:${second}.${millisecond}`;
}