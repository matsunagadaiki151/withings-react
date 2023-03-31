type Headers = {
  "Content-Type": string;
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
  limitTime: string;
};

type AuthParams = {
  code: string | null;
};

export type { Headers, Tokens, AuthParams };
