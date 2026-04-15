"use client";

import { useCallback, useState } from "react";

import { ButtonPagination } from "@/components/common/ButtonPagination";
import { SearchInput } from "@/components/common/SearchInput";
import { BooksList } from "@/components/features/books/BooksList";
import { useFindAllBooks } from "@/hooks/useBooks";
import { FindAllBooksParams } from "@/types/api/books";

const Page = () => {
  const [params, setParams] = useState<FindAllBooksParams>({
    page: 1,
  });
  const { data, isLoading, error } = useFindAllBooks(params);

  const handleSubmitSearchInput = useCallback(
    (q: string) => {
      setParams({
        page: 1,
        q,
      });
    },
    [setParams],
  );

  const handleMovePage = useCallback(
    (page: number) => {
      setParams((value) => ({
        ...value,
        page,
      }));
    },
    [setParams],
  );

  if (isLoading) return <div>データ取得中...</div>;
  if (error) return <div>エラーが発生しました</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* TODO: 検索フォームの挙動が使いにくい。仕様を整理して修正する */}
      <SearchInput value="" onSubmit={handleSubmitSearchInput} />
      <BooksList items={data?.items || []} />
      <ButtonPagination
        total={data?.total}
        current={params.page}
        onMovePage={handleMovePage}
      />
    </div>
  );
};

export default Page;
