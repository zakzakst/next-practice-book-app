import { NextRequest, NextResponse } from "next/server";

import { books } from "@/dummy-db/book";
import { users } from "@/dummy-db/user";
import { apiDelay } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import {
  FindOneBookResponse,
  UpdateBookRequest,
  UpdateBookResponse,
} from "@/types/api/books";
import { Book } from "@/types/domain/book";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

export const GET = async (
  _request: NextRequest,
  context: RouteContext<"/api/books/[id]">,
): Promise<NextResponse<FindOneBookResponse | Error>> => {
  await apiDelay();

  try {
    const { id } = await context.params;
    const book = books.find((b) => b.id === Number(id));

    if (!book) {
      return NextResponse.json(
        { error: "指定された書籍が見つかりません" },
        { status: 404 },
      );
    }

    return NextResponse.json(book);
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};

export const PUT = async (
  request: NextRequest,
  context: RouteContext<"/api/books/[id]">,
): Promise<NextResponse<UpdateBookResponse | Error>> => {
  await apiDelay();

  try {
    // ユーザー権限の確認
    const jwtPayload = await getJwtPayload();
    const user = users.find((u) => u.id === jwtPayload?.id);

    if (!user || !user.roles.includes("admin")) {
      return NextResponse.json(
        { error: "処理の実行権限がありません" },
        { status: 403 },
      );
    }

    const { id } = await context.params;
    const params: UpdateBookRequest = await request.json();
    const book = books.find((b) => b.id === Number(id));

    if (!book) {
      return NextResponse.json(
        { error: "指定された書籍が見つかりません" },
        { status: 404 },
      );
    }

    const updatedBook: Book = {
      ...book,
      ...params,
      updatedAt: new Date().toISOString(),
    };
    const index = books.findIndex((b) => b === book);
    books[index] = updatedBook;

    return NextResponse.json(updatedBook);
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};
