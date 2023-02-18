import * as jose from "jose";

export const issueToken = async (payload: jose.JWTPayload) => {
  const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("14d")
    .sign(SECRET_KEY);

  return token;
};
