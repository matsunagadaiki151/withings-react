import React from "react";
import "./App.css";
import Authorize from "./components/Authorize";
import Main from "./components/Main";

function App() {
  const isAuthorized = false;
  return <>{isAuthorized ? <Main /> : <Authorize />}</>;
}

export default App;
