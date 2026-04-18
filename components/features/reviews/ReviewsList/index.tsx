"use client";

import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { FrontReview } from "@/types/api/reviews";
import { Star, Trash2 } from "lucide-react";

type Props = {
  items: FrontReview[];
  onDeleteReview: (review: FrontReview) => void;
};

export const ReviewsList = ({ items, onDeleteReview }: Props) => {
  const { me } = useAuth();

  const handleClick = useCallback(
    (review: FrontReview) => {
      onDeleteReview(review);
    },
    [onDeleteReview],
  );

  if (!items.length)
    return <div className="text-center">レビューはありません</div>;

  return (
    <ul className="grid grid-cols-1 gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <Card>
            <CardContent className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-[1fr_max-content] items-center gap-4">
                <p className="text-lg font-bold">{item.user.name}</p>
                <div className="flex items-center gap-1">
                  <Star />
                  <span>{item.rating}</span>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_max-content] gap-4">
                <div>
                  {/* TODO: 調べる。ライブラリ利用で日付フォーマットしたい */}
                  <p className="text-sm text-gray-600">{item.updatedAt}</p>
                  <p className="mt-2">{item.comment}</p>
                </div>
                {me?.id === item.userId && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleClick(item)}
                    data-testid={`reviews-list-delete-button-${item.id}`}
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};
