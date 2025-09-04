import PaymentLogHistory from "@/components/dashboardComponent/PaymentLogHistory/PaymentLogHistory";

 interface Props {
  searchParams: Promise<{ page?: string }>;
}
const transactionHistoryPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ?? "1";

  return <PaymentLogHistory pageNumber={page} />;
};
export default transactionHistoryPage;
