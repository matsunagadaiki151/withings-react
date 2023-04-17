import dayjs from "dayjs";
import { RootState } from "../modules/store";
import MyWeight from "./MyWeight";
import Title from "./Title";
import WeightChart from "./WeightChart";
import { useSelector } from "react-redux";

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

  return (
    <>
      <Title>私の体重の遷移</Title>
      <MyWeight>{displayText}</MyWeight>
      <WeightChart />
    </>
  );
};

export default Main;
