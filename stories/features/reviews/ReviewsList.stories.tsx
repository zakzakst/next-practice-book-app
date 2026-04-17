import { ReviewsList } from "@/components/features/reviews/ReviewsList";
import { AuthProvider } from "@/contexts/AuthContext";
import { authMeHandler } from "@/lib/msw/handlers/auth";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Features/Reviews/ReviewsList",
  component: ReviewsList,
  tags: ["autodocs"],
  args: {
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
} satisfies Meta<typeof ReviewsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
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

export const Empty: Story = {
  args: {
    items: [],
  },
};
