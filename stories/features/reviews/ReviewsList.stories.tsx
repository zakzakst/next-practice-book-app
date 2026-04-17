import { ReviewsList } from "@/components/features/reviews/ReviewsList";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// import { fn } from "storybook/test";

const meta = {
  title: "Features/Reviews/ReviewsList",
  component: ReviewsList,
  tags: ["autodocs"],
} satisfies Meta<typeof ReviewsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
