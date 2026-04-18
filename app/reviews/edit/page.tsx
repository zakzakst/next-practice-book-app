import type { Metadata } from "next";

import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "レビュー編集",
  description: "フォームを入力してレビュー編集してください",
};

const Page = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <PageContent />
    </div>
  );
};

export default Page;
