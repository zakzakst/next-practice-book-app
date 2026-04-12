import { BookDetail } from "@/components/features/books/BookDetail";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Features/Books/BookDetail",
  component: BookDetail,
  tags: ["autodocs", "experimental"],
} satisfies Meta<typeof BookDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
