import React, { useEffect } from "react";
import "./App.css";
import Authorize from "./components/Authorize";
import Main from "./components/Main";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, Provider } from "react-redux";
import { setEndpoint } from "./modules/actions";
import { store } from "./modules/store";

type Tokens = {
  accessToken: string;
};

function MyComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const ENDPOINT = "http://localhost:8000";
    dispatch(setEndpoint(ENDPOINT));
  }, [dispatch]);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const tokens: Tokens = require("./data/tokens.json");
  const needAuthorize = !tokens["accessToken"] && !queryParams["code"];

  return <>{needAuthorize ? <Authorize /> : <Main />}</>;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MyComponent />
      </Router>
    </Provider>
  );
}

export default App;
