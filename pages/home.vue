<template>
  <div class="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    <AccountStatus />
    <FridgeStatus />
    <UserCard />
  </div>
</template>

<script lang="ts" setup>
import AccountStatus from "@/components/dashboard/AccountStatus.vue";
import FridgeStatus from "@/components/dashboard/FridgeStatus.vue";
import UserCard from "@/components/dashboard/UserCard.vue";
</script>

<style></style>
