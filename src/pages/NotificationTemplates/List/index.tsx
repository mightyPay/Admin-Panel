import { useState } from "react";
import { useQuery } from "react-query";
import { SecondaryTable } from "../../../components";
import { IEditControlSlide } from "../../../components/type";
import { BoxContainer, PageContainer } from "../../../containers";
import { PageHeader } from "../../../pageComponents";
import RewardRuleService from "../../../api/reward";
import { TemplateListHeader } from "./data";
import NotificationService from "../../../api/notification";

const TemplateList = () => {
  const [rewardRules, setRewardRules] = useState<any[] | undefined>(undefined);
  const [activeRow, setActiveRow] = useState<number | undefined>(undefined);
  const [searchBy, setSearchBy] = useState<any>(undefined);
  const [editPanelState, setEditPanelState] = useState<IEditControlSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
    row: undefined,
  });
  const [metaData, setMetaData] = useState<{
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  }>({ page: 1, limit: 10, totalPages: 0, count: 0 });
  const { isLoading } = useQuery(
    ["template-list", metaData?.page],
    async () =>
      NotificationService.getMessageTemplate(
        metaData?.limit,
        metaData?.page - 1,
        true
      ),
    {
      onSuccess: (response: any) => {
        if (response.data.status === "success") {
          const { data } = response.data;
          const { messageTemplates, metadata } = data || {};
          setRewardRules(messageTemplates);
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
                List
              </h2>
            </div>

            <div>
              <SecondaryTable
                header={TemplateListHeader || []}
                data={rewardRules || []}
                loading={isLoading}
                activeRow={activeRow}
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

export default TemplateList;
