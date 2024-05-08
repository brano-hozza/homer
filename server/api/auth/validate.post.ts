import { authService } from "~/server/services/auth-service";
export default defineEventHandler(async (event) => {
  const { token } = await readBody<{ token: string }>(event);
  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const service = authService();
  return service.validateToken(token);
});
