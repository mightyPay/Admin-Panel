import { useEffect, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  parseISO,
} from "date-fns";
import { IAttendanceSheet } from "../type";
import { useQuery } from "react-query";
import { PayrollService } from "../../api";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function AttendanceSheet({
  row,
  today,
  startOfMonthDay,
  lastDayCurrentMonth,
  firstDayCurrentMonth,
  currentMonth,
  setReport,
  startDuty,
  updateDuty,
}: IAttendanceSheet) {
  // ----------------------: State Hooks :-----------------------
  let [selectedDay, setSelectedDay] = useState(today);
  let [duties, setDuties] = useState<any[]>([]);

  // ----------------------: React Queries :----------------------------
  const getAttendance = useQuery(
    [
      "getAttendance",
      row?.id,
      startOfMonthDay.toISOString(),
      lastDayCurrentMonth.toISOString(),
    ],
    async () =>
      await PayrollService.getAttendance(
        row?.id,
        startOfMonthDay.toISOString(),
        lastDayCurrentMonth.toISOString()
      ),
    {
      enabled: !!row?.id,
      onSuccess: (response: any) => {
        // console.log({ response });
        if (response.data) {
          let { duties } = response.data || {};
          setDuties(duties.data);
          setReport(response.data);
        }
      },
      onError: (error: Error) => {
        console.error(error);
        toast.error("Something went wrong!");
      },
      refetchOnWindowFocus: false,
    }
  );

  // -------------------------: Utility Functions :------------------------
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  useEffect(() => {
    // if (row) {
    //   getAttendance.refetch();
    // }
    // console.log("Changes => ", currentMonth);
  }, [currentMonth]);

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {/* week row */}
      <div className="grid grid-cols-7 text-left gap-x-2">
        <div className="border-b-2 text-gray-500 font-bold p-2">Sun</div>
        <div className="border-b-2 text-gray-500 font-bold p-2">Mon</div>
        <div className="border-b-2 text-gray-500 font-bold p-2">Tue</div>
        <div className="border-b-2 text-gray-500 font-bold p-2">Wed</div>
        <div className="border-b-2 text-gray-500 font-bold p-2">Thu</div>
        <div className="border-b-2 text-gray-500 font-bold p-2">Fri</div>
        <div className="border-b-2 text-gray-500 font-bold p-2">Sat</div>
      </div>
      {/* day grid */}
      <div className="grid grid-cols-7 gap-x-2 gap-y-2">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={classNames(
              dayIdx === 0 && colStartClasses[getDay(day)],
              "flex items-center justify-center"
            )}
          >
            <BoxCol
              day={day}
              duties={duties}
              startDuty={startDuty}
              updateDuty={updateDuty}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceSheet;

const BoxCol = ({
  day,
  duties,
  startDuty,
  updateDuty,
}: {
  day: any;
  duties: any;
  startDuty: (date: any) => void;
  updateDuty: (date: any, data: any) => void;
}) => {
  const duty = duties.find(
    (duty: any) =>
      isSameDay(parseISO(duty.start), day) || isSameDay(parseISO(duty.end), day)
  );

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <div className="w-full h-full">
      {duty ? (
        <span onClick={() => updateDuty(day, duty)}>
          <a
            data-tip
            data-for={`${+day}`}
            className={classNames(
              "h-full w-full bg-green-300 p-2 text-green-900 flex flex-col justify-between gap-y-4 border-b-4 border-green-600"
            )}
          >
            <time
              dateTime={format(day, "yyyy-MM-dd")}
              className="font-bold text-xl"
            >
              {format(day, "d")}
            </time>
            <div className="font-normal">
              {isSameDay(parseISO(duty.start), day) &&
              isSameDay(parseISO(duty.end), day) ? (
                <div className="flex items-center justify-between">
                  <span>{format(new Date(duty.start), "hh:mm")}</span>
                  <p>to</p>
                  <span>{format(new Date(duty.end), "hh:mm")}</span>
                </div>
              ) : isSameDay(parseISO(duty.start), day) ? (
                <div className="flex items-center justify-between">
                  <span>{format(new Date(duty.start), "hh:mm")}</span>
                  <p>to</p>
                  <HiOutlineArrowSmRight className="text-2xl" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <HiOutlineArrowSmLeft className="text-2xl" />
                  <p>to</p>
                  <span>{format(new Date(duty.end), "hh:mm")}</span>
                </div>
              )}
            </div>
          </a>
          <ReactTooltip id={`${+day}`} aria-haspopup="true" role="example">
            <div className="flex flex-col">
              <span>
                start: {format(new Date(duty.start), "MM/dd/yyyy hh:mm a")}
              </span>

              <span>
                end: {format(new Date(duty.end), "MM/dd/yyyy hh:mm a")}
              </span>
            </div>
          </ReactTooltip>
        </span>
      ) : (
        <div
          onClick={() => startDuty(day)}
          className={classNames(
            "border-b-4 border-red-500 h-full w-full bg-red-300 text-red-900 p-2"
          )}
        >
          <time
            dateTime={format(day, "yyyy-MM-dd")}
            className="text-xl font-bold"
          >
            {format(day, "d")}
          </time>
        </div>
      )}
    </div>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
