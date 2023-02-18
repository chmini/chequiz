import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

import { userService } from "../services";
import { issueToken } from "../utils/jwt";

import type { RegisterPayload, SigninPayload } from "../types/user.type";

export const userHandler = [
  rest.post<RegisterPayload>("/api/register", async (req, res, ctx) => {
    const body: RegisterPayload = await req.json();

    const user = await userService.readUser(body.email);
    if (user) {
      return res(ctx.status(400), ctx.json({ message: "이미 계정이 존재합니다." }));
    }

    const newUser = Object.assign(body, { id: uuidv4() });
    await userService.createUser(newUser);

    return res(ctx.status(201));
  }),
  rest.post<Pick<RegisterPayload, "nickname">>("/api/check-nickname", async (req, res, ctx) => {
    const body: Pick<RegisterPayload, "nickname"> = await req.json();

    const users = await userService.readAllUsers();
    for (const user of users) {
      if (user.nickname === body.nickname) {
        return res(ctx.status(400), ctx.json({ message: "" }));
      }
    }

    return res(ctx.status(204));
  }),
  rest.post<SigninPayload>("/api/signin", async (req, res, ctx) => {
    const body: SigninPayload = await req.json();

    const user = await userService.readUser(body.email);
    if (!user) {
      return res(ctx.status(400), ctx.json({ message: "등록된 계정이 없습니다." }));
    }
    if (user.password !== body.password) {
      return res(ctx.status(400), ctx.json({ message: "비밀번호가 일치하지 않습니다." }));
    }

    const token = await issueToken({ email: user.email });
    return res(ctx.status(200), ctx.json({ token }));
  }),
];
