const isAuthenticated = () => {
  const token = useCookie("token");
  return !!token.value;
};

export default defineNuxtRouteMiddleware((to, from) => {
  if (!isAuthenticated()) {
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
