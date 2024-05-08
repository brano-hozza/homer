<template>
  <Card class="max-h-60">
    <CardHeader>
      <CardTitle> Fridge status </CardTitle>
      <CardDescription> Inventory of our fridge </CardDescription>
    </CardHeader>
    <CardContent>
      <ul>
        <li>Milk: 1L</li>
        <li>Eggs: 6</li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button variant="outline" class="w-full" @click="$router.push('/fridge')">
        Into the fridge
      </Button>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup></script>

<style></style>
