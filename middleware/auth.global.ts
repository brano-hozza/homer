const isTokenValid = async (token: string) => {
  try {
    const resp = await $fetch("/api/auth/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    return resp;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  if (!token.value) {
    if (to.path === "/") {
      return;
    }
    return navigateTo("/");
  }
  const authenticated = await isTokenValid(token.value);
  if (!authenticated) {
    token.value = null;
    return navigateTo("/");
  }

  if (to.path === "/") {
    return navigateTo("/home");
  }

  return;
});
