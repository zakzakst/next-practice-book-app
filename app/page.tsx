"use client";

import { useCallback, useState } from "react";

import { ButtonPagination } from "@/components/common/ButtonPagination";
import { SearchInput } from "@/components/common/SearchInput";
import { BooksList } from "@/components/features/books/BooksList";
import {
  useDeleteBookFavorite,
  usePostBookFavorite,
} from "@/hooks/useBookFavorite";
import { useFindAllBooks } from "@/hooks/useBooks";
import { FindAllBooksParams } from "@/types/api/books";
import { FrontBook } from "@/types/api/books";
import { toast } from "sonner";

const Page = () => {
  const [params, setParams] = useState<FindAllBooksParams>({
    page: 1,
  });
  const { data, isLoading, error, mutate } = useFindAllBooks(params);
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

  if (isLoading) return <div>データ取得中...</div>;
  if (isMutatingPost || isMutatingDelete) return <div>お気に入り更新中...</div>;
  if (error || errorPost || errorDelete) return <div>エラーが発生しました</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      <SearchInput value={params.q} onSubmit={handleSubmitSearchInput} />
      <BooksList
        items={data?.items || []}
        onUpdateFavorite={handleUpdateFavorite}
      />
      <ButtonPagination
        total={data?.total}
        current={params.page}
        onMovePage={handleMovePage}
      />
    </div>
  );
};

export default Page;
