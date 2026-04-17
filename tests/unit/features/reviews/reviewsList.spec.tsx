import { ReviewsList } from "@/components/features/reviews/ReviewsList";
import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/dummy-db/user";
import { FrontReview } from "@/types/api/reviews";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/contexts/AuthContext");

const DummyReviews: FrontReview[] = [
  {
    id: 1,
    bookId: 1,
    userId: 1,
    rating: 5,
    comment: "とても面白かったです！！",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
    user: {
      id: 1,
      name: "Taro Yamada",
      email: "taro@example.com",
      roles: ["user", "admin"],
      createdAt: "2026-04-01T08:00:00.000Z",
      updatedAt: "2026-04-01T08:00:00.000Z",
    },
  },
  {
    id: 3,
    bookId: 1,
    userId: 2,
    rating: 3,
    comment: "登場人物に共感できました",
    createdAt: "2024-10-15T10:00:00.000Z",
    updatedAt: "2024-10-15T10:00:00.000Z",
    user: {
      id: 2,
      name: "Hanako Suzuki",
      email: "hanako@example.com",
      roles: ["user"],
      createdAt: "2026-04-02T09:30:00.000Z",
      updatedAt: "2026-04-02T09:30:00.000Z",
    },
  },
];

describe("ReviewsList", () => {
  test("渡されたデータに対応した内容が表示される", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(<ReviewsList items={DummyReviews} onDeleteReview={() => {}} />);

    // Assert
    expect(screen.getByText("Taro Yamada")).toBeInTheDocument();
    expect(screen.getByText("とても面白かったです！！")).toBeInTheDocument();
  });

  test("自身が投稿したレビューのみ削除ボタンが表示される", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: users[0],
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(<ReviewsList items={DummyReviews} onDeleteReview={() => {}} />);
    const myReviewDeleteButton = screen.getByTestId(
      "reviews-list-delete-button-1",
    );
    const othersReviewDeleteButton = screen.queryByTestId(
      "reviews-list-delete-button-3",
    );

    // Assert
    expect(myReviewDeleteButton).toBeInTheDocument();
    expect(othersReviewDeleteButton).not.toBeInTheDocument();
  });

  test("削除ボタンが正しく挙動する", async () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: users[0],
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    const deleteReviewMock = vi.fn();
    render(
      <ReviewsList items={DummyReviews} onDeleteReview={deleteReviewMock} />,
    );
    const myReviewDeleteButton = screen.getByTestId(
      "reviews-list-delete-button-1",
    );

    // Act
    await userEvent.click(myReviewDeleteButton);

    // Assert
    expect(deleteReviewMock).toHaveBeenCalledWith(DummyReviews[0]);
  });
});
