import React from "react";
import "./App.css";
import AuthorizeButton from "./components/AuthorizeButton";
import MyWeight from "./components/MyWeight";
import Title from "./components/Title";
import WeightChart from "./components/WeightChart";

function App() {
  return (
    <>
      {<AuthorizeButton />}
      <Title />
      <MyWeight todayWeight={72.6} />
      <WeightChart />
    </>
  );
}

export default App;
