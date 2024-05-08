<template>
  <div class="w-full bg-secondary p-2 flex justify-between">
    <h1 class="text-xl text-primary">Homer</h1>
    <span v-if="username">Welcome, {{ username }}!</span>
  </div>
  <Breadcrumb v-if="firstItem" class="p-2 border-b">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">App</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <template v-if="items.length > itemsToDisplay">
        <BreadcrumbItem>
          <DropdownMenu v-if="isDesktop" v-model:open="isOpen">
            <DropdownMenuTrigger
              class="flex items-center gap-1"
              aria-label="Toggle menu"
            >
              <BreadcrumbEllipsis class="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                v-for="item of allButLastTwoItems"
                :key="item.label"
              >
                <a :href="item.href || '#'">
                  {{ item.label }}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Drawer v-else v-model:open="isOpen">
            <DrawerTrigger aria-label="Toggle Menu">
              <BreadcrumbEllipsis class="h-4 w-4" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader class="text-left">
                <DrawerTitle>Navigate to</DrawerTitle>
                <DrawerDescription>
                  Select a page to navigate to.
                </DrawerDescription>
              </DrawerHeader>
              <div class="grid gap-1 px-4">
                <a
                  v-for="item of allButLastTwoItems"
                  :key="item.label"
                  :href="item.href"
                  class="py-1 text-sm"
                >
                  {{ item.label }}
                </a>
              </div>
              <DrawerFooter class="pt-4">
                <DrawerClose as-child>
                  <Button variant="outline"> Close </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </template>
      <BreadcrumbItem v-for="item of remainingItems" :key="item.label">
        <template v-if="item.href">
          <BreadcrumbLink as-child class="max-w-20 truncate md:max-w-none">
            <a :href="item.href">
              {{ PAGE_NAMES[item.label] }}
            </a>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </template>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink :href="lastItem.href">
          {{ PAGE_NAMES[lastItem.label] }}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";

const route = useRoute();

const isDesktop = useMediaQuery("(min-width: 768px)");
const isOpen = ref(false);

const PAGE_NAMES: Record<string, string> = {
  "": "App",
  home: "Home",
};

const items = computed(() => {
  const paths = route.path.split("/").filter(Boolean);
  return paths.map((path, index) => ({
    label: path,
    href: "/" + paths.slice(0, index + 1).join("/"),
  }));
});
const itemsToDisplay = 5;
const firstItem = computed(() => items.value[0]);
const allButLastTwoItems = computed(() => items.value.slice(-2));
const remainingItems = computed(() =>
  items.value.slice(-itemsToDisplay + 1, -1)
);
const lastItem = computed(() => items.value[items.value.length - 1]);

// User
const authStore = useAuthStore();

const username = computed(() => authStore.user?.username);
</script>

<style></style>
