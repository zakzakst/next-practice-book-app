import { NextRequest, NextResponse } from "next/server";

import { reviews } from "@/dummy-db/review";
import { users } from "@/dummy-db/user";
import { apiDelay } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { UpdateReviewRequest, UpdateReviewResponse } from "@/types/api/reviews";

// TODO: エラーレスポンスのルール考える
type Error = {
  error: string;
};

// NOTE: 編集ページへの遷移の関係で一旦使わない（API設計が適切かは考える必要がある）
export const PUT = async (
  request: NextRequest,
  context: RouteContext<"/api/reviews/[id]">,
): Promise<NextResponse<UpdateReviewResponse | Error>> => {
  await apiDelay();

  try {
    // レビューが存在するか確認
    const { id } = await context.params;
    const review = reviews.find((r) => r.id === Number(id));
    if (!review) {
      return NextResponse.json(
        { error: "指定されたレビューが見つかりません" },
        { status: 404 },
      );
    }

    // 自身が投稿したレビューか確認
    const jwtPayload = await getJwtPayload();
    const user = users.find((u) => u.id === jwtPayload?.id);
    if (!user || review.userId !== user.id) {
      return NextResponse.json(
        { error: "処理の実行権限がありません" },
        { status: 403 },
      );
    }

    const params: UpdateReviewRequest = await request.json();
    const updatedReview = {
      ...review,
      ...params,
      updatedAt: new Date().toISOString(),
    };
    const index = reviews.findIndex((r) => r === review);
    reviews[index] = updatedReview;

    return NextResponse.json({
      ...updatedReview,
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

export const DELETE = async (
  _request: NextRequest,
  context: RouteContext<"/api/reviews/[id]">,
): Promise<NextResponse<null | Error>> => {
  await apiDelay();

  try {
    // レビューが存在するか確認
    const { id } = await context.params;
    const review = reviews.find((r) => r.id === Number(id));
    if (!review) {
      return NextResponse.json(
        { error: "指定されたレビューが見つかりません" },
        { status: 404 },
      );
    }

    // 自身が投稿したレビューか確認
    const jwtPayload = await getJwtPayload();
    const user = users.find((u) => u.id === jwtPayload?.id);
    if (!user || review.userId !== user.id) {
      return NextResponse.json(
        { error: "処理の実行権限がありません" },
        { status: 403 },
      );
    }

    const index = reviews.findIndex((r) => r === review);
    reviews.splice(index, 1);

    // TODO: 調べる。DELETEで何も返さない時の書き方忘れた
    return NextResponse.json(null);
  } catch {
    return NextResponse.json(
      { error: "サーバーのエラーが発生しました" },
      { status: 500 },
    );
  }
};
