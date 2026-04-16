import { BookDetail } from "@/components/features/books/BookDetail";
import { books } from "@/dummy-db/book";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Features/Books/BookDetail",
  component: BookDetail,
  // TODO: テンプレートのほうにも反映（experimental削除）
  tags: ["autodocs"],
} satisfies Meta<typeof BookDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    book: books[1],
  },
};

export const NoImage: Story = {
  args: {
    book: books[0],
  },
};
