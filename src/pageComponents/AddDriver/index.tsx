import React, { Fragment, useState } from "react";
import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { toast } from "react-toastify";
import { DepartMentService, DriverService } from "../../api";
import { IDriver } from "../../api/driver";
import {
  Button,
  PageTitleBar,
  PlainInputText,
  SelectInput,
} from "../../components";
import { SingleFileUpload } from "../../components";
import { BoxContainer } from "../../containers";
import { IAddDriver } from "../type";

const AddDriver = ({ completed, title }: IAddDriver) => {
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const [departMents, setDepartMents] = useState<any[] | undefined>([]);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [empId, setEmpId] = useState<string>("");
  const [department, setDepartment] = useState<string>("no-dept");
  const queryClient = useQueryClient();
  // const [loading, setLoading] = useState<boolean>(false);

  const departmentsDataApi = useQuery(
    "departmentData",
    async () => await DepartMentService.getDepartMents(),
    {
      onSuccess: (response: any) => {
        if (response.data.length) setDepartMents(response.data);
        else setDepartMents(undefined);
      },
      onError: (response: any) => {},
    }
  );

  const { isLoading, mutateAsync } = useMutation(
    "addDriver",
    DriverService.addDriver,
    {
      onSuccess: (response: any) => {
        let { data } = response || {};

        if (!data || response.response) {
          let { message } = response.response.data || {};

          if (message) {
            let msg = Array.isArray(message) ? message[0] : message;

            toast.error(msg);
          }
          return;
        } else {
          toast.success(`${name} is created!`);
          setName("");
          setEmpId("");
          setPhone("");
          setDepartment("no-dep");
          setProfileImage(undefined);
          queryClient.invalidateQueries(["drivers"]);
          completed && completed();
        }
      },
      onError: (error: any) => {
        console.log({ error });

        toast.error(`Something went wrong!`);
      },
    }
  );

  const onAddDriver = async (e: any) => {
    if (!name || !empId || !phone) {
      toast.error("EMP ID, Name and phone is required!");
      return;
    }

    const data = {
      name,
      empId,
      phone,
      profile: profileImage,
      departMentId: department === "null" ? undefined : department,
    };

    // console.log({ data });

    await mutateAsync(data);
  };

  return (
    <BoxContainer classNames="col-span-4">
      <div className="flex flex-col gap-y-6">
        <Fragment>
          <PageTitleBar title={title} />
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="empId">EMP ID</label>
                <PlainInputText
                  placeholder={"eg. EMP101"}
                  type={"text"}
                  classNames={""}
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="driverName">Name</label>
                <PlainInputText
                  placeholder={"eg. Hkr"}
                  type={"text"}
                  classNames={""}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="driverName">Phone</label>
              <PlainInputText
                placeholder={"eg. 95########"}
                type={"text"}
                classNames={""}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="driverName">Department</label>

              <SelectInput
                classNames=""
                value={department}
                options={departMents}
                name="department"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="driverImg">Profile (optional)</label>
              <SingleFileUpload file={profileImage} setFile={setProfileImage} />
            </div>
          </div>
          <Button onClick={onAddDriver} loading={isLoading} title={"Submit"} />
        </Fragment>
      </div>
    </BoxContainer>
  );
};

export default AddDriver;
