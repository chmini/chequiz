import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

import { userService } from "../services";
import { issueToken } from "../utils/jwt";

import type { RegisterPayload, SigninPayload } from "../types/user.type";

export const userHandler = [
  rest.post<RegisterPayload>("/api/register", async (req, res, ctx) => {
    const body: RegisterPayload = await req.json();

    const user = await userService.getUserByEmail(body.email);
    if (user) {
      return res(ctx.status(400), ctx.json({ message: "이미 계정이 존재합니다." }));
    }

    const newUser = Object.assign(body, { id: uuidv4() });
    await userService.addUser(newUser);

    return res(ctx.status(201));
  }),
  rest.post<Pick<RegisterPayload, "nickname">>("/api/check-nickname", async (req, res, ctx) => {
    const body: Pick<RegisterPayload, "nickname"> = await req.json();

    const user = await userService.getUserByNickname(body.nickname);
    if (user) {
      return res(
        ctx.status(400),
        ctx.json({ message: `이미 존재하는 닉네임 "${user.nickname}" 입니다.` })
      );
    }

    return res(ctx.status(204));
  }),
  rest.post<SigninPayload>("/api/signin", async (req, res, ctx) => {
    const body: SigninPayload = await req.json();

    const user = await userService.getUserByEmail(body.email);
    if (!user) {
      return res(ctx.status(400), ctx.json({ message: "등록된 계정이 없습니다." }));
    }
    if (user.password !== body.password) {
      return res(ctx.status(400), ctx.json({ message: "비밀번호가 일치하지 않습니다." }));
    }

    const token = await issueToken({ email: user.email });
    return res(ctx.status(200), ctx.json({ token }));
  }),
  rest.get("/api/users", async (req, res, ctx) => {
    const users = await userService.getAllUsers();
    if (users.length === 0) {
      return res(ctx.status(404), ctx.json({ message: "유저정보가 존재하지 않습니다." }));
    }

    const userProfiles = users.map(({ id, nickname }) => ({ id, nickname }));
    return res(ctx.status(200), ctx.json(userProfiles));
  }),
  rest.get("/api/users/:id", async (req, res, ctx) => {
    const { id } = req.params;

    const user = await userService.getUserById(id as string);
    if (!user) {
      return res(ctx.status(404), ctx.json({ message: "존재하지 않는 유저입니다." }));
    }

    const userProfile = { id: user.id, nickname: user.nickname };
    return res(ctx.status(200), ctx.json(userProfile));
  }),
];
