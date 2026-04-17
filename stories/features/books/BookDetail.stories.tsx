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
  },
};
