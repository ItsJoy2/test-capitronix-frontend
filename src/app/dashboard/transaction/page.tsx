import TransactionHistory from "./TransactinHistory";

interface Props {
  searchParams: Promise<{ page?: string }>;
}
const TransactionPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ?? "1";
  return (
    <>
      <TransactionHistory pageNumber={page} />
    </>
  );
};

export default TransactionPage;
