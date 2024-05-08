import sql from "@/server/utils/db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import type { DbUser, DbUserSession, User } from "@/types";

export function authService() {
  const login = async (username: string, password: string): Promise<User> => {
    const users = await sql<
      DbUser[]
    >`SELECT * FROM users WHERE name = ${username}`;
    if (users.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    // Create new session
    const token = crypto.getRandomValues(new Uint8Array(32)).join("");
    const refresh_token = crypto.getRandomValues(new Uint8Array(32)).join("");
    const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
    await sql`INSERT INTO sessions (user_id, token, refresh_token, expires_at) VALUES (${user.id}, ${token}, ${refresh_token}, ${expires_at})`;

    return {
      id: user.id,
      username: user.name,
      email: user.email,
      token,
      refreshToken: refresh_token,
      expires_at,
    };
  };

  const validateToken = async (token: string): Promise<boolean> => {
    const sessions = await sql<
      DbUserSession[]
    >`SELECT * FROM sessions WHERE token = ${token}`;
    if (sessions.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }
    const expiredAt = new Date(sessions[0].expires_at);
    const today = new Date();
    if (expiredAt < today) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }
    return true;
  };

  return {
    login,
    validateToken,
  };
}
