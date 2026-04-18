import { ReviewCreateForm } from "@/components/features/reviews/ReviewCreateForm";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Features/Reviews/ReviewCreateForm",
  component: ReviewCreateForm,
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof ReviewCreateForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SetDefaultValue: Story = {
  args: {
    values: {
      comment: "初期値入力",
      rating: "1.5",
    },
  },
};

export const Disabled: Story = {
  args: {
    isLoading: true,
  },
};
