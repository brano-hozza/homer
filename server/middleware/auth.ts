import type { DbUser, User } from "~/types";
import sql from "../utils/db";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/api")) {
    if (event.path.startsWith("/api/auth")) {
      return;
    }
    const token = getCookie(event, "token");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    type MergedUser = DbUser & {
      token: string;
      refresh_token: string;
      expires_at: string;
    };

    const users = await sql<MergedUser[]>`
    SELECT us.*, se.token, se.refresh_token, se.expires_at FROM users us JOIN sessions se ON us.id = se.user_id WHERE se.token = ${token}
  `;

    if (users.length === 0) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }
    const db_user = users[0];

    const user: User = {
      ...db_user,
      username: db_user.name,
      refreshToken: db_user.refresh_token,
      expires_at: new Date(db_user.expires_at),
    };

    event.context.user = user;
  }
});
