import React, { Fragment, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { AppUserService } from "../../api";
import { Button, PageTitleBar, PlainInputText } from "../../components";
import { RightSideFormContainer } from "../../containers";
import { IAddAppUser } from "../type";

const AddAppUser = ({ completed, title }: IAddAppUser) => {
  // important variables
  const queryClient = useQueryClient();

  // state hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  // mutations
  const { isLoading, mutateAsync } = useMutation(
    "addAppUser",
    AppUserService.addUser,
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
          toast.success(`is created`);
          // reset all the state

          setEmail("");
          setPassword("");
          setPhone("");

          // refetch app users
          queryClient.invalidateQueries(["appUsers"]);

          // close slide
          completed && completed();
        }
      },
      onError: (error: Error) => {
        console.log({ error });
        toast.error(`Something went wrong!`);
      },
    }
  );

  // utility functions
  const onAddAppUser = async () => {
    // validation
    if (!email || !phone || !password) {
      toast.error("Email, Phone and Password is required");
      return;
    }

    // prepare api payload
    const data = {
      email,
      phone,
      password,
    };

    // call api
    await mutateAsync(data);
  };

  // component render
  return (
    <RightSideFormContainer>
      <Fragment>
        {/* Header */}
        <PageTitleBar title={title} />

        {/* Input Fields */}
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
        {/* password field */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password">Password</label>
          <PlainInputText
            id="password"
            placeholder="Password"
            type="password"
            classNames=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <Button onClick={onAddAppUser} loading={isLoading} title={"Submit"} />
      </Fragment>
    </RightSideFormContainer>
  );
};

export default AddAppUser;
