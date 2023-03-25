import React, { useEffect } from "react";
import "./App.css";
import Authorize from "./components/Authorize";
import Main from "./components/Main";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, Provider } from "react-redux";
import { setEndpoint } from "./modules/actions";
import { store } from "./modules/store";
import axios from "axios";

type Tokens = {
  accessToken: string;
};

function MyComponent() {
  const dispatch = useDispatch();
  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const ENDPOINT = process.env.REACT_APP_ENDPOINT;
    dispatch(setEndpoint(ENDPOINT));
  }, [dispatch]);

  const location = useLocation();

  const renderComponent = () => {
    const tokens: Tokens = require("./data/tokens.json");
    const queryParams = queryString.parse(location.search);

    if (!tokens["accessToken"] && !queryParams["code"]) {
      return <Authorize />;
    } else if (!tokens["accessToken"]) {
      const authCode = queryParams["code"];

      const params = {
        code: authCode,
      };

      const fetchTokenData = async () => {
        const ENDPOINT = process.env.REACT_APP_ENDPOINT;
        const response = await axios.get(`${ENDPOINT}/get_token`, {
          params: params,
          headers: headers,
        });

        const data = response.data;
        const accessToken = data["body"]["access_token"];
        const refreshToken = data["body"]["refresh_token"];
      };

      fetchTokenData();

      return <div>{authCode}</div>;
    } else {
      return <Main />;
    }
  };

  return <>{renderComponent()}</>;
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
