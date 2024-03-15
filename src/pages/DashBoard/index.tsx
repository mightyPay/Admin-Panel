import React, { useState } from "react";
//import { BsArrowRight } from "react-icons/bs";
import { TabBar } from "../../components";
import { BoxContainer, PageContainer } from "../../containers";
import { PageHeader } from "../../pageComponents";
import DashboardService from "../../api/dashboard";
import { useQuery } from "react-query";
import { CgSpinner } from "react-icons/cg";
import clsxm from "../../utils/clsxm";
import { log } from "console";


const Home = () => {
  const [duration, setDuration] = useState<string>("ALL");
  const [metrics, setMetrics] = useState<
    | {
        user: any;
        account: any;
        transaction: any;
        walletTopUp: any;
      }
    | undefined
  >(undefined);

  const { isLoading } = useQuery(
    ["get-metrics", duration],
    async () => DashboardService.getMetrics(duration),
    {
      onSuccess: (res: any) => {
        const { data } = res;

        setMetrics(data.data);
      },
      onError: (error: any) => {
        console.log({ error });
      },
    }
  );
  // const { isLoading: activeUsersLoading } = useQuery(
  //   "get-active-users",
  //   DashboardService.getActiveUserCount,
  //   {
  //     onSuccess: (res: any) => {
  //       const { data } = res;
  //       setMetrics(data.data);
  //     },
  //     onError: (error: any) => {
  //       console.log({ error });
  //     },
  //   }
  // );
 

  return (
    <PageContainer
      PageHeader={
        <PageHeader
          ToolBar={
            <TabBar
              onChange={(tab: any) => setDuration(tab.key)}
              tabList={[
                {
                  title: "All",
                  key: "ALL",
                },
                {
                  title: "Week",
                  key: "WEEKLY",
                },
                {
                  title: "Month",
                  key: "MONTHLY",
                },
                {
                  title: "Year",
                  key: "YEARLY",
                },
              ]}
            />
          }
        />
      }
    >
      <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-6">
        <MetricsCard
          {...{
            subTitle: "count",
            title: "Users",
            bgColor: "bg-blue-200",
            metric: metrics?.user?._count || "0",
            isLoading,
          }}
        />
        <MetricsCard
          {...{
            subTitle: "count",
            title: "Wallet",
            bgColor: "bg-orange-200",
            metric: metrics?.account?._count || "0",
            isLoading,
          }}
        />
        <MetricsCard
          {...{
            subTitle: "count",
            title: "Transactions",
            bgColor: "bg-green-100",
            metric: metrics?.transaction?._count || "0",
            isLoading,
          }}
        />
        <MetricsCard
          {...{
            subTitle: "sum",
            title: "Transactions",
            bgColor: "bg-gray-200",
            metric: metrics?.transaction?._sum?.amount || "0",
            isLoading,
          }}
        />
        <MetricsCard
          {...{
            subTitle: "count",
            title: "TopUp",
            bgColor: "bg-yellow-200",
            metric: metrics?.walletTopUp?._count || "0",
            isLoading,
          }}
        />
        <MetricsCard
          {...{
            subTitle: "sum",
            title: "TopUp",
            bgColor: "bg-red-200",
            metric: metrics?.walletTopUp?._sum?.amount || "0",
            isLoading,
          }}
        />
        <MetricsCard
          {...{
            subTitle: "count",
            title: "Active Users",
            bgColor: "bg-blue-200",
            metric: metrics?.user?._count  || "0",
            isLoading,
          }}
        />
        
      </div>
    </PageContainer>
  );
};

export default Home;

function MetricsCard({ title, isLoading, metric, subTitle, bgColor }: any) {
  return (
    <BoxContainer classNames={clsxm(`shadow-md bg-opacity-70`, bgColor)}>
      <div className="flex items-center py-3 px-2 gap-x-4">
        <div>
          {isLoading ? (
            <CgSpinner className="animate-spin text-4xl" />
          ) : (
            <h3 className="font-bold text-6xl">{metric}</h3>
          )}
        </div>
        <div className="flex items-center justify-between w-full">
          <div>
            <h4>{subTitle}</h4>
            <p className="text-xl font-bold">{title}</p>
          </div>
          {/* <div>
            <BsArrowRight className="text-4xl" />
          </div> */}
        </div>
      </div>
    </BoxContainer>
  );
}
