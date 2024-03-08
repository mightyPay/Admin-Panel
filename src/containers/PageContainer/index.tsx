import React from "react";

const PageContainer = ({
  PageHeader,
  children,
}: {
  PageHeader: JSX.Element;
  children: JSX.Element;
}) => {
  return (
    <div
      className="grid gap-y-8 h-full"
      style={{ gridTemplateRows: "max-content auto" }}
    >
      {PageHeader}
      {children}
    </div>
  );
};

export default PageContainer;
