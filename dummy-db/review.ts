import { Review } from "@/types/domain/review";

export const reviews: Review[] = [
  {
    id: 1,
    bookId: 1,
    userId: 1,
    rating: 5,
    comment: "とても面白かったです！！",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: 2,
    bookId: 2,
    userId: 1,
    rating: 4,
    comment: "すごく読みやすかったです",
    createdAt: "2024-03-15T10:00:00.000Z",
    updatedAt: "2024-03-15T10:00:00.000Z",
  },
  {
    id: 3,
    bookId: 1,
    userId: 2,
    rating: 3,
    comment: "登場人物に共感できました",
    createdAt: "2024-10-15T10:00:00.000Z",
    updatedAt: "2024-10-15T10:00:00.000Z",
  },
  {
    id: 4,
    bookId: 2,
    userId: 2,
    rating: 4.5,
    comment: "やっと読み終わりました。楽しい読書体験ができました",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-01-15T10:00:00.000Z",
  },
];
