import { ButtonPagination } from "@/components/common/ButtonPagination";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Common/ButtonPagination",
  component: ButtonPagination,
  tags: ["autodocs"],
  args: {
    onMovePage: fn(),
  },
} satisfies Meta<typeof ButtonPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    total: 100,
    current: 1,
  },
};
