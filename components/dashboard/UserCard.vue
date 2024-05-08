<template>
  <Card class="md:max-h-60 flex flex-col justify-between">
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
    <CardContent v-else>
      <Skeleton class="w-full h-5 mb-2" />
      <Skeleton class="w-full h-5" />
    </CardContent>
    <CardFooter>
      <Button
        variant="outline"
        class="w-full"
        @click="$router.push('/home/user')"
      >
        More info
      </Button>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
