export interface SimpleUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
}
