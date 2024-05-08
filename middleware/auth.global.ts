const isAuthenticated = async () => {
  const token = useCookie("token");
  if (!token) {
    return false;
  }
  try {
    const resp = await $fetch("/api/auth/validate");
    return resp;
  } catch (e) {
    token.value = null;
    console.error(e);
    return false;
  }
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    if (to.path === "/") {
      return;
    }
    return navigateTo("/");
  }

  if (to.path === "/") {
    return navigateTo("/home");
  }

  return;
});
