import { useState } from "react";
import { useQuery } from "react-query";
import { AppUserService } from "../../api";
import { IStartDuty, IStopDuty } from "../../api/interfaces";
import Table from "../../components/Table";
import { IEditControlSlide } from "../../components/type";
import { BoxContainer, PageContainer } from "../../containers";
import { EditDriverControl } from "../../controllers";
import { useAuth } from "../../hooks";
import useDriverPage from "../../hooks/useDriverPage";
import { PageHeader } from "../../pageComponents";
import { appUsersTableHeads, driverTableHeads } from "../data";

const AppUser = () => {
  const [appUsers, setAppUsers] = useState<any[] | undefined>(undefined);
  const [currRow, setCurrRow] = useState<any>({});
  const [editPanelState, setEditPanelState] = useState<IEditControlSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
    row: undefined,
  });
  const { user } = useAuth();
  const { startDuty, endDuty } = useDriverPage();
  const DriverListApi = useQuery("appUsers", AppUserService.getUsers, {
    onSuccess: (response: any) => {
      if (response.data.length) {
        setAppUsers(response.data);
      }
    },
  });

  const onStartDuty = async () => {
    console.log("duty start honi chahiye");
  };

  const tableFunctions: { [key: string]: any } = {};

  const tableAction: { [key: string]: any } = {
    universal: {},
    tableFunctions,
  };

  return (
    <PageContainer PageHeader={<PageHeader />}>
      <div className="grid grid-cols-12 w-full gap-x-6">
        <BoxContainer classNames="col-span-12 shadow-md">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4">
                AppUser List
              </h2>
            </div>

            <div>
              <Table
                classNames=""
                type="driver"
                header={appUsersTableHeads}
                data={appUsers}
                level={2}
                actions={tableAction}
                loading={DriverListApi.isLoading}
              />
            </div>
          </div>
        </BoxContainer>
      </div>
    </PageContainer>
  );
};

export default AppUser;
