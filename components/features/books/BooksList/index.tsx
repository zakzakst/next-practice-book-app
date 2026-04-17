"use client";

import { MouseEvent, useCallback } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { FrontBook } from "@/types/api/books";
import { Star } from "lucide-react";

type Props = {
  items: FrontBook[];
  onUpdateFavorite: (item: FrontBook) => void;
};

export const BooksList = ({ items, onUpdateFavorite }: Props) => {
  const { me } = useAuth();

  const handleUpdateFavorite = useCallback(
    (e: MouseEvent<HTMLButtonElement>, item: FrontBook) => {
      e.preventDefault();
      onUpdateFavorite(item);
    },
    [onUpdateFavorite],
  );

  if (!items.length) return <p className="text-center">書籍が見つかりません</p>;

  return (
    <ul className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`/books/${item.id}`}
            className="block h-full"
            data-testid={`books-list-link-${item.id}`}
          >
            <article className="h-full">
              <Card className="h-full pt-0 duration-300 hover:shadow-lg">
                <div>
                  <img
                    className="aspect-video h-full w-full object-cover"
                    src={
                      item?.thumbnail ||
                      "https://placehold.jp/800x450.png?text=No+Image"
                    }
                    alt={
                      item?.thumbnail
                        ? `${item.title}の書影`
                        : "登録された書影がありません"
                    }
                    loading="lazy"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.author}</p>
                </CardContent>
                {/* NOTE: 後で評価情報を足した時にここにお気に入りボタンと評価数とレビュー数を表示する */}
                <CardFooter className="mt-auto grid grid-cols-[1fr_max-content] items-center gap-2">
                  <div>
                    {me && (
                      <Button
                        onClick={(e) => handleUpdateFavorite(e, item)}
                        data-testid={`books-list-favorite-button-${item.id}`}
                      >
                        {item.favorite.state
                          ? "お気に入り解除"
                          : "お気に入り登録"}
                      </Button>
                    )}
                  </div>
                  <p className="flex items-center gap-1">
                    <Star aria-label="お気に入り登録した人数" />
                    <span data-testid={`book-list-favorite-count-${item.id}`}>
                      {item.favorite.count}
                    </span>
                  </p>
                </CardFooter>
              </Card>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
};
