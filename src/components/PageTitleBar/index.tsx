import React from "react";

type Props = {
  title: string;
};

const PageTitleBar = ({ title }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4">
        {title}
      </h2>
    </div>
  );
};

export default PageTitleBar;
