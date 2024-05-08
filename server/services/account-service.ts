import sql from "@/server/utils/db";
import type { User } from "~/types";

export function accountService(token: string) {
  const getAccountStatus = async () => {
    const users = await sql<
      User[]
    >`SELECT * FROM users JOIN sessions ON users.id = sessions.user_id WHERE sessions.token = ${token}`;
    if (users.length > 1 || users.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const user = users[0];
    const amount = await sql<
      [{ sum: number | null }]
    >`SELECT SUM(amount) FROM accounts WHERE user_id = ${user.id}`;

    return {
      amount: amount[0].sum ?? 0,
    };
  };

  return {
    getAccountStatus,
  };
}
