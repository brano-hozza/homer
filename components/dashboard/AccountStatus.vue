<template>
  <Card class="md:max-h-60 flex flex-col justify-between">
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
      <div v-if="data.accounts.length > 0" class="flex justify-between">
        <span> Accounts: </span>
        <ul>
          <li v-for="account in data.accounts" :key="account.id">
            {{ account.name }}: {{ account.amount }} €
          </li>
        </ul>
      </div>
      <span v-else> No accounts found </span>
    </CardContent>
    <CardContent v-else>
      <span class="text-red-500">{{ error }}</span>
    </CardContent>
    <CardFooter>
      <Button
        variant="outline"
        class="w-full"
        @click="$router.push('/home/account')"
      >
        Account details
      </Button>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import { RefreshCcw } from "lucide-vue-next";
const { data, status, error, refresh } = useFetch("/api/account");
</script>

<style></style>
