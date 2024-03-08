import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { DepartMentService } from "../../api";
import { Button, PlainInputText } from "../../components";
import Table from "../../components/Table";
import { BoxContainer, PageContainer } from "../../containers";
import { PageHeader } from "../../pageComponents";
import { reactQueryError } from "../../utils/functions";
import { demoTableData, departmentTableHeads } from "../data";

const DepartMent = () => {
  const [departments, setDepartMents] = useState<any[] | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [inUpdate, setInUpdate] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const departmentsDataApi = useQuery(
    "departmentData",
    async () => await DepartMentService.getDepartMents(),
    {
      onSuccess: (response: any) => {
        if (response.data.length) {
          setDepartMents(response.data);
          setInUpdate(false);
          setName("");
        } else setDepartMents(undefined);
      },
      onError: (response: any) => {},
    }
  );

  const createDepartmentApi = useMutation(
    "createDepartment",
    async () => await DepartMentService.addDepartment(name),
    {
      onSuccess: (response: any) => {
        if (response.response) {
          toast.error(response.response.data.message);
          setInUpdate(false);
          return;
        }

        if (response.data) {
          toast.success(`${name} is created!`);
          setName("");
          queryClient.invalidateQueries(["departmentData"]);
        }
      },
      onError: reactQueryError,
    }
  );

  const updateDepartmentApi = useMutation(
    "updateDepartment",
    async () => await DepartMentService.updateDepartment(id, name),
    {
      onSuccess: (response: any) => {
        if (response.response) {
          toast.error(response.response.data.message);
          setInUpdate(false);
          return;
        }

        if (response.data) {
          toast.success(`${name} is updated!`);
          setName("");
          queryClient.invalidateQueries(["departmentData"]);
        }
      },
      onError: reactQueryError,
    }
  );

  const deleteDepartmentApi = useMutation(
    "deletePerk",
    async (id: string) => await DepartMentService.delete(id),
    {
      onSuccess: (response: any) => {
        if (response.response) {
          toast.error(response.response.data.message);
          return;
        }

        if (response.data) {
          toast.success(`Department Deleted`);
          queryClient.invalidateQueries(["departmentData"]);
        }
      },
      onError: reactQueryError,
    }
  );

  const onAddPerk = async (e: any) => {
    if (!name || (inUpdate && !id)) {
      toast.error(
        inUpdate ? "id, name is required" : "DepartMent Name is required!"
      );
      return;
    }

    if (!inUpdate) {
      await createDepartmentApi.mutateAsync();
      return;
    }

    if (isChange) await updateDepartmentApi.mutateAsync();
    else onClose();
  };

  const onEditPerk = async (row: any) => {
    setInUpdate(true);
    setName(row.name);
    setId(row.id);
  };

  const onDeletePerk = async (row: any) => {
    deleteDepartmentApi.mutateAsync(`${row.id}`);
  };

  const tableAction: { [key: string]: any } = {
    universal: {
      edit: onEditPerk,
      // delete: onDeletePerk,
    },
  };

  const onClose = () => {
    setName("");
    setInUpdate(false);
    setIsChange(false);
  };

  return (
    <PageContainer PageHeader={<PageHeader />}>
      <div className="grid grid-cols-12 w-full gap-x-6">
        <BoxContainer classNames="col-span-8 shadow-md">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4">
                DepartMent List
              </h2>
            </div>

            <div>
              <Table
                classNames=""
                type="demo"
                header={departmentTableHeads}
                data={departments}
                level={1}
                actions={tableAction}
                loading={departmentsDataApi.isLoading}
              />
            </div>
          </div>
        </BoxContainer>
        <BoxContainer classNames="col-span-4 shadow-md">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4">
                {!inUpdate ? "Create Department" : "Update Department"}
              </h2>
              {inUpdate && (
                <GrClose className="text-xl cursor-pointer" onClick={onClose} />
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="perkName">Name</label>
                <PlainInputText
                  placeholder="eg. Sales"
                  type="text"
                  classNames=""
                  value={name}
                  onChange={(e) => {
                    if (inUpdate) {
                      setIsChange(true);
                    }
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <Button
              onClick={onAddPerk}
              loading={
                createDepartmentApi.isLoading || updateDepartmentApi.isLoading
              }
              title={!inUpdate ? "Add" : "Update"}
            />
          </div>
        </BoxContainer>
      </div>
    </PageContainer>
  );
};

export default DepartMent;
