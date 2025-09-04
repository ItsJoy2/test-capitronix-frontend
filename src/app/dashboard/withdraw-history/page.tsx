import WithdrawalHistory from "./WithdrawalHistory";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function WithdrawalPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ?? "1";
  return (
    <>
      <WithdrawalHistory pageNumber={page} />
    </>
  );
}
