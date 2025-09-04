import InvestHistory from "./InvestHistory";
interface Props {
  searchParams: Promise<{ page?: string }>;
}
const InvestHistoryPage = async({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ?? "1";
  return (
    <>
      <InvestHistory pageNumber={page} />
    </>
  );
};

export default InvestHistoryPage;
