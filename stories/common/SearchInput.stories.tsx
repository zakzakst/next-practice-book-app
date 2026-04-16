import { SearchInput } from "@/components/common/SearchInput";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Common/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "入力テキスト",
  },
};

export const Disabled: Story = {
  args: {
    value: "入力テキスト",
    disabled: true,
  },
};
