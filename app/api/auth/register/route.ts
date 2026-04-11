import { NextRequest, NextResponse } from "next/server";

import { users } from "@/dummy-db/user";
import { apiDelay } from "@/lib/api";
import { signToken } from "@/lib/jwt";
import { AuthRegisterRequest, AuthRegisterResponse } from "@/types/api/auth";
import { UserRole } from "@/types/domain/user";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<AuthRegisterResponse | Error>> => {
  await apiDelay();

  try {
    const { email, password }: AuthRegisterRequest = await request.json();

    if (users.find((u) => u.email === email)) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 400 },
      );
    }

    const newUser = {
      id: users.length + 1,
      name: "",
      email,
      password,
      roles: ["user"] as UserRole[],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);

    const token = signToken({
      id: newUser.id,
      roles: newUser.roles,
    });

    const response = NextResponse.json({
      message: "ユーザー登録成功",
      ok: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "ユーザー登録に失敗しました" });
  }
};
