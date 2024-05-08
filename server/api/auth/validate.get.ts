import { authService } from "~/server/services/auth-service";
export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const service = authService();
  return service.validateToken(token);
});
