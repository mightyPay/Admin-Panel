import { useState } from "react";
import { useQuery } from "react-query";
import { DriverService } from "../../api";
import { IStartDuty, IStopDuty } from "../../api/interfaces";
import { PageTitleBar } from "../../components";
import Table from "../../components/Table";
import { IEditControlSlide } from "../../components/type";
import { BoxContainer, PageContainer } from "../../containers";
import { EditDriverControl } from "../../controllers";
import { useAuth } from "../../hooks";
import useDriverPage from "../../hooks/useDriverPage";
import { PageHeader } from "../../pageComponents";
import { driverTableHeads } from "../data";

const Driver = () => {
  const [drivers, setDrivers] = useState<any[] | undefined>(undefined);
  const [currRow, setCurrRow] = useState<any>({});
  const [editPanelState, setEditPanelState] = useState<IEditControlSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
    row: undefined,
  });
  const { user } = useAuth();
  const { startDuty, endDuty } = useDriverPage();
  const DriverListApi = useQuery(
    "drivers",
    async () => await DriverService.allDriver(),
    {
      onSuccess: (response: any) => {
        if (response.data.length) {
          setDrivers(response.data);
        }
      },
    }
  );

  const tableFunctions: { [key: string]: any } = {
    startDuty: {
      callBack: async (row: any) => {
        setCurrRow(row);
        let data: IStartDuty = {
          driverId: row.id,
          start: new Date().toISOString() as unknown as Date,
          lat: "1111",
          lng: "1111",
        };

        startDuty.mutate(data);
      },
      isLoading: startDuty.isLoading,
    },
    stopDuty: {
      callBack: async (row: any) => {
        setCurrRow(row);
        let data: IStopDuty = {
          driverId: row.id,
          end: new Date().toISOString() as unknown as Date,
          lat: "2222",
          lng: "2222",
        };

        endDuty.mutate(data);
      },
      isLoading: endDuty.isLoading,
    },
  };

  const tableAction: { [key: string]: any } = {
    universal: {},
    tableFunctions,
  };

  return (
    <PageContainer PageHeader={<PageHeader />}>
      <div className="grid grid-cols-12 w-full gap-x-6">
        <BoxContainer classNames="col-span-12 shadow-md">
          <div className="flex flex-col gap-y-6">
            <PageTitleBar title="Drivers" />

            <div>
              <Table
                classNames=""
                type="driver"
                header={driverTableHeads}
                data={drivers}
                level={1}
                actions={tableAction}
                loading={DriverListApi.isLoading}
              />
            </div>

            {/* <EditDriverControl
              panelState={editPanelState}
              setPanelState={setEditPanelState}
            /> */}
          </div>
        </BoxContainer>
      </div>
    </PageContainer>
  );
};

export default Driver;
