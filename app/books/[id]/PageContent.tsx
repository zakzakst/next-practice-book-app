"use client";

import Link from "next/link";

import { BookDetail } from "@/components/features/books/BookDetail";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useFindOneBook } from "@/hooks/useBooks";

type Props = {
  id: number;
};

export const PageContent = ({ id }: Props) => {
  const { data, isLoading, error } = useFindOneBook(id);
  const { me } = useAuth();

  if (isLoading) return <div>データ取得中...</div>;
  if (error) return <div>エラーが発生しました</div>;
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
      <BookDetail book={data} onUpdateFavorite={() => {}} />
    </div>
  );
};
