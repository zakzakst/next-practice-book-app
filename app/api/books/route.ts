import { NextRequest, NextResponse } from "next/server";

import { books } from "@/dummy-db/book";
import { apiDelay } from "@/lib/api";
import { FindAllBooksParams, FindAllBooksResponse } from "@/types/api/books";
import lodash from "lodash";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

const PAGE_LIMIT = 10;

export const GET = async (
  request: NextRequest,
): Promise<NextResponse<FindAllBooksResponse | Error>> => {
  await apiDelay();

  try {
    const searchParams = request.nextUrl.searchParams;
    // 対象ページを取得
    const page = Number(searchParams.get("page"));
    const formattedPage: FindAllBooksParams["page"] =
      lodash.isInteger(page) && page > 0 ? page : 1;
    // キーワード絞り込みしたbooksを取得
    const keyword: FindAllBooksParams["q"] = searchParams.get("q") || undefined;
    const filteredBooks = keyword
      ? books.filter(
          (b) =>
            b.title.includes(keyword || "") ||
            b.description.includes(keyword || ""),
        )
      : books;
    // 対象ページの範囲を抽出
    const startNum = (formattedPage - 1) * PAGE_LIMIT;
    const limitedBooks = filteredBooks.slice(startNum, startNum + PAGE_LIMIT);

    return NextResponse.json({
      total: filteredBooks.length,
      page: formattedPage,
      limit: PAGE_LIMIT,
      items: limitedBooks,
    });
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};
