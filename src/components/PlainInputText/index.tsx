import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import clsxm from "../../utils/clsxm";

type Props = {
  placeholder: string;
  type: string;
  classNames: string;
  value: string | undefined;
  onChange: (e: any) => void;
  name?: string;
  id?: string;
  inputClassNames?: string;
  compRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  showPassword?: boolean;
};

const PlainInputText = ({
  placeholder,
  type,
  classNames,
  inputClassNames,
  value,
  onChange,
  name,
  id,
  compRef,
  required,
  showPassword,
}: Props) => {
  const [valueType, setValueType] = useState<string>(
    type === "phone" ? "text" : showPassword ? "text" : type
  );

  return (
    <div
      className={clsxm(
        `bg-[#f1f3f8] px-3 py-4 rounded-md border border-gray-300 focus-within:border-rose-500 hover:border-rose-500 shadow-none relative`,
        classNames
      )}
    >
      <input
        ref={compRef}
        type={valueType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={clsxm(
          "w-full bg-transparent outline-none border-none focus:ring-0 focus:border-none focus-within:outline-none",
          inputClassNames
        )}
        id={id}
        required={required}
        maxLength={type === "phone" ? 10 : undefined}
      />

      {type === "password" ? (
        valueType === "password" ? (
          <BsEyeFill
            size={22}
            onClick={() => setValueType("text")}
            className="absolute right-3 top-1/4 cursor-pointer text-gray-600"
          />
        ) : (
          <BsEyeSlashFill
            size={22}
            onClick={() => setValueType(type)}
            className="absolute right-3 top-1/4 cursor-pointer text-gray-600"
          />
        )
      ) : null}
    </div>
  );
};

export default PlainInputText;
