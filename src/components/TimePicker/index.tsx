import React from "react";
import { Calendar } from "primereact/calendar";
import { ITimePicker } from "../type";

const TimePicker = ({ value, setValue, ...props }: ITimePicker) => {
  return (
    <Calendar
      value={value}
      onChange={(e: any) => setValue(e.value as Date)}
      timeOnly
      hourFormat="12"
      inputClassName="bg-[#f1f3f8] px-3 py-4 rounded-md"
      {...props}
    />
  );
};

export default TimePicker;
