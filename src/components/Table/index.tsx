import React, { Fragment } from "react";
import moment from "moment";
import { ITable, ITableHead } from "../type";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { QrControl } from "../../controllers";
import ENV from "../../environment";
import { LineWaveScreenFit } from "../LineWaveLoader";
import { onImageError } from "../../utils/functions";

const imagesUrls: { [key: string]: string } = {
  driver: `${ENV().baseUrl}driver/profile-image?name=`,
  default: ENV().baseUrl,
};

const fields: { [key: string]: string[] } = {
  sno: ["demo"],
  qrField: ["driver"],
};

const Table = ({
  header,
  data,
  type,
  classNames,
  level,
  actions,
  loading,
  currRow,
}: ITable) => {
  return (
    <div className={`overflow-y-scroll ${!classNames ? "h-96" : classNames}`}>
      <table className="min-w-full">
        <TableHeader header={header} level={level} />
        <TableBody
          data={data}
          type={type}
          level={level}
          header={header}
          actions={actions}
          loading={loading}
          currRow={currRow}
        />
      </table>
    </div>
  );
};

export default Table;

const TableHeader = ({ header, level }: { header: any; level: number }) => {
  return (
    <thead className="bg-[#f9fafb]">
      <tr className="h-12 sticky top-0 z-[5]">
        {level == 1
          ? header?.map((head: ITableHead, index: number) => (
              <th
                key={index}
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-2 text-left bg-[#f9fafb]"
              >
                {head.title}
              </th>
            ))
          : level == 2 &&
            Object.keys(header).map((key: string, index: number) => {
              return (
                <Fragment key={key}>
                  {header[key].map((head: ITableHead, index: number) => (
                    <th
                      key={index}
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-2 text-left bg-[#f9fafb]"
                    >
                      {head.title}
                    </th>
                  ))}
                </Fragment>
              );
            })}
      </tr>
    </thead>
  );
};

const TableBody = ({
  data,
  header,
  type,
  level,
  actions,
  loading,
  currRow,
}: {
  data: any[] | undefined;
  header: any;
  type: string;
  level: number;
  actions?: any;
  loading: boolean;
  currRow?: any;
}) => {
  return (
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
      ) : !data ? (
        <tr className="h-56">
          <td
            colSpan={10}
            className="text-center text-6xl font-semibold text-gray-400"
          >
            No Data
          </td>
        </tr>
      ) : (
        data?.map((row: any, index: number) => {
          return (
            <TableRow
              row={row}
              header={header}
              level={level}
              sno={index + 1}
              type={type}
              key={index}
              actions={actions}
              currRow={currRow}
            />
          );
        })
      )}
    </tbody>
  );
};

const TableRow = ({
  row,
  header,
  type,
  level,
  sno,
  actions,
  currRow,
}: {
  row: any;
  header: any;
  type: string;
  level: number;
  sno: number;
  actions?: any;
  currRow?: any;
}) => {
  return (
    <tr className="border-b hover:bg-blue-100">
      {fields["sno"].includes(type) && (
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
          {sno}
        </td>
      )}
      {level == 1 ? (
        <RenderFrag header={header} row={row} type={type} actions={actions} />
      ) : (
        level == 2 &&
        Object.keys(header).map((key: any, index: number) => {
          if (key == "level1") {
            return (
              <RenderFrag
                header={header[key]}
                row={row}
                type={type}
                key={index}
                actions={actions}
              />
            );
          }

          if (key == "perks" && type == "driver") {
            return (
              <td
                key={index}
                className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500 gap-2 grid grid-cols-3 grid-flow-row-dense"
              >
                {row[key]?.map((perkObj: any, index: number) => {
                  return (
                    <span className="text-[.725rem] flex items-center justify-center text-blue-900 p-1 px-3 bg-blue-200 bg-opacity-60 border-2 border-blue-400 rounded-md">
                      {perkObj.Perk.name}
                    </span>
                  );
                })}
              </td>
            );
          }

          return (
            <RenderFrag
              header={header[key]}
              row={row}
              type={type}
              l2Key={key}
              key={index}
              actions={actions}
              currRow={currRow}
            />
          );
        })
      )}
    </tr>
  );
};

const NormalCol = ({ value }: { value: string }) => {
  return (
    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
      {value}
    </td>
  );
};

const ImagCol = ({ url }: { url: string }) => {
  return (
    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
      <div className="h-10 w-10 overflow-hidden rounded-full flex items-center justify-center">
        <img
          src={url}
          alt=""
          className=" h-full w-full"
          onError={onImageError}
        />
      </div>
    </td>
  );
};

const DateCol = ({ value }: { value: string }) => {
  const date1 = moment(value);
  const date2 = moment();
  const duration = moment.duration(date1.diff(date2));
  return (
    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
      {duration.humanize()}
    </td>
  );
};

const TimeCol = ({ value }: { value: string }) => {
  return (
    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
      <div className="flex flex-col">
        <span>Admin</span>
        <span className="text-[.720rem]">
          {moment(value).format("dddd, Do, h:mm:ss a")}
        </span>
      </div>
    </td>
  );
};

const ActionCol = ({
  type,
  id,
  row,
  actions,
  header,
  index,
}: {
  index: number;
  type: string;
  id: string;
  row: any;
  actions?: any;
  header: any;
}) => {
  return (
    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
      <ActionsList
        header={header}
        index={index}
        type={type}
        id={id}
        actions={actions}
        row={row}
      />
    </td>
  );
};

const RenderFrag = ({
  header,
  row,
  type,
  l2Key,
  actions,
  currRow,
}: {
  header: any;
  row: any;
  type: string;
  l2Key?: string;
  actions?: any;
  currRow?: any;
}) => {
  const newRow = l2Key ? row[l2Key] : row;

  if (!newRow) return null;

  return (
    <Fragment>
      {header?.map((col: any, index: number) => {
        // Skip this field
        if (col.key === "s.no") {
          return null;
        }

        if (col.type === "component") {
          return (
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
              {col.component(row)}
            </td>
          );
        }

        if (col.type === "image") {
          let imageUrl = `${imagesUrls["default"]}${newRow[col.key]}`;
          if (type) {
            imageUrl = `${imagesUrls[`${type}`]}${newRow[col.key]}`;
          }

          if (type === "demo") {
            imageUrl = newRow[col.key];
          }
          return <ImagCol key={index} url={imageUrl} />;
        }

        // if (col.key === "component") {
        //   console.log({ col });
        //   // return col.component(row);
        // }

        if (col.type === "date") {
          return <DateCol key={index} value={newRow[col.key]} />;
        }

        if (col.type == "time-string") {
          return <TimeCol key={index} value={newRow[col.key]} />;
        }

        if (col.type === "count") {
          let trueIsLoading = false;
          let falseIsLoading = false;

          let trueFunc = {
            callBack: (row: any) => {},
            isLoading: false,
          };

          let falseFunc = {
            callBack: (row: any) => {},
            isLoading: false,
          };

          if (actions?.tableFunctions) {
            trueFunc = actions.tableFunctions[col.trueFunc];
            falseFunc = actions.tableFunctions[col.falseFunc];
          }

          if (currRow && currRow.id === row.id) {
            trueIsLoading = trueFunc.isLoading;
            falseIsLoading = falseFunc.isLoading;
          }

          return (
            <td
              key={index}
              className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500"
            >
              {newRow[col.key]?.length > 0 ? (
                <span
                  onClick={() => trueFunc.callBack(row)}
                  className="bg-green-400 rounded-md p-2 text-white font-semibold"
                >
                  {trueIsLoading ? "Loading.." : col.trueField}
                </span>
              ) : (
                <span
                  onClick={() => falseFunc.callBack(row)}
                  className="bg-yellow-400 rounded-md p-2 text-white font-semibold"
                >
                  {falseIsLoading ? "Loading..." : col.falseField}
                </span>
              )}
            </td>
          );
        }

        if (col.type === "action") {
          return (
            <ActionCol
              key={index}
              type={type}
              id={newRow.id}
              actions={actions}
              row={row}
              header={header}
              index={index}
            />
          );
        }

        return <NormalCol key={index} value={newRow[col.key]} />;
      })}
    </Fragment>
  );
};

const ActionsList = ({
  type,
  id,
  row,
  actions,
  header,
  index,
}: {
  header: any;
  type: string;
  id: string;
  row: any;
  actions?: any;
  index: number;
}) => {
  const headerActions = header[index].actions;

  return (
    <div className="flex items-center gap-x-3">
      {actions && actions.universal && (
        <Fragment>
          {actions.universal["edit"] && (
            <div
              onClick={() => actions.universal["edit"](row)}
              className="bg-blue-800 bg-opacity-20 p-3 rounded-md cursor-pointer"
            >
              <MdEdit className="text-xl text-blue-800" />
            </div>
          )}

          {actions.universal["delete"] && (
            <div
              onClick={() => actions.universal["delete"](row)}
              className="bg-red-500 bg-opacity-20 p-3 rounded-md cursor-pointer"
            >
              <AiTwotoneDelete className="text-xl text-red-500" />
            </div>
          )}
        </Fragment>
      )}

      {headerActions.map((action: any) => {
        let { component } = action || {};
        if (component) return component(row);
        return null;
      })}
    </div>
  );
};
