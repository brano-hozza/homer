import sql from "@/server/utils/db";
import type { User } from "~/types";

export function accountService(user: User) {
  const getAccountStatus = async () => {
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
