import { authService } from "../services/auth-service";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/api/auth")) {
    return;
  }
  const token = getCookie(event, "token");
  event.context.token = token;
});
