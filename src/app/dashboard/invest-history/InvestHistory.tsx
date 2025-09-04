"use client";

import { formatDate } from "@/components/shared/DateFormate/DateFormate";
import LoadingContainer from "@/components/shared/loading/LoadingComponents";
import Pagination from "@/components/shared/pagination/Pagination";
import Status from "@/components/shared/Status/Status";
import UseTable, { TData } from "@/components/shared/table/UseTable";
import { InvestmentPlanResponse } from "@/components/types/investHistory/investHistory";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";

const InvestHistory = ({ pageNumber }: { pageNumber?: string | undefined }) => {
  const headers = [
    "Date",
    "Details",
    "Invest Amount",
    "ROI",
    "Return Type",
    "Recieive Day",
    "Duration",
    "Status",
  ];

  const { data: investHistory, isPending } = useGetData<InvestmentPlanResponse>(
    ["invest", pageNumber],
    `/invest-history?page=${pageNumber}`
  );

  return (
    <>
      <div className="py-5">
        <div className="pb-5 flex items-center gap-4">
          <h6 className="text-[20px] text-white">Invest History</h6>
        </div>

        {isPending ? (
          <LoadingContainer />
        ) : (
          <>
            {investHistory?.total === 0 ? (
              <p className="text-center text-gray-400 italic">
                You don't have invest history.
              </p>
            ) : (
              <>
                <UseTable headers={headers} className="rounded-md">
                  {investHistory?.data.map((item) => (
                    <tr key={item.id}>
                      <TData>{formatDate(item.created_at)}</TData>
                      <TData>{item.package_name}</TData>
                      <TData>${item.investment}</TData>
                      <TData>
                        $
                        {(
                          (Number(item.investment) *
                            Number(item.interest_rate)) /
                          100
                        ).toFixed(2)}
                      </TData>{" "}
                      <TData className="capitalize">{item.return_type}</TData>
                      <TData className="capitalize">
                        {item.total_receive_day} Days
                      </TData>
                      <TData>{item.duration} Days</TData>
                      <TData>
                        {item.status === "0" ? (
                          <Status title="Completed" />
                        ) : (
                          <Status title="Active" />
                        )}
                      </TData>
                    </tr>
                  ))}
                </UseTable>
                {investHistory?.data && investHistory.data.length > 10 && (
                  <Pagination
                    total={investHistory?.total || 0}
                    perPage={10}
                    route="/dashboard/payment-log"
                    currentPage={
                      investHistory?.current_page ? Number(pageNumber) : 1
                    }
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

export default InvestHistory;
