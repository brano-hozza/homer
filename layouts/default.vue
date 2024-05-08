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
onMounted(async () => {
  if (authStore.user === null) {
    const user = await $fetch("/api/user");
    authStore.setUser(user);
  }
});
</script>
