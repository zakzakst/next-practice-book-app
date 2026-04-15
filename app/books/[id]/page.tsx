import { PageContent } from "./PageContent";

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
