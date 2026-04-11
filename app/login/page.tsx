import type { Metadata } from "next";

import { LoginForm } from "@/components/features/auth/LoginForm";

export const metadata: Metadata = {
  title: "ログイン",
  description: "フォームを入力してログインしてください",
};

const Page = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <LoginForm />
    </div>
  );
};

export default Page;
