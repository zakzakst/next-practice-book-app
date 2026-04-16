import type { Metadata } from "next";

import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  // TODO: 調べる。use serverのファイルでSWR使えるか（データをtitleやdescriptionに反映させたい）
  // TODO: 考える。SWRを使えたとして、使うのが適切か？コードの共通化以外、冗長な気がする
  title: "書籍詳細",
  description: "書籍の詳細データを見れます",
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return <PageContent id={Number(id)} />;
};

export default Page;
