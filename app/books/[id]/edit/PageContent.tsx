"use client";

import { useCallback, useMemo } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  BookEditForm,
  BookEditFormValues,
} from "@/components/features/books/BookEditForm";
import { Button } from "@/components/ui/button";
import { useFindOneBook, useUpdateBook } from "@/hooks/useBooks";
import { toast } from "sonner";

type Props = {
  id: number;
};

export const PageContent = ({ id }: Props) => {
  const router = useRouter();
  const { data, isLoading, error } = useFindOneBook(id);
  const { trigger, isMutating, error: updateError } = useUpdateBook(id);

  const handleSubmit = useCallback(
    async (values: BookEditFormValues) => {
      if (isMutating) return;

      const res = await trigger(values);
      // TODO: APIのレスポンスがエラーではないので、res.okやtry catchでの判定ができない。方針考えて修正する。一旦、回避措置としてres.titleがあるかで判定する
      if (res.title) {
        await trigger(values);
        toast("書籍データを更新しました");
        router.push(`/books/${id}`);
      } else {
        toast("書籍データの更新に失敗しました");
      }

      // try {
      //   await trigger(values);
      //   toast("書籍データを更新しました");
      //   router.push(`/books/${id}`);
      // } catch {
      //   toast("書籍データの更新に失敗しました");
      // }
    },
    [trigger, isMutating, router, id],
  );

  const values = useMemo<BookEditFormValues>(() => {
    if (!data)
      return {
        title: "",
        author: "",
        description: "",
      };
    return {
      title: data.title,
      author: data.author,
      description: data.description,
    };
  }, [data]);

  if (error || updateError) return <div>エラーが発生しました</div>;
  if (isLoading) return <div>データ取得中...</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="ml-auto">
        <Button asChild>
          <Link href={`/books/${id}`}>詳細ページに戻る</Link>
        </Button>
      </div>
      <BookEditForm
        values={values}
        onSubmit={handleSubmit}
        isLoading={isMutating}
      />
    </div>
  );
};
