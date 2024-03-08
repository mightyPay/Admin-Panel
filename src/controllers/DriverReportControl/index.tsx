import React, { Fragment, useEffect, useState } from "react";
import { IDriverReportControl } from "../type";
import { VscGraph } from "react-icons/vsc";
import { IShowSlide } from "../../components/type";
import {
  RightSlide,
  PageTitleBar,
  AttendanceSheet,
  Button,
  TimePicker,
} from "../../components";
import { RightSideFormContainer } from "../../containers";
import { useQuery, useQueryClient } from "react-query";
import { driverImageUrl } from "../../environment";
import { onImageError } from "../../utils/functions";
import ReactTooltip from "react-tooltip";
import { DriverDutyControl } from "..";
import {
  add,
  endOfMonth,
  format,
  parse,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import useDriverPage from "../../hooks/useDriverPage";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { IStartDuty } from "../../api/interfaces";
import { PerkService } from "../../api";
import { MultiSelect } from "primereact/multiselect";
import { IUpdateDuty } from "../../api/driver";

const DriverReportControl = ({ row }: IDriverReportControl) => {
  // react query client
  const queryClient = useQueryClient();

  // state hooks
  const { updateDuty, updated, startDuty, started } = useDriverPage();
  const [panelState, setPanelState] = useState<IShowSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
  });
  const [modalState, setModalState] = useState<IShowSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
  });

  const [driverId, setDriverId] = useState<string>(row?.id || "");
  let today = startOfToday();
  const [currentDuty, setCurrentDuty] = useState<any>(undefined);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM, yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM, yyyy", new Date());
  let lastDayCurrentMonth = endOfMonth(firstDayCurrentMonth);
  let startOfMonthDay = startOfMonth(
    parse(currentMonth, "MMM, yyyy", new Date())
  );
  const [report, setReport] = useState<any>({});

  // queries
  const getAttendanceQuery = useQuery(["getAttendance"]);

  // utility methods
  const onClose = () =>
    setPanelState({ isShow: false, title: undefined, type: undefined });

  const onModalClose = () => {
    setPanelState({ isShow: true, title: undefined, type: undefined });
    setModalState({ isShow: false, title: undefined, type: undefined });
  };

  const previousMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM, yyyy"));
    queryClient.invalidateQueries(["getAttendance"]);
  };

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM, yyyy"));
    queryClient.invalidateQueries(["getAttendance"]);
  };

  const offDayClick = (date: any) => {
    setPanelState({ ...panelState, isShow: false });
    setModalState({ ...modalState, isShow: true, type: "start" });
    console.log("Off Day Clicked", date);
  };

  const onDayClick = (date: any, duty: any) => {
    setPanelState({ ...panelState, isShow: false });
    setModalState({ ...modalState, isShow: true, type: "update" });
    setCurrentDuty(duty);
  };

  // listener if row change
  useEffect(() => {
    if (row) {
      setDriverId(row.id || "");
    }
  }, [row]);

  return (
    <div>
      {/* Icon */}
      <div
        onClick={() => setPanelState({ ...panelState, isShow: true })}
        className="bg-blue-800 cursor-pointer text-blue-800 bg-opacity-20 p-3 rounded-md max-w-max flex items-center gap-x-2"
      >
        <VscGraph className="text-xl" />
        <span>Attendance</span>
      </div>

      {/* Right slide */}
      <RightSlide onClose={onClose} state={panelState} width="w-3/4">
        <RightSideFormContainer>
          <Fragment>
            {/* Title */}
            <PageTitleBar title={`${row.empId} - ${row.name}`} />

            {/* Employee Report */}
            <div className="flex flex-col gap-y-4">
              {/* Top Bar */}
              <div className="flex gap-x-6 p-4 justify-between">
                <div className="flex items-center gap-x-6 w-full">
                  {/* Profile */}
                  <div className="gap-y-2 rounded-md flex flex-col justify-center max-w-max bg-opacity-20">
                    {/* Image container */}
                    <div className="w-28 h-28 rounded-md overflow-hidden flex items-center justify-center">
                      <img
                        src=""
                        // src={`${driverImageUrl + row?.profile}`}
                        onError={onImageError}
                        className="h-full w-28"
                      />
                    </div>

                    {/* Name */}
                    {/* <span className="">
                    <h1 className="text-base text-black font-semibold">
                      {row?.empId}
                    </h1>
                    <p>{row?.name}</p>
                  </span> */}
                  </div>
                  {/* Total Work */}
                  <div className="w-full grid grid-cols-3 gap-x-4">
                    <div className="whitespace-normal flex flex-col gap-y-3 h-full justify-center">
                      <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-black">
                          {report?.duties?.data?.length || 0} Days
                        </h1>
                        <p className="text-sm">Present</p>
                      </div>
                      {/* current duty */}
                      <div className="flex gap-x-6 items-center"></div>
                    </div>
                    <div className="whitespace-normal flex flex-col gap-y-3 h-full justify-center">
                      <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-black">
                          {report?.fullDuties?.data?.length || 0} Days
                        </h1>
                        <p className="text-sm">full duty</p>
                      </div>
                      {/* current duty */}
                      <div className="flex gap-x-6 items-center"></div>
                    </div>
                    <div className="whitespace-normal flex flex-col gap-y-3 h-full justify-center">
                      <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-black">
                          {report?.halfDuties?.data?.length || 0} Days
                        </h1>
                        <p className="text-sm">half duty</p>
                      </div>
                      {/* current duty */}
                      <div className="flex gap-x-6 items-center"></div>
                    </div>
                    <div className="whitespace-normal flex flex-col gap-y-3 h-full justify-center">
                      <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-black">
                          {report?.incompleteDuties?.data?.length || 0} Days
                        </h1>
                        <p className="text-sm">In-Complete duty</p>
                      </div>
                      {/* current duty */}
                      <div className="flex gap-x-6 items-center"></div>
                    </div>
                    <div className="whitespace-normal flex flex-col gap-y-3 h-full justify-center">
                      <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-black">
                          {report?.updatedDuties?.data?.length || 0} Days
                        </h1>
                        <p className="text-sm">Updated duty</p>
                      </div>
                      {/* current duty */}
                      <div className="flex gap-x-6 items-center"></div>
                    </div>
                  </div>
                </div>
                {/* Date Handler */}
                <div className="flex justify-end items-end">
                  <div className="flex flex-col">
                    {/* next and month button */}
                    <div className="flex justify-end items-center gap-x-3 w-full">
                      <a
                        data-tip="Prev"
                        data-for={`prev`}
                        onClick={previousMonth}
                      >
                        <GrCaretPrevious className="text-blue-900 text-2xl cursor-pointer" />
                      </a>
                      <a data-tip="Next" data-for={`next`} onClick={nextMonth}>
                        <GrCaretNext className="text-blue-900 text-2xl cursor-pointer" />
                      </a>
                    </div>
                    {/* month */}
                    <button className="bg-opacity-20 py-2 p2-8 rounded-md text-black text-2xl font-bold">
                      {currentMonth}
                    </button>
                  </div>
                  <ReactTooltip id="next" />
                  <ReactTooltip id="prev" />
                </div>
              </div>
              {/* Attendance Sheet */}
              <div className="p-4">
                {panelState.isShow && (
                  <AttendanceSheet
                    row={row}
                    today={today}
                    startOfMonthDay={startOfMonthDay}
                    lastDayCurrentMonth={lastDayCurrentMonth}
                    firstDayCurrentMonth={startOfMonthDay}
                    currentMonth={currentMonth}
                    setReport={setReport}
                    updateDuty={onDayClick}
                    startDuty={offDayClick}
                  />
                )}
              </div>
            </div>
          </Fragment>
        </RightSideFormContainer>
      </RightSlide>

      {/* ======================= Update Duty ========================== */}
      <Modal onClose={onModalClose} state={modalState} width="w-1/3">
        {modalState.type === "update" ? (
          <UpdateDuty duty={currentDuty} onClose={onModalClose} />
        ) : (
          <StartDuty id={""} date={new Date()} />
        )}
      </Modal>
    </div>
  );
};

export default DriverReportControl;

const StartDuty = ({ id, date }: { id: string; date: any }) => {
  const [time, setTime] = useState<Date | undefined>(new Date(date));

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

const UpdateDuty = ({ duty, onClose }: { duty: any; onClose: () => void }) => {
  const { updateDuty, updated } = useDriverPage();
  const [startTime, setStartTime] = useState<Date | undefined>(
    new Date(duty.start)
  );
  const [endTime, setEndTime] = useState<Date | undefined>(new Date(duty.end));
  const [perks, setPerks] = useState<any[] | undefined>(undefined);
  const [selectedPerks, setSelectedPerks] = useState<any[] | undefined>(
    undefined
  );

  const perksDataApi = useQuery(
    "perksData",
    async () => await PerkService.getPerks(),
    {
      onSuccess: (response: any) => {
        if (response.data.length) setPerks(response.data);
        else setPerks(undefined);
      },
      onError: (response: any) => {},
    }
  );

  const onUpdate = async () => {
    let perks = selectedPerks?.map((p: any) => p.id);
    const data: IUpdateDuty = {
      id: duty.id as number,
      updateData: {
        start: startTime,
        end: endTime,
        perks: perks,
      },
    };

    await updateDuty.mutateAsync(data);
    onClose();
  };

  return (
    <div className="w-[500px] grid grid-cols-1 divide-y">
      <div className="px-4 py-3 text-black">
        <PageTitleBar title="Duty Update" />
      </div>
      <div className="px-4 py-3 flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="Timing">Start Timing</label>

          <TimePicker
            value={startTime}
            setValue={(value) => setStartTime(value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="Timing">End Timing</label>

          <TimePicker value={endTime} setValue={(value) => setEndTime(value)} />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="Timing">Select Perks</label>

          <MultiSelect
            value={selectedPerks}
            options={perks}
            onChange={(e) => setSelectedPerks(e.value)}
            optionLabel="name"
            placeholder="Select perks"
            display="chip"
          />
        </div>
        <div className="mt-4">
          <Button
            title={"Update"}
            loading={updateDuty.isLoading}
            onClick={() => onUpdate()}
          />
        </div>
      </div>
    </div>
  );
};
