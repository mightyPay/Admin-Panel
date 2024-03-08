import { useEffect, useState } from "react";
import { IAppUserActiveToggleControl } from "../type";
import Modal from "../../components/Modal";
import { IShowSlide } from "../../components/type";
import { Button, PageTitleBar } from "../../components";
import { useQueryClient } from "react-query";
import { TimePicker } from "../../components";
import useDriverPage from "../../hooks/useDriverPage";
import { IStartDuty, IStopDuty } from "../../api/interfaces";
import { toast } from "react-toastify";

const DutyOnOrOffControl = ({ row, id }: IAppUserActiveToggleControl) => {
  // important variables
  const queryClient = useQueryClient();

  // external hooks
  const { startDuty, endDuty, started, ended, setStarted, setEnded } =
    useDriverPage();

  // component state hooks
  const [panelState, setPanelState] = useState<IShowSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
  });

  // mutations

  // utility methods

  // utility functions
  const onClose = () =>
    setPanelState({ isShow: false, title: undefined, type: undefined });

  // row update listener
  useEffect(() => {
    setPanelState({
      isShow: false,
      title: undefined,
      type: undefined,
    });
  }, [row]);

  return (
    <div className="w-full h-full">
      {/* Action generator */}
      <div className="w-full h-full flex items-center">
        {row.duties.length > 0 ? (
          <span
            onClick={() =>
              setPanelState({ ...panelState, isShow: true, type: "dutyEnd" })
            }
            className="bg-green-400 rounded-md p-2 text-white font-semibold cursor-pointer"
          >
            StopDuty
          </span>
        ) : (
          <span
            onClick={() =>
              setPanelState({ ...panelState, isShow: true, type: "startDuty" })
            }
            className="bg-yellow-400 rounded-md p-2 text-white font-semibold cursor-pointer"
          >
            StartDuty
          </span>
        )}
      </div>

      {/* Modal */}
      <Modal onClose={onClose} state={panelState} width="w-1/3">
        {panelState.type === "startDuty" ? (
          <StartDuty id={row.id} />
        ) : (
          <DutyEnd id={row.id} />
        )}
      </Modal>
    </div>
  );
};

export default DutyOnOrOffControl;

const StartDuty = ({ id }: { id: string }) => {
  const [time, setTime] = useState<Date | undefined>(new Date());

  // external hooks
  const { startDuty, endDuty, started, setEnded, setStarted, ended } =
    useDriverPage();

  const onClick = (e: any) => {
    e.preventDefault();

    if (!time) {
      toast.error("start time is missing!");
    }

    let data: IStartDuty = {
      driverId: id,
      start: time?.toISOString() as unknown as Date,
      lat: "1111",
      lng: "2222",
    };

    startDuty.mutate(data);
  };

  return (
    <div className="w-96 grid grid-cols-1 divide-y">
      <div className="px-4 py-3 text-black">
        <PageTitleBar title="Duty Start" />
      </div>
      <div className="px-4 py-3 flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="Timing">Start Timing</label>
          {/* <PlainInputText
            id="Timing"
            placeholder=""
            type="text"
            classNames=""
            value={""}
            onChange={(e) => {}}
          /> */}
          <TimePicker value={time} setValue={(value) => setTime(value)} />
        </div>
        <div>
          <Button
            title={"Start"}
            loading={startDuty.isLoading}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

const DutyEnd = ({ id }: { id: string }) => {
  const [time, setTime] = useState<Date | undefined>(new Date());

  // external hooks
  const { startDuty, endDuty, started, setEnded, setStarted, ended } =
    useDriverPage();

  const onClick = (e: any) => {
    e.preventDefault();

    if (!time) {
      toast.error("end time is missing!");
    }

    let data: IStopDuty = {
      driverId: id,
      end: time?.toISOString() as unknown as Date,
      lat: "1111",
      lng: "2222",
    };

    endDuty.mutate(data);
  };

  return (
    <div className="w-96 grid grid-cols-1 divide-y">
      <div className="px-4 py-3 text-black">
        <PageTitleBar title="Duty Stop" />
      </div>
      <div className="px-4 py-3 flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="Timing">End Timing</label>
          <TimePicker value={time} setValue={(value) => setTime(value)} />
        </div>
        <div>
          <Button
            title={"Stop"}
            loading={endDuty.isLoading}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};
