import React, { useState } from "react";
import { useQuery } from "react-query";
import { DriverService } from "../../api";
import Table from "../../components/Table";
import { BoxContainer } from "../../containers";
import { HistoryHeaderTools, PageHeader } from "../../pageComponents";
import { getCurrDate } from "../../utils/functions";
import { historyDataHeader } from "../data";

const History = () => {
  const [date, setDate] = useState<string>(`${getCurrDate()}`);
  const [drivers, setDrivers] = useState<any[] | undefined>(undefined);

  const driverHistoryApi = useQuery(
    ["trackDutiesDayWise", date],
    async () => await DriverService.getDayDuties(new Date(date).toISOString()),
    {
      onSuccess: (response: any) => {
        if (response.data.length) setDrivers(response.data);
        else setDrivers(undefined);
      },
      onError: (error: any) => {
        console.log({ error });
      },
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
          <HistoryHeaderTools datePicker={{ value: date, onChange: setDate }} />
        }
      />
      <div className="grid grid-cols-12 w-full gap-x-6">
        <BoxContainer classNames="col-span-12 shadow-md">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4">
                Drivers
              </h2>
            </div>

            <div>
              <Table
                classNames=""
                type="driver"
                header={historyDataHeader}
                data={drivers}
                level={2}
                loading={driverHistoryApi.isLoading}
              />
            </div>
          </div>
        </BoxContainer>
      </div>
    </div>
  );
};

export default History;
