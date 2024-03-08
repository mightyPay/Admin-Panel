import React, { Fragment, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { DriverService } from "../../api";
import {
  RightSlide,
  PageTitleBar,
  PlainInputText,
  Button,
} from "../../components";
import { IShowSlide } from "../../components/type";
import { RightSideFormContainer } from "../../containers";
import { IEditDriverControl } from "../type";

const EditDriverControl = ({ row, id }: IEditDriverControl) => {
  // important variables
  const queryClient = useQueryClient();

  // state hooks
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const [empId, setEmpId] = useState<string>(row?.empId || "");
  const [name, setName] = useState<string>(row?.name || "");
  const [phone, setPhone] = useState<string>(row?.phone || "");
  const [panelState, setPanelState] = useState<IShowSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
  });

  // mutations
  const { isLoading, mutateAsync } = useMutation(
    "updateDriver",
    DriverService.updateDriver,
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
          toast.success(`${name} is updated`);
          // reset all the state
          setName("");
          setEmpId("");
          setPhone("");
          setProfileImage(undefined);

          // refetch app users
          queryClient.invalidateQueries(["appUsers"]);
        }
      },
      onError: (error: Error) => {
        console.log({ error });
        toast.error("Something went wrong!lo");
      },
    }
  );

  // utility functions
  const onClose = () =>
    setPanelState({ isShow: false, title: undefined, type: undefined });

  const onUpdate = async () => {
    // validate all input fields
    if (!empId || !name || !phone) {
      toast.error("EmpId, Name and Phone is required");
      return;
    }

    // check user make any changes for update
    if (name === row.name && phone === row.phone && empId === row.empId) {
      onClose();
      return;
    }

    // prepare payload for update driver api
    const data = {
      id: row.id,
      empId,
      name,
      phone,
      file: profileImage,
    };

    await mutateAsync(data);
  };

  // listener if row change
  useEffect(() => {
    if (row) {
      setName(row.name || "");
      setPhone(row.phone || "");
      setEmpId(row.empId || "");
    }
  }, [row]);

  return (
    <div>
      {/* Icon */}
      <div
        onClick={() => setPanelState({ ...panelState, isShow: true })}
        className="bg-blue-800 bg-opacity-20 p-3 rounded-md cursor-pointer"
      >
        <MdEdit className="text-xl text-blue-800" />
      </div>

      {/* Right slide */}
      <RightSlide onClose={onClose} state={panelState} width="w-1/3">
        <RightSideFormContainer>
          <Fragment>
            {/* Title */}
            <PageTitleBar title={"Edit User"} />

            {/* Input Fields */}
            {/* email field */}
            <div className="flex flex-col gap-y-2">
              <label htmlFor="EmpID">EmpID</label>
              <PlainInputText
                id="EmpID"
                placeholder="EmpID"
                type="text"
                classNames=""
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
            </div>
            {/* email field */}
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name">Name</label>
              <PlainInputText
                id="name"
                placeholder="Name"
                type="text"
                classNames=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* phone field */}
            <div className="flex flex-col gap-y-2">
              <label htmlFor="phone">Phone</label>
              <PlainInputText
                id="phone"
                placeholder="Phone"
                type="text"
                classNames=""
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <Button onClick={onUpdate} loading={isLoading} title={"Submit"} />
          </Fragment>
        </RightSideFormContainer>
      </RightSlide>
    </div>
  );
};

export default EditDriverControl;
