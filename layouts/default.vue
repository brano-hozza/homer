<template>
  <div class="h-screen">
    <PageHeader />
    <main class="p-2 w-full h-full">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const route = useRoute();
onMounted(async () => {
  if (authStore.user === null && route.path !== "/") {
    const user = await $fetch("/api/user");
    authStore.setUser(user);
  }
});
</script>
