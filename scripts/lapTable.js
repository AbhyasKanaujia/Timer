var lapUsed = false;
var lapTable;
var rowCount = 0;

function updateLapTable(currentLapTime, totalTime) {
    if (!lapUsed) initializeTable();
    addRow(currentLapTime, totalTime)

}

function resetLapTable() {
    rowCount = 0;
    lapUsed = false;
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



    // var x = document.getElementById("myList").lastChild.innerHTML;


    lapUsed = true;
}

function addRow(currentLapTime, totalTime) {
    var row = document.querySelector('#lapTable').insertRow(1);
    var values = [++rowCount, differenceToString(currentLapTime), differenceToString(totalTime)];

    values.forEach(value => {
        var cell = document.createElement('td');
        cell.innerHTML = value;
        row.appendChild(cell);
    });
}

function differenceToString(difference) {
    var hour = parseInt(difference.as('hours'));
    var minute = parseInt(difference.as('minutes'));
    var second = parseInt(difference.as('seconds'));
    var millisecond = parseInt(parseInt(difference.as('milliseconds')) % 1000 / 100);


    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;

    return `${hour}:${minute}:${second}.${millisecond}`;
}