import { NextRequest, NextResponse } from "next/server";

import { books } from "@/dummy-db/book";
import { favorites } from "@/dummy-db/favorite";
import { reviews } from "@/dummy-db/review";
import { users } from "@/dummy-db/user";
import { apiDelay } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import {
  FindOneBookResponse,
  UpdateBookRequest,
  UpdateBookResponse,
} from "@/types/api/books";
import { Book } from "@/types/domain/book";
import { ApiError, withErrorHandler } from "@/lib/api-error";

export const GET = withErrorHandler(async (
  _request: NextRequest,
  context: RouteContext<"/api/books/[id]">,
) => {
  await apiDelay();

  const { id } = await context.params;
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    throw new ApiError(404, "指定された書籍が見つかりません", "NOT_FOUND");
  }

  // 書籍情報をフロントエンド用に加工
  const jwtPayload = await getJwtPayload();
  const user = users.find((u) => u.id === jwtPayload?.id);
  const bookFavorites = favorites.filter((f) => f.bookId === book.id);
  const userBookFavorite = favorites.find(
    (f) => f.bookId === book.id && f.userId === user?.id,
  );
  const bookReviews = reviews.filter((r) => r.bookId === book.id);
  const userBookReview = reviews.find(
    (r) => r.bookId === book.id && r.userId === user?.id,
  );

  return NextResponse.json({
    ...book,
    favorite: {
      count: bookFavorites.length,
      state: userBookFavorite ? true : false,
    },
    reviews: {
      count: bookReviews.length,
      state: userBookReview ? true : false,
    },
  });
});

export const PUT = withErrorHandler(async (
  request: NextRequest,
  context: RouteContext<"/api/books/[id]">,
) => {
  await apiDelay();

  // ユーザー権限の確認
  const jwtPayload = await getJwtPayload();
  const user = users.find((u) => u.id === jwtPayload?.id);

  if (!user || !user.roles.includes("admin")) {
    throw new ApiError(403, "処理の実行権限がありません", "FORBIDDEN");
  }

  const { id } = await context.params;
  const params: UpdateBookRequest = await request.json();
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    throw new ApiError(404, "指定された書籍が見つかりません", "NOT_FOUND");
  }

  const updatedBook: Book = {
    ...book,
    ...params,
    updatedAt: new Date().toISOString(),
  };
  const index = books.findIndex((b) => b === book);
  books[index] = updatedBook;

  // 書籍情報をフロントエンド用に加工
  const bookFavorites = favorites.filter((f) => f.bookId === book.id);
  const userBookFavorite = favorites.find(
    (f) => f.bookId === book.id && f.userId === user?.id,
  );
  const bookReviews = reviews.filter((r) => r.bookId === book.id);
  const userBookReview = reviews.find(
    (r) => r.bookId === book.id && r.userId === user?.id,
  );

  return NextResponse.json({
    ...updatedBook,
    favorite: {
      count: bookFavorites.length,
      state: userBookFavorite ? true : false,
    },
    reviews: {
      count: bookReviews.length,
      state: userBookReview ? true : false,
    },
  });
});
