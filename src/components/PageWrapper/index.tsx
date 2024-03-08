import React, { useEffect, useState } from "react";
import { PageContainer } from "../../containers";
import { PageHeader } from "../../pageComponents";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const PageWrapper = (props: any) => {
  const { menus } = props;
  const locations = useLocation();
  const navigate = useNavigate();
  const [indexRoute, setIndexRoute] = useState<any>(undefined);

  useEffect(() => {
    if (menus.length) {
      const indexRoute = menus.find((menu: any) => menu.index);
      if (indexRoute) {
        setIndexRoute(indexRoute);
        navigate(indexRoute.url);
      }
    }
  }, [menus]);

  return (
    <PageContainer PageHeader={<PageHeader menus={menus} />}>
      <Outlet />
    </PageContainer>
  );
};

export default PageWrapper;
