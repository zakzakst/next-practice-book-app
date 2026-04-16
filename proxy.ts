import { NextRequest, NextResponse } from "next/server";

import { users } from "@/dummy-db/user";
import { getJwtPayload } from "@/lib/jwt";

export const proxy = async (request: NextRequest) => {
  // NOTE: configで分岐処理したので必要なかったが、知識としてURLパスの取得方法をコメントで残しておく
  // const pathname = request.nextUrl.pathname;
  // console.log(pathname);

  try {
    const jwtPayload = await getJwtPayload();
    const user = users.find((u) => u.id === jwtPayload?.id);
    if (!user?.roles.includes("admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: ["/books/:id*/edit"],
};
