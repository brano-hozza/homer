import { accountService } from "~/server/services/account-service";

export default defineEventHandler(async (event) => {
  const service = accountService(event.context.user);
  return await service.getAccountStatus();
});
