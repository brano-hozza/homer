export interface DbUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface DbUserSession {
  id: number;
  user_id: number;
  token: string;
  refresh_token: string;
  expires_at: Date;
}

export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
}
