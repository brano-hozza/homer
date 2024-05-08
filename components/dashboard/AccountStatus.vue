<template>
  <Card class="max-h-60">
    <CardHeader>
      <CardTitle> Account status </CardTitle>
      <CardDescription> State of money on joint account</CardDescription>
    </CardHeader>
    <CardContent v-if="status === 'pending'">
      <Skeleton class="w-full h-5 mb-2" />
      <Skeleton class="w-full h-5" />
    </CardContent>
    <CardContent v-else-if="data">
      <div class="flex justify-between">
        <span> Current balance: </span>
        <span> {{ data.amount.toFixed(2) }} €</span>
      </div>
    </CardContent>
    <CardContent v-else>
      <span class="text-red-500">{{ error }}</span>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
const { data, status, error } = useFetch("/api/account");
</script>

<style></style>
