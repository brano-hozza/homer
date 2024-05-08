<template>
  <Card class="md:max-h-60 flex flex-col justify-between">
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
      <Button
        variant="outline"
        class="w-full"
        @click="$router.push('/home/fridge')"
      >
        Into the fridge
      </Button>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup></script>

<style></style>
