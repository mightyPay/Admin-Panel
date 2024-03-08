import {
  PencilAltIcon,
  SearchCircleIcon,
  SearchIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LineWaveScreenFit } from "../LineWaveLoader";
import clsxm from "../../utils/clsxm";
import Pagination from "../Pagination";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import PlainInputText from "../PlainInputText";
import { debounce } from "../../utils/optimize";

const handleImageOnError = (e: any) => {
  e.target.src =
    "https://img.freepik.com/free-vector/city-skyline-concept-illustration_114360-8923.jpg?w=2000&t=st=1660910262~exp=1660910862~hmac=54937f31be109281376f996d5e7a7451b14ca2cbfe46eaee0e63df67545d1a62";
};

const SecondaryTable = (props: any) => {
  const {
    header,
    classNames,
    data,
    loading,
    type,
    actions,
    pagination,
    activeRow,
    setActiveRow,
    enableDragRow,
    updateData,
    enableSearch,
    onSearchChange,
  } = props;
  const [applySearch, setApplySearch] = useState<boolean>(enableSearch);
  const [searchFields, setSearchFields] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<any>({
    key: undefined,
    value: undefined,
  });

  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchInput = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue((prev: any) => {
        return {
          ...prev,
          value: event.target.value,
        };
      });
    }, 500),
    []
  );

  useEffect(() => {
    const searchField = header.filter((h: any) => h?.forSearch);

    if (searchField.length) {
      setSearchValue({ value: "", key: searchField[0].key });
      setSearchFields(searchField);
      setApplySearch(true);
    }
  }, []);

  useEffect(() => {
    if (onSearchChange) onSearchChange(searchValue);
  }, [searchValue]);

  if (enableDragRow) {
    function onDragEnd(result: DropResult) {
      if (!result.destination) return;
      const items = Array.from(data);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      updateData && updateData(items);
    }
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <div className={clsxm(`overflow-y-scroll h-[550px]`, classNames)}>
            <table className="min-w-full">
              {/* ----------------- Header --------------------- */}
              <thead className="bg-white">
                <tr className="h-12 sticky top-0 z-[5]">
                  {header.map((head: any, index: number) => (
                    <th
                      key={index}
                      scope="col"
                      className={clsxm(
                        "text-sm font-medium text-gray-900 px-6 py-2 text-left bg-[#ffffff]",
                        head.width && [`w-[${head.width}]`]
                      )}
                    >
                      {head.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <Droppable droppableId="secondaryTable">
                {(provided) => (
                  <tbody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="overflow-hidden"
                  >
                    {loading ? (
                      <tr className="h-56">
                        <td
                          colSpan={10}
                          className="text-center text-6xl font-semibold text-gray-400"
                        >
                          <LineWaveScreenFit />
                        </td>
                      </tr>
                    ) : (
                      data &&
                      (data.length ? (
                        data.map((row: any, index: number) => {
                          const rowIndex = index;
                          return (
                            <Draggable
                              key={`row-index-${index}`}
                              draggableId={`row-index-${index}`}
                              index={index}
                            >
                              {(provided) => (
                                <tr
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  onClick={
                                    setActiveRow
                                      ? () => setActiveRow(index)
                                      : () => {}
                                  }
                                  className={clsxm(
                                    "border-b hover:bg-[#f2f3f8]",
                                    activeRow === index && "bg-[#f2f3f8]"
                                  )}
                                >
                                  {header.map((head: any, index: number) => {
                                    let tableRow = row;
                                    if (head.level2) {
                                      tableRow = tableRow[head?.level2?.key];
                                    }

                                    return (
                                      <TableCol
                                        {...head}
                                        {...props}
                                        key={`tc-${index}`}
                                        type={head.type}
                                        colKey={head.key}
                                        rowIndex={rowIndex}
                                        row={props.row}
                                        value={tableRow[head.key]}
                                        isBlank={!tableRow}
                                      />
                                    );
                                  })}
                                </tr>
                              )}
                            </Draggable>
                          );
                        })
                      ) : (
                        <tr className="h-56">
                          <td
                            colSpan={10}
                            className="text-center text-6xl font-semibold text-gray-400"
                          >
                            No Data
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                )}
              </Droppable>
            </table>
          </div>
          {pagination?.totalItems ? (
            <div className="flex items-center justify-center">
              <Pagination {...pagination} />
            </div>
          ) : null}
        </div>
      </DragDropContext>
    );
  }

  return (
    <div className="grid gap-y-6">
      {applySearch ? (
        <div>
          <div className="rounded-md relative">
            <PlainInputText
              compRef={searchRef}
              placeholder={"Search by"}
              type={""}
              classNames={clsxm("py-2")}
              inputClassNames={clsxm("pl-8 pr-20")}
              value={undefined}
              onChange={handleSearchInput}
            />
            <div className="absolute inset-y-0 flex items-center justify-center px-3">
              <SearchIcon className="h-6 w-6 text-gray-400 " />
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center">
              <select
                id="searchOption"
                name="searchOption"
                value={searchValue.key}
                onChange={(e) => {
                  if (searchRef.current) {
                    searchRef.current.value = "";
                  }
                  setSearchValue({ value: "", key: e.target.value });
                }}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                {searchFields.map((h: any) => {
                  return (
                    <option key={h.key} value={h.key}>
                      {h.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      ) : null}
      <div className={clsxm(`overflow-y-scroll h-[550px]`, classNames)}>
        <table className="min-w-full">
          {/* ----------------- Header --------------------- */}
          <thead className="bg-white">
            <tr className="h-12 sticky top-0 z-[5]">
              {header.map((head: any, index: number) => (
                <th
                  key={index}
                  scope="col"
                  className={clsxm(
                    "text-sm font-medium text-gray-900 px-6 py-2 text-left bg-[#ffffff]",
                    head.width && [`w-[${head.width}]`]
                  )}
                >
                  {head.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-hidden">
            {loading ? (
              <tr className="h-56">
                <td
                  colSpan={10}
                  className="text-center text-6xl font-semibold text-gray-400"
                >
                  <LineWaveScreenFit />
                </td>
              </tr>
            ) : (
              data &&
              (data.length ? (
                data?.map((row: any, index: number) => (
                  <TableRow
                    key={`t-row-${index}`}
                    row={row}
                    header={header}
                    actions={actions}
                    type={type}
                    rowIndex={index}
                    rowClick={
                      setActiveRow ? () => setActiveRow(index) : () => {}
                    }
                    isActive={activeRow === index}
                  />
                  //  <p>hello</p>
                ))
              ) : (
                <tr className="h-56">
                  <td
                    colSpan={10}
                    className="text-center text-6xl font-semibold text-gray-400"
                  >
                    No Data
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination?.totalItems ? (
        <div className="flex items-center justify-center">
          <Pagination {...pagination} />
        </div>
      ) : null}
    </div>
  );
};

export default SecondaryTable;

export const TableRow = (props: {
  row: any;
  header: any[];
  actions: any;
  type: string;
  rowIndex: number;
  isActive: boolean;
  rowClick: () => void;
}) => {
  return (
    <tr
      onClick={(e) => {
        const target = e.target as Element;

        if (target.localName === "td" || target.localName === "tr") {
          props.rowClick();
        }
      }}
      className={clsxm(
        "border-b hover:bg-[#f2f3f8]",
        props.isActive && "bg-[#f2f3f8]"
      )}
    >
      {props.header?.map((head: any, index: number) => {
        let tableRow = props?.row;
        if (head?.level2) {
          tableRow = tableRow[head?.level2?.key];
        }

        return (
          <TableCol
            {...head}
            {...props}
            key={`tc-${index}`}
            type={head?.type}
            colKey={head?.key}
            rowIndex={props?.rowIndex}
            row={props?.row}
            value={tableRow ? tableRow[head?.key] : undefined}
            isBlank={!tableRow}
          />
        );
      })}
    </tr>
  );
};

export const TableCol = ({
  type,
  rowIndex,
  row,
  value,
  actions,
  component,
  isBlank,
  currency,
}: any) => {
  if (isBlank) {
    return (
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
        ------------
      </td>
    );
  }

  if (type === "sno") {
    return (
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
        {rowIndex + 1}
      </td>
    );
  }

  if (type === "image-string") {
    return (
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
        <div className="flex items-center gap-x-3">
          <div className="flex items-center justify-center rounded-full overflow-hidden h-9 w-9">
            <img
              src=""
              alt=""
              className="w-20 h-full rounded-full"
              onError={handleImageOnError}
            />
          </div>
          <span>{value}</span>
        </div>
      </td>
    );
  }

  if (type === "universal-buttons") {
    return (
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
        <div className="w-full flex items-center justify-start gap-x-3">
          <PencilAltIcon
            onClick={() => actions.universal.edit(row)}
            className="w-6 cursor-pointer text-[#3A70D9]"
          />
          <TrashIcon
            onClick={() => actions.universal.delete(row)}
            className="w-6 cursor-pointer text-[#FF5353]"
          />
        </div>
      </td>
    );
  }

  if (type === "amount") {
    return (
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
        {value} {currency}
      </td>
    );
  }

  if (type === "date") {
    const date1 = moment(value);
    const date2 = moment();
    const duration = moment.duration(date1.diff(date2));
    return (
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
        {duration.humanize()} ago
      </td>
    );
  }

  if (type === "component") {
    if (component) {
      return (
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
          {component(row)}
        </td>
      );
    } else return null;
  }

  if (type === "description") {
    return (
      <td className="px-6 py-3 text-sm font-medium text-gray-500 max-w-[250px]">
        <p className="">{value}</p>
      </td>
    );
  }

  return (
    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
      {value}
    </td>
  );
};
