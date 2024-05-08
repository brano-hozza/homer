import type { User } from "~/types";

export function fridgeService(user: User) {
  const getLatestItems = async () => {
    return [];
  };

  return {
    getLatestItems,
  };
}
