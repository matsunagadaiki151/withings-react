import axios from "axios";
import dayjs from "dayjs";
import queryString from "query-string";
import { Tokens, Headers, AuthParams } from "../type/types";

export const loadTokens = async (
  endpoint: string | undefined,
  headers: Headers
): Promise<Tokens> => {
  const response = await axios.get(`${endpoint}/tokens`, {
    headers: headers,
  });
  return response.data;
};

export const loadAuthCodeFromQueryParams = (
  queryParams: queryString.ParsedQuery<string>
) => {
  const authCode = queryParams["code"];
  if (Array.isArray(authCode)) {
    return authCode[0];
  } else {
    return authCode;
  }
};

export const fetchTokenData = async (
  newTokens: Tokens,
  params: AuthParams,
  endpoint: string | undefined,
  headers: Headers
) => {
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  const response = await axios.get(`${ENDPOINT}/get_token`, {
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
    postTokens(newTokens);
  }
};

const postTokens = async (tokens: Tokens) => {
  const DB_ENDPOINT = process.env.REACT_APP_DB_ENDPOINT;
  await axios.post(`${DB_ENDPOINT}/tokens`, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    limitTime: tokens.limitTime,
  });
};
