/*eslint-disable no-unused-vars*/
// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";

function configs(labels, datasets, maxX) {
  const getRandomColor = () => {
    // Generate random values for red, green, and blue channels
    const red = Math.floor(Math.random() * 170) + 86;
    const green = Math.floor(Math.random() * 170) + 86;
    const blue = Math.floor(Math.random() * 170) + 86;
    // Construct and return the color string in hexadecimal format
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  };

  datasets.forEach((dataset, index) => {
    dataset.backgroundColor = getRandomColor(); // Default color if no custom color provided
  });

  return {
    data: {
      labels,
      datasets: datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.map((dataItem, index) => ({
          x: dataItem[0], // Custom label for x-axis
          y: dataItem[1], // Value for y-axis
          label: dataItem[2], // Custom label for the data item
        })),
      })),
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          font: {
            size: "8rem", // Font size
            family: "Arial, sans-serif", // Font family
            weight: "bold", // Font weight
          },
          color: "#000", // Optional: Set the color of the datalabels

          letterSpacing: "3px", // Custom character spacing (applied via CSS styling below)
          anchor: "center", // Optional: Controls label alignment (start, center, end)
          clamp: true, // Optional: Prevents labels from overflowing

        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          position: "average",
          displayColors: false,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleFont: {
            size: 16,
            weight: "bold",
          },
          bodyFont: {
            size: 10,
          },
          callbacks: {
            title: (tooltipItems) => {
              // This customizes the first line (title) of the tooltip
              const tooltipItem = tooltipItems[0];
              const label = tooltipItem.dataset.data[tooltipItem.dataIndex].label || "";
              const cleanLabel = label.replace(/\s*\(\d+\)$/, "");
              const customText = `${cleanLabel}`;
              return customText;
            },
            label: (tooltipItem) => {
  
const label = tooltipItem.dataset.data[tooltipItem.dataIndex].label || "";
const value = tooltipItem.dataset.data[tooltipItem.dataIndex].x || "";
const qtyMatch = label.match(/\((\d+)\)/);
const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;

              return [`Part Length:${value/qty} `,`QTY: ${qty} `,`Stock#: ${tooltipItem.label} `,`Total Length: ${value}`];
            },
          },
        },
      },
      scales: {
        y: {
          stacked: true,
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "#c1c4ce5c",
          },
          ticks: {
            display: true,
            color: "#c72238",
            padding: 10,
            font: {
              size: 11,
              family: typography.fontFamily,
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          stacked: true,
          max: maxX,
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: true,
            drawTicks: true,
            color: "#c72238",
          },
          ticks: {
            display: true,
            color: "#c72238",
            padding: 20,
            font: {
              size: 11,
              family: typography.fontFamily,
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };
}

export default configs;
