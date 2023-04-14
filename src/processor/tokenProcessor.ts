import axios from "axios";
import queryString from "query-string";
import { Tokens, Headers, AuthParams, RefreshParams } from "../type/types";

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

export const fetchTokenData = async (params: AuthParams, headers: Headers) => {
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  const response = await axios.post(`${ENDPOINT}/get_token`, null, {
    params: params,
    headers: headers,
  });

  console.log(response);
};

export const fetchRefreshTokenData = async (
  params: RefreshParams,
  headers: Headers
) => {
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  await axios.post(`${ENDPOINT}/refresh_token`, {
    params: params,
    headers: headers,
  });
};
