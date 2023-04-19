import dayjs from "dayjs";
import { RootState } from "../modules/store";
import MyWeight from "./MyWeight";
import {
  CategoryScale,
  Chart as ChartJS,
  TimeScale,
  Legend,
  LineElement,
  Title as ChartTitle,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

import Title from "./Title";

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const Main = () => {
  const weights = useSelector((state: RootState) => state.weights.weights);
  // format : YYYY/MM/DD
  const todayStr = dayjs().format("YYYY/MM/DD");
  let displayText = "";
  if (weights.hasOwnProperty(todayStr)) {
    const todayWeightStr = Number.parseFloat(weights[todayStr]).toFixed(1);
    displayText = `今日の体重 : ${todayWeightStr}kg`;
  } else {
    displayText = "今日の体重はまだ測られていません。";
  }

  const sortedStrDates = Object.keys(weights).sort((a, b) =>
    dayjs(a).diff(dayjs(b))
  );
  const sortedWeights = sortedStrDates.map((date) => weights[date]);
  const sortedDates = sortedStrDates.map((date) => new Date(date));

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      display: false,
    },
    scales: {
      x: {
        beginAtZero: true,
        type: "time" as const,
        time: { unit: "week" as const, displayFormats: { week: "yyyy/MM/dd" } },
        ticks: {
          font: {
            size: 24,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        ticks: {
          font: {
            size: 24,
          },
        },
      },
    },
  };

  const graphData = {
    labels: sortedDates,
    datasets: [
      {
        label: "私の体重",
        data: sortedWeights,
        borderColor: "rgb(187, 201, 235)",
      },
    ],
  };

  return (
    <>
      <Title>私の体重の遷移</Title>
      <MyWeight>{displayText}</MyWeight>
      <div className="m-auto w-8/12 h-[800px]">
        <Line options={graphOptions} data={graphData} />
      </div>
    </>
  );
};

export default Main;
