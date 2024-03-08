import React, { useState } from "react";
import { DatePicker } from "../../HeaderTools";
import { getCurrDate } from "../../utils/functions";
import { IHistoryHeaderTools } from "../type";

const HistoryHeaderTools = ({ datePicker }: IHistoryHeaderTools) => {
  return (
    <div className="flex items-center justify-center gap-x-4">
      {datePicker && (
        <DatePicker value={datePicker.value} onChange={datePicker.onChange} />
      )}
    </div>
  );
};

export default HistoryHeaderTools;
