import { NextRequest, NextResponse } from "next/server";

import { books } from "@/dummy-db/book";
import { FindOneBookResponse } from "@/types/api/books";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

export const GET = async (
  _request: NextRequest,
  context: RouteContext<"/api/books/[id]">,
): Promise<NextResponse<FindOneBookResponse | Error>> => {
  const { id } = await context.params;
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return NextResponse.json(
      { error: "指定された書籍が見つかりません" },
      { status: 404 },
    );
  }

  return NextResponse.json(book);
};
