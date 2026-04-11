import { NextRequest, NextResponse } from "next/server";

import { users } from "@/dummy-db/user";
import { apiDelay } from "@/lib/api";
import { signToken } from "@/lib/jwt";
import { AuthLoginRequest, AuthLoginResponse } from "@/types/api/auth";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<AuthLoginResponse | Error>> => {
  await apiDelay();

  try {
    const { email, password }: AuthLoginRequest = await request.json();
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return NextResponse.json(
        { error: "メールアドレスまたはパスワードが違います" },
        { status: 401 },
      );
    }

    const token = signToken({
      id: user.id,
      roles: user.roles,
    });

    const response = NextResponse.json({
      message: "ログイン成功",
      ok: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};
