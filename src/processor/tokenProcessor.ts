import axios from "axios";
import queryString from "query-string";
import { Tokens, Headers, AuthParams, RefreshParams } from "../type/types";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

export const loadTokens = async (
  dbEndpoint: string | undefined,
  headers: Headers
): Promise<Tokens> => {
  const response = await axios.get(`${dbEndpoint}/tokens`, {
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
  await axios.post(`${ENDPOINT}/refresh_token`, null, {
    params: params,
    headers: headers,
  });
};

export const fetchWeightsData = async (
  accessToken: string,
  headers: Headers
) => {
  const params = {
    access_token: accessToken,
  };
  const authHeader = {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  };

  const measures = await axios.get(`${ENDPOINT}/load_measures`, {
    params: params,
    headers: authHeader,
  });

  return measures;
};
