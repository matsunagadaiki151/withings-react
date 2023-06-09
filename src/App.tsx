import React, { useEffect, useState } from "react";
import "./App.css";
import Authorize from "./components/Authorize";
import Main from "./components/Main";
import {
  BrowserRouter as Router,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import queryString from "query-string";
import { useDispatch, Provider } from "react-redux";
import { setEndpoint, setWeights } from "./modules/actions";
import { store } from "./modules/store";
import type { Location } from "react-router-dom";
import { Headers } from "./type/types";
import {
  fetchRefreshTokenData,
  fetchTokenData,
  fetchWeightsData,
  loadAuthCodeFromQueryParams,
  loadTokens,
} from "./processor/tokenProcessor";
import dayjs from "dayjs";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

// 定数の定義
const headers: Headers = {
  "Content-Type": "application/json",
};

const DB_ENDPOINT = process.env.REACT_APP_DB_ENDPOINT;

const RenderComponent = async (
  location: Location,
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
) => {
  const tokens = await loadTokens(DB_ENDPOINT, headers);
  // クエリパラメータを取得する。
  const queryParams = queryString.parse(location.search);

  if (!tokens["accessToken"] && !queryParams["code"]) {
    return <Authorize />;
  } else if (!tokens["accessToken"]) {
    const authCode = loadAuthCodeFromQueryParams(queryParams);
    if (typeof authCode === "string") {
      const params = {
        code: authCode,
      };
      await fetchTokenData(params, headers);
    }

    navigate("/", {});
    return <div>アクセストークンを更新しました。</div>;
  } else {
    const limitTime = tokens["limitTime"];
    if (dayjs(limitTime) <= dayjs()) {
      const params = {
        refresh_token: tokens["refreshToken"],
      };
      await fetchRefreshTokenData(params, headers);
      navigate("/", {});
    }
    const measures = await fetchWeightsData(tokens["accessToken"], headers);
    const weightsData = measures["data"];
    dispatch(setWeights(weightsData));
    return <Main />;
  }
};

function MyComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(<>ロード中です。</>);

  useEffect(() => {
    const ENDPOINT = process.env.REACT_APP_ENDPOINT;
    dispatch(setEndpoint(ENDPOINT));
  }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    const render = async () => {
      const nowPage = await RenderComponent(location, navigate, dispatch);
      setPage(nowPage);
    };
    render();
  }, [location, navigate, dispatch]);

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
