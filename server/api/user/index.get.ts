import { userService } from "~/server/services/user-service";

export default defineEventHandler(async (event) => {
  const service = userService(event.context.user);
  return await service.getUser();
});
