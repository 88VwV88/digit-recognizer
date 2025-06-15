import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, LinearScale, Tooltip, Legend);
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function Predicted({ distrib }: { distrib: number[] }) {
  const data = {
    labels: DIGITS,
    datasets: [
      {
        label: "Probability Distribution",
        data: distrib,
        backgroundColor: [
          "rgba(255, 87, 51, 0.8)",
          "rgba(51, 255, 87, 0.8)",
          "rgba(87, 51, 255, 0.8)",
          "rgba(255, 195, 0, 0.8)",
          "rgba(255, 51, 161, 0.8)",
          "rgba(0, 191, 255, 0.8)",
          "rgba(255, 106, 0, 0.8)",
          "rgba(138, 43, 226, 0.8)",
          "rgba(50, 205, 50, 0.8)",
          "rgba(220, 20, 60, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full min-h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
}
