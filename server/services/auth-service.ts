export function authService() {
  const login = async (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      return { username, password };
    }
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  };

  return {
    login,
  };
}
