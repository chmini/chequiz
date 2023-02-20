import db from "../db";

import type { User } from "../types/user.type";

const addUser = (user: User) => db.users.add(user);

const getAllUsers = () => db.users.toArray();

const getUserById = (id: string) => db.users.get(id);

const getUserByEmail = (email: string) => db.users.get({ email });

const getUserByNickname = (nickname: string) => db.users.get({ nickname });

export default {
  addUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByNickname,
};
