import React from "react";
import clsxm from "../../utils/clsxm";

type Props = {
  placeholder: string;
  classNames: string;
  value: string | undefined;
  onChange: (e: any) => void;
  name?: string;
  id?: string;
  inputClassNames?: string;
  compRef?: React.RefObject<HTMLTextAreaElement>;
  rows?: number;
  required?: boolean;
};

const TextArea = ({
  placeholder,
  classNames,
  inputClassNames,
  value,
  onChange,
  name,
  id,
  compRef,
  rows,
  required,
}: Props) => {
  return (
    <div
      className={clsxm(
        `bg-[#f1f3f8] px-3 py-4 rounded-md border border-gray-300 focus-within:border-rose-500 hover:border-rose-500 shadow-none`,
        classNames
      )}
    >
      <textarea
        ref={compRef}
        value={value}
        name={name}
        className={clsxm(
          "w-full bg-transparent outline-none border-none focus:ring-0 focus:border-none focus-within:outline-none",
          inputClassNames
        )}
        id={id}
        rows={rows || 5}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;
