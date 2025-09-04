"use client";

import { formatDate } from "@/components/shared/DateFormate/DateFormate";
import LoadingContainer from "@/components/shared/loading/LoadingComponents";
import Pagination from "@/components/shared/pagination/Pagination";
import Status from "@/components/shared/Status/Status";
import UseTable, { TData } from "@/components/shared/table/UseTable";
import { TransactionResponse } from "@/components/types/deposit-history/depositHistory";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";

const WithdrawalHistory = ({
  pageNumber,
}: {
  pageNumber?: string | undefined;
}) => {
  const headers = [
    "SL",
    "Date",
    "Transaction Id",
    "Wallet Type",
    "Amount",
    "Status",
  ];

  const { data: withdraw, isPending } = useGetData<TransactionResponse>(
    ["withdrawalHistory", pageNumber],
    `/transactions?page=${pageNumber}&keyword=withdrawal`
  );
  console.log(withdraw);
  return (
    <>
      <div className="py-5">
        <div className="pb-5 flex items-center gap-4">
          <h6 className="text-[20px] text-white">Withdraw History</h6>
        </div>

        {isPending ? (
          <LoadingContainer />
        ) : (
          <>
            {withdraw?.data.length === 0 ? (
              <p className="text-center text-gray-400 italic">
                You don't have Withdraw history.
              </p>
            ) : (
              <>
                <UseTable headers={headers} className="rounded-md">
                  {withdraw?.data.map((item, index) => (
                    <tr key={item.id}>
                      <TData>
                        {" "}
                        {(Number(pageNumber ?? 1) - 1) * 10 + (index + 1)}
                      </TData>
                      <TData>{formatDate(item.created_at)}</TData>
                      <TData>{item.transaction_id}</TData>
                      <TData>{item.wallet_type}</TData>
                      <TData>${item.amount}</TData>
                      <TData>
                        {item.status === "Pending" ? (
                          <Status title="Pending" />
                        ) : item.status === "Completed" ? (
                          <Status title="Completed" />
                        ) : item.status === "rejected" ? (
                          <Status title="Rejected" />
                        ) : (
                          ""
                        )}
                      </TData>
                    </tr>
                  ))}
                </UseTable>
                {withdraw?.data && withdraw?.data.length > 10 && (
                  <Pagination
                    total={withdraw?.total || 0}
                    perPage={10}
                    route="/dashboard/payment-log"
                    currentPage={withdraw?.current ? Number(pageNumber) : 1}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default WithdrawalHistory;
