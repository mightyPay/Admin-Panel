import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useMutation, useQuery } from "react-query";
import BannerService from "../../../api/banner";
import { SecondaryTable } from "../../../components";
import { IEditControlSlide } from "../../../components/type";
import { PageContainer, BoxContainer } from "../../../containers";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import { ImageCarousel, PageHeader } from "../../../pageComponents";
import clsxm from "../../../utils/clsxm";
import { BannerHeader } from "../data";
import { AiFillSliders } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { useWindowSize } from "react-use";

const initialData = [
  { id: "1", name: "Apple", price: "1.00" },
  { id: "2", name: "Banana", price: "0.50" },
  { id: "3", name: "Cherry", price: "2.00" },
];

function BannerList() {
  const [banners, setBanners] = useState<any[] | undefined>(undefined);
  const [currRow, setCurrRow] = useState<any>(undefined);
  const [activeRow, setActiveRow] = useState<number | undefined>(undefined);
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
    ["users", metaData?.page],
    async () =>
      BannerService.getBanners(metaData?.limit, metaData?.page - 1, true),
    {
      onSuccess: (response: any) => {
        if (response.data.status === "success") {
          const { data } = response.data;
          const { banner, metadata } = data || {};
          setBanners(banner);
          if (banner.length && !activeRow) {
            setActiveRow(0);
          }
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

  const updateBannerImages = (images: any) => {
    const items = Array.from(banners as any[]);
    items[activeRow as number].images = images;
    setBanners(items);
  };

  return (
    <div className="grid gap-y-5">
      <div className="grid grid-cols-12 w-full gap-x-6">
        <BoxContainer classNames="col-span-12 shadow-md">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4">
                Banner List
              </h2>
            </div>

            <div>
              <SecondaryTable
                header={BannerHeader || []}
                data={banners || []}
                loading={isLoading}
                activeRow={activeRow}
                setActiveRow={setActiveRow}
                classNames="h-[300px]"
                pagination={paginationConf}
                // enableDragRow={true}
                // updateData={setBanners}
              />
            </div>
          </div>
        </BoxContainer>
      </div>
      <div>
        {banners &&
        banners.length &&
        banners[activeRow as number]?.images?.length ? (
          <ImageCarousel
            slides={banners[activeRow as number]?.images}
            bannerId={banners[activeRow as number].id}
            updateBannerImages={updateBannerImages}
          />
        ) : null}
      </div>
    </div>
  );
}

export default BannerList;
