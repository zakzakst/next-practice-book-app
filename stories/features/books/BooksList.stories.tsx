import { BooksList } from "@/components/features/books/BooksList";
import { books } from "@/dummy-db/book";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// import { fn } from "storybook/test";

const meta = {
  title: "Features/Books/BooksList",
  component: BooksList,
  tags: ["autodocs", "experimental"],
} satisfies Meta<typeof BooksList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: books,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
