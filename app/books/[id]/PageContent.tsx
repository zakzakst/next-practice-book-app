"use client";

import { useCallback } from "react";

import Link from "next/link";

import { BookDetail } from "@/components/features/books/BookDetail";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  useDeleteBookFavorite,
  usePostBookFavorite,
} from "@/hooks/useBookFavorite";
import { useFindOneBook } from "@/hooks/useBooks";
import { useFindAllReviewsByBookId, useRemoveReview } from "@/hooks/useReviews";
import { FrontBook } from "@/types/api/books";
import { FrontReview } from "@/types/api/reviews";
import { toast } from "sonner";

type Props = {
  id: number;
};

export const PageContent = ({ id }: Props) => {
  const { data, isLoading, error, mutate } = useFindOneBook(id);
  // TODO: 考える。複数APIを走らせるとエラーやロードのハンドリング複雑になる、一旦そのあたり無視して作成する
  const { data: reviewsData, mutate: reviewsMutate } =
    useFindAllReviewsByBookId(id);
  const { trigger, isMutating } = useRemoveReview();
  const {
    trigger: postTrigger,
    isMutating: isMutatingPost,
    error: errorPost,
  } = usePostBookFavorite();
  const {
    trigger: deleteTrigger,
    isMutating: isMutatingDelete,
    error: errorDelete,
  } = useDeleteBookFavorite();
  const { me } = useAuth();

  const handleUpdateFavorite = useCallback(
    async (book: FrontBook) => {
      // TODO: トースト表示とか
      if (book.favorite.state) {
        // お気に入り登録されている書籍の場合、解除する
        const res = await deleteTrigger({ id: book.id });
        if (typeof res.count === "number") {
          toast("お気に入り解除しました");
        } else {
          toast("お気に入り解除に失敗しました");
        }
      } else {
        // お気に入り登録されていない書籍の場合、登録する
        const res = await postTrigger({ id: book.id });
        if (typeof res.count === "number") {
          toast("お気に入り登録しました");
        } else {
          toast("お気に入り登録に失敗しました");
        }
      }
      mutate();
    },
    [deleteTrigger, postTrigger, mutate],
  );

  const handleDeleteReview = useCallback(
    async (review: FrontReview) => {
      await trigger({ id: review.id });
      // TODO: APIのレスポンスを見直してエラーハンドリング実装
      toast("レビュー削除しました");
      reviewsMutate();
    },
    [trigger, toast, reviewsMutate],
  );

  if (isLoading) return <div>データ取得中...</div>;
  if (isMutatingPost || isMutatingDelete) return <div>お気に入り更新中...</div>;
  if (isMutating) return <div>レビュー削除中...</div>;
  if (error || errorPost || errorDelete) return <div>エラーが発生しました</div>;
  if (!data) return <div>書籍が見つかりません</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {me?.roles.includes("admin") && (
        <div className="ml-auto">
          <Button asChild>
            <Link href={`/books/${id}/edit`}>データを更新する</Link>
          </Button>
        </div>
      )}
      <BookDetail
        book={data}
        reviews={reviewsData?.items || []}
        onUpdateFavorite={handleUpdateFavorite}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
};
