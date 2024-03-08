import React from "react";
import Table from "../../components/Table";
import { PageContainer, BoxContainer } from "../../containers";
import { PageHeader } from "../../pageComponents";
import { appUsersTableHeads } from "../data";

function Asset() {
  return (
    <PageContainer PageHeader={<PageHeader />}>
      <div className="grid grid-cols-12 w-full gap-x-6">
        <BoxContainer classNames="col-span-12 shadow-md">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4">
                Banner List
              </h2>
            </div>

            <div></div>
          </div>
        </BoxContainer>
      </div>
    </PageContainer>
  );
}

export default Asset;
