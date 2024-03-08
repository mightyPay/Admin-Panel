import React, { useEffect, useState } from "react";
import { IAppUserActiveToggleControl } from "../type";
import Toggle from "react-toggle";
import Modal from "../../components/Modal";
import { IShowSlide } from "../../components/type";
import { Button } from "../../components";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { AppUserService } from "../../api";
import { CgSpinner } from "react-icons/cg";
import { TiInputChecked } from "react-icons/ti";

const AppUserActiveToggleControl = ({
  row,
  id,
}: IAppUserActiveToggleControl) => {
  // important variables
  const queryClient = useQueryClient();

  // component state hooks
  const [isActive, setIsActive] = useState<boolean>(row.isActive || false);
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
          if (!isActive) toast.success(`${data.profile.name} is activated`);
          else toast.success(`${data.profile.name} is deactivated`);
          // reset all the state
          setIsActive(!isActive);
          onClose();

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

  // utility functions
  const onClose = () =>
    setPanelState({ isShow: false, title: undefined, type: undefined });

  const onAction = async () => {
    if (!row) {
      toast.error("Something went wrong please reload this page!");
      return;
    }

    // payload
    const data = {
      id: row.id,
      isActive: !isActive,
    };

    // mutate
    await mutateAsync(data);
  };

  const onActive = async () => {
    if (!row) {
      toast.error(`Something went wrong`);
      return;
    }

    // payload
    const data = {
      id: row.id,
      isActive: true,
    };

    await mutateAsync(data);
  };

  // row update listener
  useEffect(() => {
    if (row) {
      setIsActive(row.isActive);
    }
  }, [row]);

  // logs

  return (
    <div className="w-full h-full">
      {/* Action generator */}
      <div className="w-full h-full flex items-center">
        <Toggle
          checked={isActive}
          className="app-user-toggle"
          icons={{
            checked: null,
            unchecked: null,
          }}
          // aria-label='No label tag'
          onChange={() => setPanelState({ ...panelState, isShow: true })}
        />
      </div>

      {/* Modal */}
      <Modal onClose={onClose} state={panelState} width="w-1/3">
        <div className="w-96 flex flex-col gap-y-2 justify-center items-center p-8">
          {/* Icon */}
          {isActive ? (
            <AiOutlineDelete className="text-8xl text-red-500" />
          ) : (
            <TiInputChecked className="text-8xl text-green-500" />
          )}
          <h1 className="text-black text-2xl font-semibold">
            {isActive ? "Are you sure?" : "Activate a user"}
          </h1>
          {isActive && <p>Do you really want to deactivate this user?</p>}
          <div className="flex gap-x-4 items-center justify-center mt-4">
            <span
              onClick={onClose}
              className="py-2 px-6 rounded-full border-2 border-gray-300 text-gray-500 hover:bg-gray-100 hover:shadow-xl cursor-pointer"
            >
              Cancel
            </span>
            <span
              onClick={onAction}
              className={`relative py-2 px-6 min-h-[40px] min-w-[116px] rounded-full border-2 text-white hover:shadow-xl ${
                isActive
                  ? "border-red-500 bg-red-500 hover:bg-red-700 hover:border-red-700 cursor-pointer"
                  : "border-green-500 bg-green-500 hover:bg-green-700 hover:border-green-700 cursor-pointer"
              }`}
            >
              {!isLoading && (isActive ? "Deactivate" : "Activate")}
              {isLoading && (
                <div className="absolute flex items-center justify-center h-full w-full top-0 left-0">
                  <CgSpinner className={`animate-spin text-3xl text-white`} />
                </div>
              )}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppUserActiveToggleControl;
