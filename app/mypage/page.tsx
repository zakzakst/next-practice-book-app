import type { Metadata } from "next";

import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "マイページ",
  description: "あなたの情報を管理するページです",
};

const Page = () => {
  return <PageContent />;
};

export default Page;
