import sql from "@/server/utils/db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import type { User } from "@/types";
import { authRepository } from "../repositories/auth-repository";
import { RepositoryError } from "../errors/repository";

export function authService() {
  const repo = authRepository();
  const login = async (username: string, password: string): Promise<User> => {
    try {
      const user = await repo.getUserByUsername(username);
      const match = await bcrypt.compare(password, user.password);

      // Create new session
      const token = crypto.getRandomValues(new Uint8Array(32)).join("");
      const refresh_token = crypto.getRandomValues(new Uint8Array(32)).join("");
      const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
      await repo.createSession(user.id, token, refresh_token, expires_at);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
        refreshToken: refresh_token,
        expiresAt: expires_at,
      };
    } catch (e) {
      if (e instanceof RepositoryError) {
        throw createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
        });
      }
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
    }
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      await repo.getUser(token);
      return true;
    } catch (e) {
      if (e instanceof RepositoryError) {
        throw createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
        });
      }
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
    }
  };

  return {
    login,
    validateToken,
  };
}
