import { ReviewCreateForm } from "@/components/features/reviews/ReviewCreateForm";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// import { fn } from "storybook/test";

const meta = {
  title: "Features/Reviews/ReviewCreateForm",
  component: ReviewCreateForm,
  tags: ["autodocs"],
} satisfies Meta<typeof ReviewCreateForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
