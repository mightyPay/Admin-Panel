import { startOfDay, endOfDay, setDate } from "date-fns";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { TransactionService } from "../../api";
import { SecondaryTable } from "../../components";
import Table from "../../components/Table";
import { BoxContainer } from "../../containers";
import { PageHeader, HistoryHeaderTools } from "../../pageComponents";
import { historyDataHeader, transactionTableHeads } from "../data";

const Transaction = () => {
  // Component State -----------------------------------
  const [transactions, setAllTransactions] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | string>(
    startOfDay(new Date())
  );
  const [endDate, setEndDate] = useState<Date | string>(endOfDay(new Date()));
  const [page, setPage] = useState<string>("1");
  const [limit, setLimit] = useState<string>("10");
  const [total, setTotal] = useState<number>(0);
  const [metaData, setMetaData] = useState<{
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  }>({ page: 1, limit: 10, totalPages: 0, count: 0 });

  const [dateRange, setDateRange] = useState<Date | Date[] | undefined>([
    new Date(startDate),
    new Date(endDate),
  ]);

  const { isLoading } = useQuery(
    ["getAllTransaction", metaData?.page, startDate, endDate],
    async () =>
      await TransactionService.getTransaction({
        page: metaData.page - 1,
        limit: metaData.limit,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      }),
    {
      onSuccess: (res: any) => {
        if (res.data.status === "success") {
          const { data } = res.data;
          const { transaction, metadata } = data || {};

          setAllTransactions(transaction);
          if (metadata && metadata.count) {
            setMetaData({ ...metaData, count: metadata.count });
          }
          //setAllTransactions(res.data.data);
        }
      },
      onError: (error: any) => {
        toast.error("Something went wrong please reload the app");
      },
      enabled: !!(metaData.page && metaData.limit),
    }
  );

  return (
    <div
      className="grid gap-y-8 h-full"
      style={{
        gridTemplateRows: "max-content auto",
      }}
    >
      <PageHeader
        ToolBar={
          <HistoryHeaderTools
            datePicker={{ value: `${startDate}`, onChange: setStartDate }}
          />
        }
      />
      <div className="grid grid-cols-12 w-full gap-x-6">
        <BoxContainer classNames="col-span-12 shadow-md">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium border-l-4 border-rose-800 pl-4">
                All Transactions
              </h2>
            </div>

            <div>
              <SecondaryTable
                classNames=""
                type="driver"
                header={transactionTableHeads}
                data={transactions || []}
                level={2}
                loading={isLoading}
                pagination={{
                  totalItems: metaData.count,
                  itemsPerPage: metaData.limit,
                  onPageChange: (page: number) =>
                    setMetaData((prev: any) => {
                      return { ...prev, page };
                    }),
                }}
              />
            </div>
          </div>
        </BoxContainer>
      </div>
    </div>
  );
};

export default Transaction;
function async() {
  throw new Error("Function not implemented.");
}
