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
import RewardRuleService from "../../../api/reward";
import { RewardRuleTableHeader } from "./data";

const RewardRuleList = () => {
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
      RewardRuleService.getRewardRules(
        metaData?.limit,
        metaData?.page - 1,
        true
      ),
    {
      onSuccess: (response: any) => {
        if (response.data.status === "success") {
          const { data } = response.data;
          const { rewardRule, metadata } = data || {};
          setRewardRules(rewardRule);
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
                Rule List
              </h2>
            </div>

            <div>
              <SecondaryTable
                header={RewardRuleTableHeader || []}
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
        {/* <RightSlideV1 title={"User"} open={showUser} setOpen={setShowUser}>
          <UserDetail user={rewardRules && rewardRules[activeRow as number]} />
        </RightSlideV1> */}
      </div>
    </PageContainer>
  );
};

export default RewardRuleList;

function UserDetail({ user }: any) {
  const defaultTabConf = {
    user,
    Comp: TransactionsList,
  };

  console.log({ user });

  return (
    <div className="grid gap-y-6 text-gray-500">
      <div className="grid gap-y-4">
        <div className="flex gap-x-5 justify-between mt-3">
          <div className="h-32 w-32 rounded-2xl bg-slate-200 overflow-hidden border-4 border-slate-300">
            <AspectRatio.Root ratio={1 / 1}>
              <img
                className="h-full w-full object-cover"
                src={user?.image || Avatar}
                alt="user image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = Avatar;
                }}
              />
            </AspectRatio.Root>
          </div>

          <div className="grid gap-y-2">
            <h1 className="text-3xl font-medium uppercase text-black">
              {user?.account?.name}
            </h1>
            <div className="grid">
              <h4 className="text-right">Current Balance</h4>
              <div className="flex justify-end">
                <h1 className="text-4xl font-medium text-black">
                  {user?.account?.amount}
                </h1>
                AED
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-y-3">
        <h4 className="text-xl text-black font-medium">Contact Details</h4>
        <table>
          <tbody>
            <tr>
              <td>Email :</td>
              <td>
                <a href={`mailto:${user?.email}`} className="text-blue-500/80">
                  {user?.email}
                </a>
              </td>
            </tr>
            <tr>
              <td>Phone Number : </td>
              <td>
                <a href={`tel:${user?.phone}`} className="text-blue-500/80">
                  {user?.phone}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid gap-y-3">
        <div>
          <h4 className="text-xl text-black font-medium">Transactions</h4>
        </div>
        <TabsV1
          tabs={[
            {
              title: "All",
              id: "ALL",
              ...defaultTabConf,
            },
            {
              title: "Sent",
              id: "SENT",
              ...defaultTabConf,
            },
            {
              title: "Received",
              id: "RECEIVED",
              ...defaultTabConf,
            },
            {
              title: "Top Up",
              id: "TOPUP",
              ...defaultTabConf,
            },
          ]}
        />
        {/* <div className="grid gap-y-4">
          <div className="">
            <div className="rounded-md relative">
              <PlainInputText
                placeholder={"Search transaction"}
                type={"text"}
                classNames={clsxm("py-[2px]")}
                inputClassNames={clsxm("pl-8 pr-20")}
                value={undefined}
                onChange={handleSearchInput}
              />
              <div className="absolute inset-y-0 flex items-center justify-center px-3">
                <SearchIcon className="h-6 w-6 text-gray-400 " />
              </div>

              <div className="h-6 blur-sm absolute -bottom-8 inset-x-0 bg-white" />
            </div>
          </div>
          <InfiniteScroll
            className="grid divide-y-2 overflow-hidden overflow-y-scroll no-scrollbar"
            dataLength={transactions.length}
            next={() => {
              setMetaData({ ...metaData, page: metaData.page + 1 });
            }}
            hasMore={metaData?.limit * metaData?.page < metaData?.count}
            loader={
              <div className="grid gap-y-6">
                <TransactionShimmer />
                <TransactionShimmer />
                <TransactionShimmer />
              </div>
            }
            height={550}
            endMessage={
              <p className="py-5" style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {transactions?.map((trx: any) => (
              <TransactionCard
                key={trx.id}
                {...trx}
                isPlus={trx?.senderId !== user?.account.accId}
              />
            ))}
          </InfiniteScroll>
        </div> */}
      </div>
    </div>
  );
}

function TransactionsList({ user, id }: any) {
  const [metaData, setMetaData] = useState<{
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  }>({ page: 1, limit: 9, totalPages: 0, count: 0 });
  const [searchBy, setSearchBy] = useState<any>(undefined);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [activeTransaction, setActiveTransaction] = useState<number>(0);

  const { isLoading } = useQuery(
    ["user-transaction", metaData?.page, searchText],
    async () =>
      UserService.getUserTransactionV1({
        limit: metaData?.limit,
        page: metaData?.page - 1,
        accountId: user?.account?.accId,
        type: id,
        transactionId: searchText,
      }),
    {
      onSuccess: (response: any) => {
        if (response.data.status === "success") {
          const { data } = response.data;
          const { transaction, metadata } = data || {};
          setTransactions((prev) => {
            return [...prev, ...transaction];
          });
          if (metadata && metadata.count) {
            setMetaData({ ...metaData, count: metadata.count });
          }
        }
      },
      enabled: !!(metaData?.limit && metaData?.page),
      refetchOnWindowFocus: false,
    }
  );

  const handleSearchInput = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setTransactions([]);
      setSearchText(event.target.value);
    }, 500),
    []
  );

  return (
    <div className="grid gap-y-4">
      <div className="">
        <div className="rounded-md relative">
          <PlainInputText
            placeholder={"Search transaction"}
            type={"text"}
            classNames={clsxm("py-[2px]")}
            inputClassNames={clsxm("pl-8 pr-20")}
            value={undefined}
            onChange={handleSearchInput}
          />
          <div className="absolute inset-y-0 flex items-center justify-center px-3">
            <SearchIcon className="h-6 w-6 text-gray-400 " />
          </div>

          <div className="h-6 blur-sm absolute -bottom-8 inset-x-0 bg-white" />
        </div>
      </div>
      <InfiniteScroll
        className="flex flex-col divide-y-2 overflow-hidden overflow-y-scroll no-scrollbar"
        dataLength={transactions.length}
        next={() => {
          setMetaData({ ...metaData, page: metaData.page + 1 });
        }}
        hasMore={metaData?.limit * metaData?.page < metaData?.count}
        loader={
          <div className="grid gap-y-6">
            <TransactionShimmer />
            <TransactionShimmer />
            <TransactionShimmer />
          </div>
        }
        height={550}
        endMessage={
          <p className="py-5 text-sm" style={{ textAlign: "center" }}>
            {isLoading ? (
              <b>Loading...</b>
            ) : (
              <b>Total {metaData.count} transaction</b>
            )}
          </p>
        }
      >
        {transactions?.map((trx: any, index: number) => (
          <TransactionCard
            key={trx.id}
            {...trx}
            isPlus={trx?.senderId !== user?.account.accId}
            onClick={() => {
              setActiveTransaction(index);
              setShowDetails(true);
            }}
          />
        ))}
      </InfiniteScroll>
      <TransactionDetails
        open={showDetails}
        setOpen={setShowDetails}
        transaction={transactions[activeTransaction]}
        isSender={
          transactions[activeTransaction]?.senderId !== user?.account.accId
        }
      />
    </div>
  );
}

function TransactionCard({
  status,
  transactionId,
  amount,
  type,
  isPlus,
  createdAt,
  source,
  onClick,
  sender,
  receiver,
}: any) {
  return (
    <div
      className="flex items-center px-4 py-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="pr-4">
        <div
          className={clsxm(
            "rounded-full p-2",
            status === "SUCCESS" && "bg-green-500/20 text-green-500",
            status === "PENDING" && "bg-yellow-500/20 text-yellow-500",
            status === "FAILED" && "bg-red-500/20 text-red-500"
          )}
        >
          {status === "SUCCESS" && <BsCheckLg size={20} />}
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div>
          <div>
            <h4 className="text-black text-lg">{transactionId}</h4>
            <table className="text-sm">
              <tbody>
                <tr>
                  <td>{isPlus ? "From" : "To"} : </td>
                  <td className="max-w-[200px] truncate pl-4">
                    {isPlus ? sender?.name : receiver?.name}
                  </td>
                </tr>
                {/* <tr>
                  <td>Type :</td>
                  <td>
                    {TransactionType[type as keyof typeof TransactionType]}
                  </td>
                </tr> */}
                {/* <tr>
                  <td>Source : </td>
                  <td>{PaymentSource[source as keyof typeof PaymentSource]}</td>
                </tr> */}
                <tr>
                  <td>Date :</td>
                  <td className="pl-4">
                    {moment(createdAt).format("MMMM d, YYYY")}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div className="">
            <span className="text-2xl text-black">
              {isPlus ? "+" : "-"}
              {amount}
            </span>
            <span className="text-sm ml-2">AED</span>
          </div>
          <div>
            <p className="text-sm">{moment(createdAt).format("h:mm a")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransactionShimmer() {
  return (
    <div className="animate-pulse flex px-4 gap-x-4">
      <div className="rounded-full bg-slate-300 h-10 w-10"></div>
      <div className="flex-1 space-y-3 py-1">
        <div className="h-2 bg-slate-300 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function TransactionDetails({ open, setOpen, transaction, isSender }: any) {
  const user = isSender ? transaction?.sender : transaction?.receiver;
  return (
    <TransactionDetailsWrapper open={open} setOpen={setOpen}>
      <div className="py-6 px-6 grid gap-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium border-l-4 border-rose-800 pl-4">
            {transaction?.transactionId}
          </h2>
        </div>
        <div className="flex gap-x-6 ">
          <div>
            <div className="h-20 w-20 rounded-2xl bg-slate-200 overflow-hidden border-4 border-slate-300">
              <AspectRatio.Root ratio={1 / 1}>
                <img
                  className="h-full w-full object-cover"
                  src={user?.user?.image || Avatar}
                  alt="user profile"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = Avatar;
                  }}
                />
              </AspectRatio.Root>
            </div>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className="flex items-center justify-between">
                    <p>{isSender ? "Sent By" : "Received From"}</p>{" "}
                    <span className="ml-3">:</span>
                  </td>
                  <td className="pl-5">{user?.name}</td>
                </tr>
                <tr>
                  <td className="flex items-center justify-between">
                    <p>Phone</p> <span className="ml-3">:</span>
                  </td>
                  <td className="pl-5">{user?.user?.phone}</td>
                </tr>

                <tr>
                  <td className="flex items-center justify-between">
                    <p>Email</p> <span className="ml-3">:</span>
                  </td>
                  <td className="pl-5">{user?.user?.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TransactionDetailsWrapper>
  );
}

function TransactionDetailsWrapper({ open, setOpen, children }: any) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="pointer-events-none fixed inset-x-0 bottom-0 flex h-full justify-end items-end bg-black/20">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <Dialog.Panel className="pointer-events-auto h-[250px] w-[36rem]">
              <div className="flex h-full flex-col overflow-y-scroll bg-white rounded-t-xl">
                {children}
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close panel</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
