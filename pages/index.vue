<template>
  <div class="w-full h-full flex justify-center items-center">
    <Card class="w-full md:w-1/3">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="johnD"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button class="w-full my-2" type="submit"> Submit </Button>
          <span v-if="error" class="text-red-500">{{ error }}</span>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { FetchError } from "ofetch";
import type { User } from "@/types";
import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: "",
    password: "",
  },
});
const error = ref<string>("");

const router = useRouter();
const authStore = useAuthStore();
const token = useCookie("token");
const refreshToken = useCookie("refresh_token");

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const user = await $fetch<User>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (user) {
      authStore.setUser(user);
      token.value = user.token;
      refreshToken.value = user.refreshToken;
      router.push("/home");
    }
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.statusCode === 401) {
        error.value = "Invalid credentials";
      } else {
        error.value = e.message;
      }
    }
  }
});
</script>

<style></style>
