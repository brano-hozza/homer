import { authRepository } from "../repositories/auth-repository";
import { RepositoryError } from "../errors/repository";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/api")) {
    if (event.path.startsWith("/api/auth")) {
      return;
    }
    const token = getCookie(event, "token");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const repo = authRepository();
    try {
      const user = await repo.getUser(token);
      event.context.user = user;
    } catch (e) {
      if (e instanceof RepositoryError) {
        throw createError({
          statusCode: 401,
          message: "Unauthorized",
        });
      }
      throw createError({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }
});
