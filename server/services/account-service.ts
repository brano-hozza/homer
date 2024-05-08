import sql from "@/server/utils/db";
import type { User } from "~/types";
import { accountRepository } from "../repositories/account-repository";

export function accountService(user: User) {
  const repo = accountRepository();
  const getAccountStatus = async () => {
    const amount = (await repo.getTotalAmount(user.id)) ?? 0;
    const accounts = await repo.getUsersAccounts(user.id);

    return {
      amount,
      accounts,
    };
  };

  return {
    getAccountStatus,
  };
}
