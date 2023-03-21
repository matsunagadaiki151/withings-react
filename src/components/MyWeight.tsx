import React from "react";

type TodayWeight = {
  todayWeight: number;
};

const MyWeight = (props: TodayWeight) => {
  return (
    <p className="font-body text-2xl text-center text-gray-600 my-3 py-2">
      今日の私の体重：{props.todayWeight}kg
    </p>
  );
};

export default MyWeight;
