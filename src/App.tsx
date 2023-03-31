import React, { useEffect, useState } from "react";
import "./App.css";
import Authorize from "./components/Authorize";
import Main from "./components/Main";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, Provider } from "react-redux";
import { setEndpoint } from "./modules/actions";
import { store } from "./modules/store";
import type { Location } from "react-router-dom";
import { Headers, Tokens } from "./type/types";
import {
  fetchTokenData,
  loadAuthCodeFromQueryParams,
  loadTokens,
} from "./processor/tokenProcessor";
import dayjs from "dayjs";
import axios from "axios";

// 定数の定義
const headers: Headers = {
  "Content-Type": "application/json",
};
const DB_ENDPOINT = process.env.REACT_APP_DB_ENDPOINT;

const renderComponent = async (location: Location) => {
  const tokens = await loadTokens(DB_ENDPOINT, headers);
  const newTokens = { ...tokens };
  // クエリパラメータを取得する。
  const queryParams = queryString.parse(location.search);

  if (!tokens["accessToken"] && !queryParams["code"]) {
    return <Authorize />;
  } else if (!tokens["accessToken"]) {
    const authCode = loadAuthCodeFromQueryParams(queryParams);
    const params = {
      code: authCode,
    };
    await fetchTokenData(newTokens, params, DB_ENDPOINT, headers);
    return <div>アクセストークンを更新しました。</div>;
  } else {
    const limitTime = tokens["limitTime"];
    if (dayjs(limitTime) <= dayjs()) {
      const refreshTokenData = async () => {
        const ENDPOINT = process.env.REACT_APP_ENDPOINT;

        // const authCode = loadAuthCodeFromQueryParams(queryParams);
        const refreshToken = tokens["refreshToken"];
        const params = {
          refresh_token: refreshToken,
        };
        const response = await axios.get(`${ENDPOINT}/refresh_token`, {
          params: params,
          headers: headers,
        });

        const data = response.data;
        if (data["status"] !== 601) {
          newTokens["accessToken"] = data["body"]["access_token"];
          newTokens["refreshToken"] = data["body"]["refresh_token"];
          const limitTime = dayjs().add(
            parseInt(data["body"]["expires_in"]),
            "second"
          );
          const limitTimeStr = limitTime.format("YYYY-MM-DD HH:mm:ss");
          if (limitTimeStr !== "Invalid Date") {
            newTokens["limitTime"] = limitTimeStr;
          }
          const postTokens = async (tokens: Tokens) => {
            const DB_ENDPOINT = process.env.REACT_APP_DB_ENDPOINT;
            await axios.post(`${DB_ENDPOINT}/tokens`, {
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
              limitTime: tokens.limitTime,
            });
          };
          postTokens(newTokens);
        }
      };
      refreshTokenData();
    }
    return <Main />;
  }
};

function MyComponent() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(<>ロード中です。</>);

  useEffect(() => {
    const ENDPOINT = process.env.REACT_APP_ENDPOINT;
    dispatch(setEndpoint(ENDPOINT));
  }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    const render = async () => {
      const nowPage = await renderComponent(location);
      setPage(nowPage);
    };
    render();
  }, [location]);

  return <>{page}</>;
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
