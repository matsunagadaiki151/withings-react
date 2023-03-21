import React from "react";
import MyWeight from "./MyWeight";
import Title from "./Title";
import WeightChart from "./WeightChart";

const Main = () => {
  return (
    <>
      <Title>私の体重の遷移</Title>
      <MyWeight todayWeight={72.6} />
      <WeightChart />
    </>
  );
};

export default Main;
