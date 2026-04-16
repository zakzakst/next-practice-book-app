import { NextRequest, NextResponse } from "next/server";

import { books } from "@/dummy-db/book";
import { favorites } from "@/dummy-db/favorite";
import { users } from "@/dummy-db/user";
import { apiDelay } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import {
  DeleteFavoriteResponse,
  PostFavoriteResponse,
} from "@/types/api/favorites";
import { Favorite } from "@/types/domain/favorite";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

// お気に入り登録
export const POST = async (
  _request: NextRequest,
  context: RouteContext<"/api/books/[id]">,
): Promise<NextResponse<PostFavoriteResponse | Error>> => {
  await apiDelay();

  try {
    // ログインユーザーか確認
    const jwtPayload = await getJwtPayload();
    const user = users.find((u) => u.id === jwtPayload?.id);
    if (!user) {
      return NextResponse.json(
        { error: "処理の実行権限がありません" },
        { status: 403 },
      );
    }

    // 書籍が存在するか確認
    const { id } = await context.params;
    const book = books.find((b) => b.id === Number(id));
    if (!book) {
      return NextResponse.json(
        { error: "指定された書籍が見つかりません" },
        { status: 404 },
      );
    }

    // お気に入り登録済か確認
    const targetFavoriteIndex = favorites.findIndex(
      (f) => f.bookId === book.id && f.userId === user.id,
    );

    if (targetFavoriteIndex !== -1) {
      return NextResponse.json(
        { error: "すでにお気に入り登録済です" },
        { status: 404 },
      );
    }

    const newFavorite: Favorite = {
      id: favorites.length + 1,
      bookId: book.id,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    favorites.push(newFavorite);

    const bookFavorites = favorites.filter((f) => f.bookId === book.id);

    return NextResponse.json({ count: bookFavorites.length });
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};

// お気に入り解除
export const DELETE = async (
  _request: NextRequest,
  context: RouteContext<"/api/books/[id]">,
): Promise<NextResponse<DeleteFavoriteResponse | Error>> => {
  await apiDelay();

  try {
    // ログインユーザーか確認
    const jwtPayload = await getJwtPayload();
    const user = users.find((u) => u.id === jwtPayload?.id);
    if (!user) {
      return NextResponse.json(
        { error: "処理の実行権限がありません" },
        { status: 403 },
      );
    }

    // 書籍が存在するか確認
    const { id } = await context.params;
    const book = books.find((b) => b.id === Number(id));
    if (!book) {
      return NextResponse.json(
        { error: "指定された書籍が見つかりません" },
        { status: 404 },
      );
    }

    // お気に入りが存在するか確認
    const targetFavoriteIndex = favorites.findIndex(
      (f) => f.bookId === book.id && f.userId === user.id,
    );

    if (targetFavoriteIndex === -1) {
      return NextResponse.json(
        { error: "指定されたお気に入りが見つかりません" },
        { status: 404 },
      );
    }

    favorites.splice(targetFavoriteIndex, 1);

    const bookFavorites = favorites.filter((f) => f.bookId === book.id);

    return NextResponse.json({ count: bookFavorites.length });
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};
