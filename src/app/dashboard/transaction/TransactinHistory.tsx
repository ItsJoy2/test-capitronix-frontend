"use client";

import { SelectField } from "@/components/form/fields/SelectField";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { formatDate } from "@/components/shared/DateFormate/DateFormate";
import LoadingContainer from "@/components/shared/loading/LoadingComponents";
import Pagination from "@/components/shared/pagination/Pagination";
import Status from "@/components/shared/Status/Status";
import UseTable, { TData } from "@/components/shared/table/UseTable";
import { TransactionnHistory } from "@/components/types/transactionsHistory/transactionHistory";

import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import z from "zod";

export const searchSchema = z.object({
  search: z.string().nonempty(),
});

type FormType = z.infer<typeof searchSchema>;

const initialValues: FormType = {
  search: "",
};

const PublishedOptions = [
  { value: "all", text: "All" },
  { value: "deposit", text: "Deposit" },
  { value: "withdrawal", text: "Withdrawal" },
  { value: "transfer", text: "Transfer" },
  { value: "referral_commission", text: "Referral Commission" },
  { value: "interest", text: "Interest" },
  { value: "package_purchased", text: "Package Purchased" },
  { value: "convert", text: "Convert" },
  { value: "activation", text: "Activation" },
  { value: "generation_income", text: "Generation Income" },
];

const TransactionHistory = ({
  pageNumber,
}: {
  pageNumber: string | undefined;
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const headers = [
    "Date",
    "Remark",
    "Transaction Id",
    "Amount",
    "Status",
    "Details",
  ];
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const { data: transactionHistory, isPending } =
    useGetData<TransactionnHistory>(
      ["transactionHistory", pageNumber, selectedValue],
      `/transactions?page=${pageNumber}&keyword=${selectedValue}`
    );

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log(data);
  };

  const handleChange = (e: string) => {
    if (e === "all") {
      setSelectedValue("");
    } else {
      setSelectedValue(e);
    }
  };
  const selectedOptionText =
    selectedValue === ""
      ? "any transaction"
      : PublishedOptions.find((opt) => opt.value === selectedValue)?.text || "";

  const noHistoryMessage =
    selectedValue === ""
      ? "You don't have any transaction history."
      : `You don't have ${selectedOptionText} history.`;

  return (
    <>
      <div className="py-5">
        <div className="pb-5 flex items-center gap-4">
          <h6 className="text-[20px] text-white">Transaction History</h6>
          <GenericForm
            schema={searchSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="w-[250px]">
              <SelectField
                name="publishedStatus"
                placeholder="Select status"
                options={PublishedOptions}
                required
                onChange={handleChange}
              />
            </div>
          </GenericForm>
        </div>

        {isPending ? (
          <LoadingContainer />
        ) : (
          <>
            {transactionHistory?.total === 0 ? (
              <p className="text-center text-gray-400 italic">
                {noHistoryMessage}
              </p>
            ) : (
              <>
                <UseTable headers={headers} className="rounded-md">
                  {transactionHistory?.data.map((item) => (
                    <tr key={item.id}>
                      <TData>{formatDate(item.created_at)}</TData>
                      <TData>
                        {item.remark === "interest"
                          ? "Profit"
                          : item.remark === "referral_commission"
                          ? "Referral Commission"
                          : item.remark}

                        {/* {item.remark} */}
                      </TData>
                      <TData>{item.transaction_id}</TData>
                      <TData
                        className={cn(
                          "font-medium",
                          item.type === "+" ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {`(${item.type})`} {item.amount} USDT
                      </TData>
                      <TData>
                        {item.status === "Completed" ? (
                          <Status title="Completed" />
                        ) : item.status === "Pending" ? (
                          <Status title="Pending" />
                        ) : item.status === "Paid" ? (
                          <Status title="Paid" />
                        ) : (
                          <Status title="Rejected" />
                        )}
                      </TData>
                      <TData>{item.details}</TData>
                    </tr>
                  ))}
                </UseTable>
                {transactionHistory &&
                  transactionHistory?.data.length >= 10 && (
                    <Pagination
                      total={transactionHistory?.total || 0}
                      perPage={10}
                      route="/dashboard/transaction"
                      currentPage={
                        transactionHistory?.current_page
                          ? Number(pageNumber)
                          : 1
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

export default TransactionHistory;
