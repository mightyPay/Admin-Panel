import React from "react";
import Table from "../../components/Table";
import { BoxContainer } from "../../containers";
import { demoTableData } from "../../pages/data";

const Duties = () => {
  return (
    <BoxContainer classNames="col-span-4 h-screen">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4">
            Duties
          </h2>
        </div>
        <div className="h-[91%]">
          <Table
            classNames="h-full"
            type="demo"
            header={demoTableData.head}
            data={demoTableData.data}
            level={1}
            loading={true}
          />
        </div>
      </div>
    </BoxContainer>
  );
};

export default Duties;
