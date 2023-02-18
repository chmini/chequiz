export interface RegisterPayload {
  email: string;
  password: string;
  nickname: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export type User = RegisterPayload & {
  id: string;
};
