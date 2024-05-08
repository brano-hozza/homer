import type { SimpleUser, User } from "~/types";
import sql from "../utils/db";
import { RepositoryError } from "../errors/repository";

export function authRepository() {
  const getUser = async (token: string): Promise<User> => {
    type Entity = {
      id: string;
      name: string;
      email: string;
      password: string;
      token: string;
      refresh_token: string;
      expires_at: string;
    };

    const users = await sql<
      Entity[]
    >`SELECT us.*, se.token, se.refresh_token, se.expires_at FROM users us JOIN sessions se ON us.id = se.user_id WHERE se.token = ${token}`;

    if (users.length === 0) {
      throw RepositoryError.NOT_FOUND();
    }

    const db_user = users[0];

    return {
      id: db_user.id,
      name: db_user.name,
      email: db_user.email,
      token: db_user.token,
      refreshToken: db_user.refresh_token,
      expiresAt: new Date(db_user.expires_at),
    };
  };

  const getUserByUsername = async (username: string): Promise<SimpleUser> => {
    const users = await sql<
      SimpleUser[]
    >`SELECT * FROM users WHERE name = ${username}`;

    if (users.length === 0) {
      throw RepositoryError.NOT_FOUND();
    }

    return users[0];
  };

  const createSession = async (
    user_id: string,
    token: string,
    refresh_token: string,
    expires_at: Date
  ) => {
    await sql`INSERT INTO sessions (user_id, token, refresh_token, expires_at) VALUES (${user_id}, ${token}, ${refresh_token}, ${expires_at})`;
  };

  return {
    getUser,
    getUserByUsername,
    createSession,
  };
}
