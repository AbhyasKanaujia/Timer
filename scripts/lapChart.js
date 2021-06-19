var initialStateChart = true;
var chartXAxis = 0;
var lapChart;

function updateLapChart() {
    if (initialStateChart) initializeChart();
    lapChart.data.labels.push(++chartXAxis);
    lapChart.data.datasets.forEach((dataset) => {
        dataset.data.push(getLastLap() / 1000);
    });
    lapChart.update();
}

function initializeChart() {
    var lapChartContainer = document.getElementById("lapChartContainer");
    lapChartContainer.innerHTML = '<canvas id="lapChartCanvas"></canvas>';
    var ctx = document.getElementById('lapChartCanvas').getContext('2d');
    lapChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Laps",
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.5
            }]
        },
        options: {
            responsive: true,

        }
    });
    initialStateChart = false;
}

function resetLapChart() {
    document.getElementById("lapChartContainer").innerHTML = "";
    lapChart.destroy();
    chartXAxis = 0;
    initialStateChart = true;
}