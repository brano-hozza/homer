<template>
  <div class="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    <Card>
      <CardHeader>
        <CardTitle> Account status </CardTitle>
        <CardDescription> State of money on joint account</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex justify-between">
          <span> Current balance: </span>
          <span> 1000$ </span>
        </div>
        <div class="flex justify-between">
          <span> Last transaction: </span>
          <span> 100$ </span>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader> Home status </CardHeader>
    </Card>
    <Card>
      <CardHeader> Car status </CardHeader>
    </Card>
    <Card>
      <CardHeader> Server status </CardHeader>
    </Card>
    <Card>
      <CardHeader> Home status </CardHeader>
    </Card>
    <Card>
      <CardHeader> Car status </CardHeader>
    </Card>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
