import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graphic({ forecastData }) {
  const labels = forecastData.list.map((item) =>
    new Date(item.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const temperatures = forecastData.list.map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecastData.list.map((el) => el.main.temp),
        borderColor: "rgba(128, 128, 128, 0.8)", 
        backgroundColor: "rgba(128, 128, 128, 0.3)",
        tension: 0.2,
      },
    ]
  };    

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature Forecast",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (\u00B0C)",
        },
      },
    },
  };

  return (
    <div className="hidden xl:block p-6">
      <Line data={data} options={options} />
    </div>
  );
}
