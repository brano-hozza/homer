import { defineStore } from "pinia";
import type { User } from "@/types";

type StoreState = {
  user: User | null;
};

export const useAuthStore = defineStore({
  id: "auth",
  state: (): StoreState => ({
    user: null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
  },
});
