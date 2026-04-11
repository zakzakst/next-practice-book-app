import type { Metadata } from "next";

import { RegisterForm } from "@/components/features/auth/RegisterForm";

export const metadata: Metadata = {
  title: "ユーザー登録",
  description: "フォームを入力してユーザー登録してください",
};

const Page = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <RegisterForm />
    </div>
  );
};

export default Page;
