import React, { useState } from "react";
import { AiOutlineDelete, AiTwotoneDelete } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { allService } from "../../api";
import Modal from "../../components/Modal";
import { IShowSlide } from "../../components/type";
import { IIDeleteControl } from "../type";

const DeleteControl = ({ row, id, service }: IIDeleteControl) => {
  // important variables
  const queryClient = useQueryClient();

  // state hooks
  const [panelState, setPanelState] = useState<IShowSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
  });

  // mutations ----------------------------------------------
  const { isLoading, mutate } = useMutation(
    [`delete-${service}`],
    allService[service].delete,
    {
      onSuccess: (res: any) => {
        toast.success("Delete Successfully!");
        queryClient.invalidateQueries();
      },
      onError: (error: Error) => {
        toast.error("Something went wrong please refresh this page");
      },
    }
  );

  // utility functions
  const onClose = () =>
    setPanelState({ isShow: false, title: undefined, type: undefined });

  const onDelete = () => {
    if (!row) {
      toast.error("Something went wrong please reload this page!");
      return;
    }
    // @ts-ignore
    mutate(id);
  };

  return (
    <div>
      {/* Icon */}
      <div
        onClick={() => setPanelState({ ...panelState, isShow: true })}
        className="bg-red-500 bg-opacity-20 p-3 rounded-md cursor-pointer"
      >
        <AiTwotoneDelete className="text-xl text-red-500" />
      </div>

      {/* Modal */}
      {/* Modal */}
      <Modal onClose={onClose} state={panelState} width="w-1/3">
        <div className="w-96 flex flex-col gap-y-2 justify-center items-center p-8">
          {/* Icon */}

          <AiOutlineDelete className="text-8xl text-red-500" />

          <h1 className="text-black text-2xl font-semibold">Are you sure?</h1>
          <p>Do you really want to delete?</p>
          <div className="flex gap-x-4 items-center justify-center mt-4">
            <span
              onClick={onClose}
              className="py-2 px-6 rounded-full border-2 border-gray-300 text-gray-500 hover:bg-gray-100 hover:shadow-xl cursor-pointer flex items-center justify-center"
            >
              Cancel
            </span>
            <span
              onClick={onDelete}
              className={`relative py-2 px-6 min-h-[40px] min-w-[116px] rounded-full border-2 text-white hover:shadow-xl border-red-500 bg-red-500 hover:bg-red-700 hover:border-red-700 cursor-pointer flex items-center justify-center`}
            >
              {isLoading && (
                <CgSpinner className={`animate-spin text-xl text-white mr-2`} />
              )}
              <span>{isLoading ? "Loading..." : "Delete"}</span>
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteControl;
