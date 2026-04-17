import { NextRequest, NextResponse } from "next/server";

import { books } from "@/dummy-db/book";
import { favorites } from "@/dummy-db/favorite";
import { reviews } from "@/dummy-db/review";
import { users } from "@/dummy-db/user";
import { apiDelay } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { FrontBook } from "@/types/api/books";
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
    // 書籍情報をフロントエンド用に加工
    const jwtPayload = await getJwtPayload();
    const user = users.find((u) => u.id === jwtPayload?.id);
    const items: FrontBook[] = limitedBooks.map((b) => {
      const bookFavorites = favorites.filter((f) => f.bookId === b.id);
      const userBookFavorite = favorites.find(
        (f) => f.bookId === b.id && f.userId === user?.id,
      );
      const bookReviews = reviews.filter((r) => r.bookId === b.id);
      return {
        ...b,
        favorite: {
          count: bookFavorites.length,
          state: userBookFavorite ? true : false,
        },
        reviews: {
          count: bookReviews.length,
        },
      };
    });

    return NextResponse.json({
      total: filteredBooks.length,
      page: formattedPage,
      limit: PAGE_LIMIT,
      items: items,
    });
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};
