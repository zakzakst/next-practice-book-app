"use client";

import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { FrontBook } from "@/types/api/books";

type Props = {
  book: FrontBook;
  onUpdateFavorite: (book: FrontBook) => void;
};

export const BookDetail = ({ book, onUpdateFavorite }: Props) => {
  const { me } = useAuth();

  const handleUpdateFavorite = useCallback(
    (book: FrontBook) => {
      onUpdateFavorite(book);
    },
    [onUpdateFavorite],
  );

  return (
    <div className="grid grid-cols-[240px_1fr] gap-4">
      <div>
        <img
          className="aspect-video h-full w-full object-cover"
          src={
            book?.thumbnail || "https://placehold.jp/800x450.png?text=No+Image"
          }
          alt={
            book?.thumbnail
              ? `${book.title}の書影`
              : "登録された書影がありません"
          }
        />
      </div>
      <div>
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p>{book.author}</p>
          <div className="flex items-center gap-2">
            <p>お気に入り登録した人数：{book.favorite.count}</p>
            {me && (
              <Button onClick={() => handleUpdateFavorite(book)}>
                {book.favorite.state ? "お気に入り解除" : "お気に入り登録"}
              </Button>
            )}
          </div>
        </div>
        <Separator className="my-6" />
        <div>
          <h2 className="text-xl font-bold">あらすじ・内容</h2>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
};
