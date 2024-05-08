<template>
  <Card class="max-h-60">
    <CardHeader>
      <CardTitle class="flex justify-between">
        Account status
        <Button variant="outline" size="xs" @click="refresh">
          <RefreshCcw :size="12" />
        </Button>
      </CardTitle>
      <CardDescription> State of money on joint account</CardDescription>
    </CardHeader>
    <CardContent v-if="status === 'pending'">
      <Skeleton class="w-full h-5 mb-2" />
      <Skeleton class="w-full h-5" />
    </CardContent>
    <CardContent v-else-if="data">
      <div class="flex justify-between">
        <span> Current balance: </span>
        <span> {{ data.amount }} €</span>
      </div>
    </CardContent>
    <CardContent v-else>
      <span class="text-red-500">{{ error }}</span>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { RefreshCcw } from "lucide-vue-next";
const { data, status, error, refresh } = useFetch("/api/account");
</script>

<style></style>
