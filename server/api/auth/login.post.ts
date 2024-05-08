import * as z from "zod";
import { authService } from "~/server/services/auth-service";
const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

export default defineEventHandler(async (event) => {
  const body = await readBody<Schema>(event);
  try {
    schema.parse(body);
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }
  const service = authService();
  return await service.login(body.username, body.password);
});
