import QRCode from "qrcode.react";
import React, { Fragment, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { AppUserService } from "../../api";
import {
  Button,
  PageTitleBar,
  PlainInputText,
  RightSlide,
} from "../../components";
import { IShowSlide } from "../../components/type";
import { BoxContainer, RightSideFormContainer } from "../../containers";
import { IEditControl } from "../type";

const EditAppUserControl = ({ row, id, completed }: IEditControl) => {
  // important variables
  const queryClient = useQueryClient();

  // state hooks
  const [email, setEmail] = useState<string>(row?.email || "");
  const [password, setPassword] = useState<string>(row?.password || "");
  const [phone, setPhone] = useState<string>(row?.phone || "");
  const [name, setName] = useState<string>(row?.profile?.name || "");
  const [panelState, setPanelState] = useState<IShowSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
  });

  // mutations
  const { isLoading, mutateAsync } = useMutation(
    "updateAppUser",
    AppUserService.updateUser,
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
          setEmail("");
          setPassword("");
          setPhone("");
          setName("");

          // refetch app users
          queryClient.invalidateQueries(["appUsers"]);

          // close slide
          onClose();
        }
      },
      onError: (error: Error) => {
        console.log({ error });
        toast.error(`Something went wrong!`);
      },
    }
  );

  // utility methods
  const onClose = () =>
    setPanelState({ isShow: false, title: undefined, type: undefined });

  const onUserUpdate = async () => {
    // validate all values
    if (!name || !email || !phone) {
      toast.error("Name, Email and Phone is required");
      return;
    }

    // check user make any change for update
    if (
      name === row.profile.name &&
      email === row.email &&
      phone === row.phone
    ) {
      onClose();
      return;
    }

    // prepare payload for update user
    const data = {
      id: row.id,
      email,
      name,
      phone,
    };

    await mutateAsync(data);
  };

  // listener if row change
  useEffect(() => {
    if (row) {
      setName(row.profile.name || "");
      setPhone(row.phone || "");
      setEmail(row.email || "");
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
            {/* email field */}
            <div className="flex flex-col gap-y-2">
              <label htmlFor="email">User email</label>
              <PlainInputText
                id="email"
                placeholder="email"
                type="text"
                classNames=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Button
              onClick={onUserUpdate}
              loading={isLoading}
              title={"Submit"}
            />
          </Fragment>
        </RightSideFormContainer>
      </RightSlide>
    </div>
  );
};

export default EditAppUserControl;
