"use client";

import { useCallback } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  ReviewCreateForm,
  ReviewCreateFormValues,
} from "@/components/features/reviews/ReviewCreateForm";
import { useCreateReview } from "@/hooks/useReviews";
import { toast } from "sonner";

export const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const { trigger, isMutating, error } = useCreateReview(Number(bookId));

  const handleSubmit = useCallback(
    async (values: ReviewCreateFormValues) => {
      if (isMutating) return;
      // TODO: エラーハンドリング後回し
      await trigger({
        comment: values.comment,
        rating: Number(values.rating),
      });
      toast("レビュー登録しました");
      router.push(`/books/${bookId}`);
    },
    [isMutating, trigger, router, bookId],
  );

  if (!bookId) return <div>URLが正しくありません</div>;
  if (error) return <div>エラーが発生しました</div>;
  if (isMutating) return <div>レビュー登録中...</div>;

  return <ReviewCreateForm onSubmit={handleSubmit} isLoading={isMutating} />;
};
