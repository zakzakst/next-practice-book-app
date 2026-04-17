"use client";

import { useCallback } from "react";

import Link from "next/link";

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
      <div className="flex flex-col gap-2">
        <div>
          <img
            className="aspect-video h-full w-full object-cover"
            src={
              book?.thumbnail ||
              "https://placehold.jp/800x450.png?text=No+Image"
            }
            alt={
              book?.thumbnail
                ? `${book.title}の書影`
                : "登録された書影がありません"
            }
            loading="lazy"
          />
        </div>
        {me && (
          <>
            <div>
              <Button
                onClick={() => handleUpdateFavorite(book)}
                className="w-full"
                data-testid="book-detail-favorite-button"
              >
                {book.favorite.state ? "お気に入り解除" : "お気に入り登録"}
              </Button>
            </div>
            <div>
              <Button className="w-full" asChild>
                <Link href={`/reviews/create?bookId=${book.id}`}>
                  レビューを書く
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
      <div>
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p>{book.author}</p>
          <p>お気に入り登録した人数：{book.favorite.count}</p>
          <p>レビュー数：{book.reviews.count}</p>
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
