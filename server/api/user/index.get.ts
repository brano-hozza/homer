import { authService } from "~/server/services/auth-service";

export default defineEventHandler(async (event) => {
  const service = authService();
  return await service.getUser(event.context.token);
});
