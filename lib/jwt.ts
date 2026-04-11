import { cookies } from "next/headers";

import { User } from "@/types/domain/user";
import jwt from "jsonwebtoken";

const SECRET = "my-secret";

export type JwtPayload = {
  id: User["id"];
  roles: User["roles"];
};

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET) as JwtPayload;
};

export const getJwtPayload = async (): Promise<JwtPayload | null> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const jwtPayload = verifyToken(token);
    return jwtPayload;
  } catch {
    return null;
  }
};
