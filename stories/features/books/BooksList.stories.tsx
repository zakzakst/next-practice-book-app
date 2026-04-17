import { BooksList } from "@/components/features/books/BooksList";
import { AuthProvider } from "@/contexts/AuthContext";
import { books } from "@/dummy-db/book";
import { authMeHandler } from "@/lib/msw/handlers/auth";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const frontBooks = books.map((b) => ({
  ...b,
  favorite: {
    count: 0,
    state: false,
  },
}));

const meta = {
  title: "Features/Books/BooksList",
  component: BooksList,
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
} satisfies Meta<typeof BooksList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: 全ての書籍が表示されるので、数を制限する
    items: frontBooks,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
