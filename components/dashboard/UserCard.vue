<template>
  <Card class="max-h-60">
    <CardHeader>
      <CardTitle> User info </CardTitle>
      <CardDescription> Info about currently signed in user </CardDescription>
    </CardHeader>
    <CardContent v-if="user">
      <div class="flex justify-between">
        <span> Username: </span>
        <span> {{ user.username }} </span>
      </div>
      <div class="flex justify-between">
        <span> Email: </span>
        <span> {{ user.email }} </span>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
