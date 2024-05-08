import type { User } from "~/types";

export function userService(user: User) {
  const getUser = async (): Promise<User> => {
    return user;
  };

  return {
    getUser,
  };
}
