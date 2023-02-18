import localforage from "localforage";

import type { User } from "../types/user.type";

const createUserService = () => {
  const _userStore = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: "users",
  });

  return {
    async createUser(user: User) {
      await _userStore.setItem(user.email, user);
    },
    async readUser(email: string) {
      const user = await _userStore.getItem<User>(email);

      return user;
    },
    async readAllUsers() {
      const users: User[] = [];
      await _userStore.iterate<User, void>((user) => {
        users.push(user);
      });

      return users;
    },
  };
};

export const userService = createUserService();
