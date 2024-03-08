import React from "react";
import clsxm from "../../utils/clsxm";

type Props = {
  classNames: string;
  value: string | undefined;
  onChange: (e: any) => void;
  options: any[] | undefined;
  name: string;
  required?: boolean;
};

const SelectInput = ({
  classNames,
  value,
  onChange,
  options,
  name,
  required,
}: Props) => {
  return (
    <div
      className={clsxm(
        "bg-[#f1f3f8] py-4 rounded-md border border-gray-300 focus-within:border-rose-500 hover:border-rose-500 shadow-none",
        classNames
      )}
    >
      <select
        className="w-full h-full focus:ring-0 focus:border-none focus-within:outline-none"
        style={{
          background: "transparent",
          outline: "none",
          border: "none",
        }}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="null">No Select</option>
        {options?.map((option: any, index: number) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
