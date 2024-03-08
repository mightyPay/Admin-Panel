import { useState, useEffect } from "react";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { AiFillSliders } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useMutation } from "react-query";
import { useWindowSize } from "react-use";
import { BoxContainer } from "../../containers";
import useProgressiveImage from "../../hooks/useProgressiveImage";
import clsxm from "../../utils/clsxm";
import BannerService from "../../api/banner";

export default function ImageCarousel({
  slides,
  bannerId,
  updateBannerImages,
}: any) {
  const [enableGrid, setEnableGrid] = useState<boolean>(false);
  const [sliceData, setSliceData] = useState<any[] | undefined>(slides);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cols, setCols] = useState<number>(1);
  const loaded = useProgressiveImage(sliceData && sliceData[currentIndex]?.uri);
  const windowSize = useWindowSize();

  const { isLoading, mutateAsync } = useMutation(
    "updateBannerOrder",
    BannerService.updateBannerOrder,
    {
      onSuccess: (res: any) => {
        console.log({ res });
        if (res.data.status === "success") {
          const { sourcePosition, destinationPosition } = res.data.data;
          const items = Array.from(sliceData as any[]);
          const [reorderedItem] = items.splice(sourcePosition, 1);
          items.splice(destinationPosition, 0, reorderedItem);
          setSliceData(items);
          updateBannerImages(items);
        }
      },
      onError: (error: any) => {
        console.log({ error });
      },
    }
  );

  const prev = () => {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? slides.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const next = () => {
    const isLast = currentIndex === slides.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  };

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    if (bannerId) {
      await mutateAsync({
        bannerId,
        sourcePosition: result.source.index,
        destinationPosition: result.destination.index,
      });
      return;
    }

    const items = Array.from(sliceData as any[]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSliceData(items);
    updateBannerImages && updateBannerImages(items);
  }

  useEffect(() => {
    let columns = undefined;
    if (windowSize.width >= 1024) {
      columns = 3;
    } else if (windowSize.width >= 768) {
      columns = 2;
    } else {
      columns = 1;
    }

    setCols(columns);
    setSliceData(slides);
  }, [windowSize, slides]);

  return (
    <div>
      {!enableGrid && sliceData ? (
        <div
          className={clsxm(
            "w-full h-[400px]  m-auto relative group",
            enableGrid && "bg-white rounded-md h-auto"
          )}
        >
          <div
            // style={{
            //   backgroundImage: `url(${loaded || sliceData[currentIndex].uri})`,
            // }}
            className={clsxm(
              "w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-slate-300 overflow-hidden",
              enableGrid && "bg-white"
            )}
          >
            <img
              src={loaded || sliceData[currentIndex].uri}
              className="h-full w-full duration-500"
            />
          </div>
          <div
            onClick={prev}
            className="absolute top-1/2 -translate-x-0 translate-y-[-50%] text-white cursor-pointer hidden group-hover:block left-5 text-2xl rounded-full p-2 bg-black/20"
          >
            <HiOutlineChevronLeft />
          </div>
          <div
            onClick={next}
            className="absolute top-1/2 -translate-x-0 translate-y-[-50%] text-white cursor-pointer hidden group-hover:block right-5 text-2xl rounded-full p-2 bg-black/20"
          >
            <HiOutlineChevronRight />
          </div>

          <div
            onClick={() => setEnableGrid(true)}
            className="absolute top-5 text-white cursor-pointer right-5 text-xl rounded-full p-2 bg-black/20"
          >
            <BsFillGridFill />
          </div>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <BoxContainer classNames="shadow-md relative">
            <div>
              <Droppable droppableId="slides" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex items-center gap-5"
                  >
                    {sliceData?.map((slide: any, index: number) => {
                      return (
                        <Draggable
                          key={slide.id}
                          draggableId={slide.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="h-52 rounded-xl relative bg-center bg-cover duration-500 bg-black/10 overflow-hidden"
                            >
                              <img src={slide.uri} className="h-full w-full" />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </div>
                )}
              </Droppable>
              <div
                onClick={() => setEnableGrid(false)}
                className="absolute top-5 text-white cursor-pointer right-5 text-xl rounded-full p-2 bg-black/20"
              >
                <AiFillSliders />
              </div>
            </div>
          </BoxContainer>
        </DragDropContext>
      )}
    </div>
  );
}
