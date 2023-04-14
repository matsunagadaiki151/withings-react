type Headers = {
  "Content-Type": string;
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
  limitTime: string;
};

type AuthParams = {
  code: string;
};

type RefreshParams = {
  refresh_token: string;
};

export type { Headers, Tokens, AuthParams, RefreshParams };
