"use client";

import { useCallback } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  ReviewCreateForm,
  ReviewCreateFormValues,
} from "@/components/features/reviews/ReviewCreateForm";
import { useUpdateReview } from "@/hooks/useReviews";
import { toast } from "sonner";

export const PageContent = () => {
  // TODO: フォーム初期値に既存のレビューの値を反映するのごちゃつきそうなので、一旦作業保留。空の状態から入力してもらう。（こういう場合のAPI設計やページ遷移について考える）
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const { trigger, isMutating, error } = useUpdateReview(Number(bookId));

  const handleSubmit = useCallback(
    async (values: ReviewCreateFormValues) => {
      if (isMutating) return;
      // TODO: エラーハンドリング後回し
      await trigger({
        comment: values.comment,
        rating: Number(values.rating),
      });
      toast("レビュー編集しました");
      router.push(`/books/${bookId}`);
    },
    [isMutating, trigger, router, bookId],
  );

  if (!bookId) return <div>URLが正しくありません</div>;
  if (error) return <div>エラーが発生しました</div>;
  if (isMutating) return <div>レビュー編集中...</div>;

  return <ReviewCreateForm onSubmit={handleSubmit} isLoading={isMutating} />;
};
