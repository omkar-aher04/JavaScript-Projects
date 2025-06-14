const input = document.querySelector(".Search");
const button = document.querySelector("button");
const listDiv = document.querySelector(".listOFStocks");
const chartDiv = document.getElementById("chart");
const dropdown = document.querySelector(".Select");

const API_KEY = "b28789b388754db785babb50bc48a2fe"; // ← Replace with your Twelve Data API key

// When search button is clicked
button.addEventListener("click", () => {
    const symbol = input.value.trim().toUpperCase();
    if (!symbol) return;
    fetchStockData(symbol);
});

// Populate dropdown with sample stock options
const sampleStocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];
sampleStocks.forEach(stock => {
    const option = document.createElement("option");
    option.value = stock;
    option.textContent = stock;
    dropdown.appendChild(option);
});

// When dropdown changes
dropdown.addEventListener("change", () => {
    const symbol = dropdown.value;
    if (symbol) fetchStockData(symbol);
});

async function fetchStockData(symbol) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&outputsize=10&apikey=${API_KEY}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.status === "error") {
            listDiv.innerHTML = `<p style="color:red;">${data.message}</p>`;
            chartDiv.innerHTML = "";
            return;
        }

        const latest = data.values[0];
        listDiv.innerHTML = `
            <p><strong>Symbol:</strong> ${symbol}</p>
            <p><strong>Price:</strong> $${latest.close}</p>
            <p><strong>Time:</strong> ${latest.datetime}</p>
        `;

        const times = data.values.slice(0, 10).reverse();
        const labels = times.map(t => t.datetime.split(" ")[1]);
        const prices = times.map(t => parseFloat(t.close));

        drawChart(labels, prices);
    } catch (err) {
        listDiv.innerHTML = `<p>Error fetching data.</p>`;
        chartDiv.innerHTML = "";
        console.error(err);
    }
}

function drawChart(labels, prices) {
    chartDiv.innerHTML = `<canvas id="myChart" height="300"></canvas>`;
    const ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price',
                data: prices,
                borderColor: '#4bc0c0',
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { title: { display: true, text: 'Price ($)' } }
            }
        }
    });
}
