import { NextResponse } from "next/server";

import { users } from "@/dummy-db/user";
import { apiDelay } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { AuthMeResponse } from "@/types/api/auth";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

export const GET = async (): Promise<NextResponse<AuthMeResponse | Error>> => {
  await apiDelay();
  const jwtPayload = await getJwtPayload();
  const user = users.find((u) => u.id === jwtPayload?.id);

  if (!user) {
    return NextResponse.json(null);
  }

  return NextResponse.json({
    ...user,
    password: undefined,
  });
};
