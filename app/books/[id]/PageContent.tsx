"use client";

import { BookDetail } from "@/components/features/books/BookDetail";
import { useFindOneBook } from "@/hooks/useBooks";

type Props = {
  id: number;
};

export const PageContent = ({ id }: Props) => {
  const { data, isLoading, error } = useFindOneBook(Number(id));

  if (isLoading) return <div>データ取得中...</div>;
  if (error) return <div>エラーが発生しました</div>;
  if (!data) return <div>書籍が見つかりません</div>;

  return <BookDetail book={data} />;
};
