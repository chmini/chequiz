import Dexie from "dexie";

import type { User } from "./types/user.type";

class Database extends Dexie {
  users: Dexie.Table<User, string>;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      users: "id, email, nickname",
    });
    this.users = this.table("users");
  }
}

const db = new Database("database");

export default db;
