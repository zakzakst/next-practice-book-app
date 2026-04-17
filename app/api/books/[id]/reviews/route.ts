import { NextRequest, NextResponse } from "next/server";

import { books } from "@/dummy-db/book";
import { reviews } from "@/dummy-db/review";
import { users } from "@/dummy-db/user";
import { apiDelay } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import {
  FindAllReviewsResponse,
  FrontReview,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from "@/types/api/reviews";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

export const GET = async (
  _request: NextRequest,
  context: RouteContext<"/api/books/[id]/reviews">,
): Promise<NextResponse<FindAllReviewsResponse | Error>> => {
  await apiDelay();

  try {
    // 書籍が存在するか確認
    const { id } = await context.params;
    const book = books.find((b) => b.id === Number(id));
    if (!book) {
      return NextResponse.json(
        { error: "指定された書籍が見つかりません" },
        { status: 404 },
      );
    }

    const bookReviews = reviews.filter((r) => r.bookId === book.id);

    // レビュー情報をフロントエンド用に加工
    const frontReviews: FrontReview[] = bookReviews.map((r) => {
      const user = users.find((u) => u.id === r.userId)!;
      return {
        ...r,
        user: {
          ...user,
          // TODO: 調べる。ユーザーが出る度にpassword消す処理するの不便（rolesとかも含めないほうがいい？ ※あとで考える）
          password: undefined,
        },
      };
    });

    return NextResponse.json({
      total: frontReviews.length,
      items: frontReviews,
    });
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};

export const POST = async (
  request: NextRequest,
  context: RouteContext<"/api/books/[id]/reviews">,
): Promise<NextResponse<UpdateReviewResponse | Error>> => {
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

    // レビュー登録済か確認
    const targetReviewIndex = reviews.findIndex(
      (r) => r.bookId === book.id && r.userId === user.id,
    );
    if (targetReviewIndex !== -1) {
      return NextResponse.json(
        { error: "すでにレビュー登録済です" },
        { status: 404 },
      );
    }

    const params: UpdateReviewRequest = await request.json();
    const newReview = {
      id: reviews.length + 1,
      bookId: book.id,
      userId: user.id,
      ...params,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      ...newReview,
      user: {
        ...user,
        // TODO: 調べる。ユーザーが出る度にpassword消す処理するの不便
        password: undefined,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};
