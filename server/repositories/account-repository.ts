import type { SingleAccount, User } from "~/types";
import sql from "../utils/db";

export function accountRepository() {
  const getUsersAccounts = async (
    user_id: string
  ): Promise<SingleAccount[]> => {
    type Entity = {
      id: string;
      user_id: string;
      amount: number;
      name: string;
    };
    const accounts = await sql<
      Entity[]
    >`SELECT * FROM accounts WHERE user_id = ${1}`;
    return accounts.map<SingleAccount>((account) => ({
      id: account.id,
      user_id: account.user_id,
      amount: account.amount,
      name: account.name,
    }));
  };

  const getTotalAmount = async (user_id: string): Promise<number> => {
    type Entity = {
      sum: number;
    };
    const amount = await sql<
      Entity[]
    >`SELECT SUM(amount) FROM accounts WHERE user_id = ${1}`;
    return amount[0].sum;
  };

  return {
    getUsersAccounts,
    getTotalAmount,
  };
}
