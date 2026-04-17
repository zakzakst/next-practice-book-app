import { ReviewEditForm } from "@/components/features/reviews/ReviewEditForm";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// import { fn } from "storybook/test";

const meta = {
  title: "Features/Reviews/ReviewEditForm",
  component: ReviewEditForm,
  tags: ["autodocs"],
} satisfies Meta<typeof ReviewEditForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
