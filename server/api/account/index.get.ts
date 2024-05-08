import { accountService } from "~/server/services/account-service";

export default defineEventHandler(async (event) => {
  const service = accountService(event.context.token);
  return await service.getAccountStatus();
});
