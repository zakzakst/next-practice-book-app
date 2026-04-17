import { BookDetail } from "@/components/features/books/BookDetail";
import { AuthProvider } from "@/contexts/AuthContext";
import { books } from "@/dummy-db/book";
import { authMeHandler } from "@/lib/msw/handlers/auth";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Features/Books/BookDetail",
  component: BookDetail,
  // TODO: テンプレートのほうにも反映（experimental削除）
  tags: ["autodocs"],
  args: {
    onUpdateFavorite: fn(),
    onDeleteReview: fn(),
  },
  parameters: {
    msw: {
      handlers: [authMeHandler],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
} satisfies Meta<typeof BookDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    book: {
      ...books[1],
      favorite: {
        count: 0,
        state: false,
      },
      reviews: {
        count: 0,
      },
    },
    reviews: [
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
    ],
  },
};

export const NoImage: Story = {
  args: {
    book: {
      ...books[0],
      favorite: {
        count: 0,
        state: false,
      },
      reviews: {
        count: 0,
      },
    },
    reviews: [],
  },
};
