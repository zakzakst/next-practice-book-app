// import { Book } from "@/types/domain/book";
import { Review } from "@/types/domain/review";
import { User } from "@/types/domain/user";

export type FrontReview = Review & {
  user: Omit<User, "password">;
};

// Create
export type CreateReviewRequest = {
  rating: number;
  comment: string;
};

export type CreateReviewResponse = FrontReview;

// FindAll
// export type FindAllReviewsParams = {
//   bookId?: Book["id"];
//   userId?: User["id"];
// };

// export type FindAllReviewsResponse = {
//   total: number;
//   items: FrontReview[];
// };

// FindOne
// export type FindOneReviewResponse = Review;

// Update
export type UpdateReviewRequest = {
  rating: number;
  comment: string;
};

export type UpdateReviewResponse = FrontReview;

// FindAllByBookId
export type FindAllReviewsByBookIdResponse = {
  total: number;
  items: FrontReview[];
};
