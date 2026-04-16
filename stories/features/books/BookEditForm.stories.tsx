import { BookEditForm } from "@/components/features/books/BookEditForm";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Features/Books/BookEditForm",
  component: BookEditForm,
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof BookEditForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    values: {
      title: "深夜特急",
      author: "沢木耕太郎",
      description:
        "アジアからヨーロッパへと旅するバックパッカーの体験を綴った紀行文。旅の自由と出会いが描かれる名著。",
    },
  },
};

export const Loading: Story = {
  args: {
    values: {
      title: "深夜特急",
      author: "沢木耕太郎",
      description:
        "アジアからヨーロッパへと旅するバックパッカーの体験を綴った紀行文。旅の自由と出会いが描かれる名著。",
    },
    isLoading: true,
  },
};
