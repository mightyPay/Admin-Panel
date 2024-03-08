import { Fragment, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { AppUserService, UserService } from "../../../api";
import { IStartDuty, IStopDuty } from "../../../api/interfaces";
import {
  PlainInputText,
  RightSlideV1,
  SecondaryTable,
  TabsV1,
} from "../../../components";
import Table from "../../../components/Table";
import { IEditControlSlide } from "../../../components/type";
import { BoxContainer, PageContainer } from "../../../containers";
import { EditDriverControl } from "../../../controllers";
import { useAuth } from "../../../hooks";
import useDriverPage from "../../../hooks/useDriverPage";
import { PageHeader } from "../../../pageComponents";
import { usersTableHeads, usersTableHeads2 } from "../../data";
import profileImage from "../../assets/profile.jpeg";
import { Link } from "react-router-dom";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { BiPointer } from "react-icons/bi";
import { BsCheckLg, BsDot } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { GrInProgress } from "react-icons/gr";
import {
  PaymentSource,
  TransactionStatus,
  TransactionType,
} from "../../../utils/enums";
import { humanizeDateFormate } from "../../../utils/dates";
import clsxm from "../../../utils/clsxm";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { debounce } from "../../../utils/optimize";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import Avatar from "../../../assets/avatar.png";
import { onImageError } from "../../../utils/functions";
import { CampaignTableHeader } from "./data";

import CampaignService from "../../../api/campaign";

const CampaignList = () => {
  const [rewardRules, setRewardRules] = useState<any[] | undefined>(undefined);
  const [showUser, setShowUser] = useState<boolean>(false);
  const [currRow, setCurrRow] = useState<any>({});
  const [activeRow, setActiveRow] = useState<number | undefined>(undefined);
  const [searchBy, setSearchBy] = useState<any>(undefined);
  const [editPanelState, setEditPanelState] = useState<IEditControlSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
    row: undefined,
  });
  const { user } = useAuth();
  const { startDuty, endDuty } = useDriverPage();
  const [metaData, setMetaData] = useState<{
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  }>({ page: 1, limit: 10, totalPages: 0, count: 0 });
  const { isLoading } = useQuery(
    ["reward-rules", metaData?.page],
    async () =>
      CampaignService.getCampaigns(metaData?.limit, metaData?.page - 1),
    {
      onSuccess: (response: any) => {
        if (response.data.status === "success") {
          const { data } = response.data;
          const { campaign, metadata } = data || {};
          setRewardRules(campaign);
          if (metadata && metadata.count) {
            setMetaData({ ...metaData, count: metadata.count });
          }
        }
      },
      enabled: !!(metaData?.limit && metaData?.page),
    }
  );

  const paginationConf =
    metaData?.count > metaData?.limit
      ? {
          totalItems: metaData?.count,
          itemsPerPage: metaData?.limit,
          onPageChange: (page: number) =>
            setMetaData((prev: any) => {
              return { ...prev, page };
            }),
        }
      : undefined;

  return (
    <PageContainer PageHeader={<PageHeader />}>
      <div className="grid grid-cols-12 w-full gap-x-6">
        <BoxContainer classNames="col-span-12 shadow-md">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium border-l-4 border-rose-800 pl-4">
                Campaign List
              </h2>
            </div>

            <div>
              <SecondaryTable
                header={CampaignTableHeader || []}
                data={rewardRules || []}
                loading={isLoading}
                activeRow={activeRow}
                // setActiveRow={(row: number) => {
                //   setActiveRow(row);
                //   setShowUser(true);
                // }}
                pagination={paginationConf}
                onSearchChange={setSearchBy}
              />
            </div>
          </div>
        </BoxContainer>
      </div>
    </PageContainer>
  );
};

export default CampaignList;
