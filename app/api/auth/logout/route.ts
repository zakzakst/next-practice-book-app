import { NextResponse } from "next/server";

import { apiDelay } from "@/lib/api";
import { AuthLogoutResponse } from "@/types/api/auth";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

export const POST = async (): Promise<
  NextResponse<AuthLogoutResponse | Error>
> => {
  await apiDelay();

  const response = NextResponse.json({
    message: "ログアウト成功",
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
};
