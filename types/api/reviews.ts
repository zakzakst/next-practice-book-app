import { Book } from "@/types/domain/book";
import { Review } from "@/types/domain/review";
import { User } from "@/types/domain/user";

// Create
export type CreateReviewRequest = {
  bookId: Book["id"];
  userId: User["id"];
  rating: number;
  comment: string;
};

export type CreateReviewResponse = Review;

// FindAll
export type FindAllReviewsParams = {
  bookId?: Book["id"];
  userId?: User["id"];
};

export type FindAllReviewsResponse = {
  total: number;
  page: number;
  limit: number;
  items: Review[];
};

// FindOne
export type FindOneReviewResponse = Review;

// Update
export type UpdateReviewRequest = {
  rating: number;
  comment: string;
};

export type UpdateReviewResponse = Review;
