import type { User } from "@/types";

export function authService() {
  const login = async (username: string, password: string): Promise<User> => {
    if (username === "admin" && password === "admin") {
      return {
        id: 1,
        username: "admin",
        email: "admin@test.com",
        token: "secret-token-123",
        refreshToken: "refresh-secret-token-123",
      };
    }
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  };

  const getUser = async (token?: string): Promise<User> => {
    if (token) {
      return {
        id: 1,
        username: "admin",
        email: "admin@test.com",
        token: "secret-token-123",
        refreshToken: "refresh-secret-token-123",
      };
    }
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  };

  return {
    login,
    getUser,
  };
}
