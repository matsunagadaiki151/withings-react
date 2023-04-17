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

type EnvState = {
  endpoint: string;
};

type WeightsState = {
  weights: {
    [name: string]: string;
  };
};

export type {
  Headers,
  Tokens,
  AuthParams,
  RefreshParams,
  EnvState,
  WeightsState,
};
