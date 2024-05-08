export interface DbUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface DbUserSession {
  id: string;
  user_id: number;
  token: string;
  refresh_token: string;
  expires_at: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
  expires_at: Date;
}
