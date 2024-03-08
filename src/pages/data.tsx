import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IStartDuty } from "../api/interfaces";
import {
  EditAppUserControl,
  QrControl,
  DeleteControl,
  EditDriverControl,
  DriverReportControl,
  DutyOnOrOffControl,
} from "../controllers";
import AppUserActiveToggleControl from "../controllers/AppUserActiveToggleControl";
import { SimpleDropDown, SimpleSwitchToggle } from "../generics";

export const departmentTableHeads = [
  {
    title: "S. no",
    key: "s.no",
    type: "number",
  },
  {
    title: "Name",
    key: "name",
    type: "string",
  },
  {
    title: "Action",
    key: "action",
    type: "action",
    actions: [
      {
        title: "Delete",
        key: "delete",
        component: (row: any) => (
          <DeleteControl
            row={row}
            id={row.id}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            service={"DepartMentService"}
          />
        ),
      },
    ],
  },
];
export const perkTableHeads = [
  {
    title: "S. no",
    key: "s.no",
    type: "number",
  },
  {
    title: "Name",
    key: "name",
    type: "string",
  },
  {
    title: "Action",
    key: "action",
    type: "action",
    actions: [
      {
        title: "Delete",
        key: "delete",
        component: (row: any) => (
          <DeleteControl
            row={row}
            id={row.id}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            service={"PerkService"}
          />
        ),
      },
    ],
  },
];

export const driverTableHeads = [
  {
    title: "EmpId",
    key: "empId",
    type: "string",
  },
  {
    title: "Profile",
    key: "profile",
    type: "image",
    urlType: "driver",
  },
  {
    title: "Name",
    key: "name",
    type: "string",
  },
  {
    title: "Created At",
    key: "createdAt",
    type: "date",
  },
  {
    title: "Status",
    key: "duties",
    type: "component",
    component: (row: any) => (
      <DutyOnOrOffControl row={row} id={row.id} onClick={() => {}} />
    ),
    // trueField: "Stop Duty",
    // falseField: "Start Duty",
    // trueFunc: "stopDuty",
    // falseFunc: "startDuty",
  },
  {
    title: "Report",
    key: "report",
    type: "component",
    component: (row: any) => (
      <DriverReportControl
        row={row}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        id={""}
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    type: "action",
    actions: [
      {
        title: "QrCode",
        key: "qrcode",
        component: (row: any) => (
          <QrControl
            value={row.id}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        ),
      },
      {
        title: "Edit",
        key: "edit",
        component: (row: any) => (
          <EditDriverControl
            row={row}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            id={""}
          />
        ),
      },
      {
        title: "Delete",
        key: "delete",
        component: (row: any) => (
          <DeleteControl
            row={row}
            id={row.id}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            service={"DriverService"}
          />
        ),
      },
    ],
  },
];

export const appUsersTableHeads = {
  profile: [
    {
      title: "Name",
      key: "name",
      type: "string",
    },
  ],
  level1: [
    {
      title: "Email",
      key: "email",
      type: "string",
    },
    {
      title: "Phone",
      key: "phone",
      type: "string",
    },
    {
      title: "IsActive",
      key: "isActive",
      type: "component",
      component: (row: any) => (
        <AppUserActiveToggleControl
          row={row}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          id={""}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      type: "action",
      actions: [
        {
          title: "Edit",
          key: "edit",
          component: (row: any) => (
            <EditAppUserControl
              row={row}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              id={""}
              completed={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ),
        },
        // {
        //   title: "Delete",
        //   key: "delete",
        //   component: (row: any) => (
        //     <DeleteControl
        //       row={row}
        //       id=""
        //       onClick={function (): void {
        //         throw new Error("Function not implemented.");
        //       }}
        //     />
        //   ),
        // },
      ],
    },
  ],
};

export const usersTableHeads2 = [
  // {
  //   title: "Account Id",
  //   key: "accId",
  //   type: "string",
  //   level2: {
  //     key: "account",
  //   },
  // },
  {
    title: "S. no",
    key: "sno",
    type: "sno",
  },
  {
    title: "Name",
    key: "name",
    type: "string",
    level2: {
      key: "account",
    },
    forSearch: true,
  },
  {
    title: "Phone",
    key: "phone",
    type: "string",
    forSearch: true,
  },
  {
    title: "Email",
    key: "email",
    type: "string",
  },

  // {
  //   title: "Created at",
  //   key: "createdAt",
  //   type: "date",
  // },
  {
    title: "Current Balance",
    key: "amount",
    type: "amount",
    currency: "AED",
    level2: {
      key: "account",
    },
  },
  {
    title: "IsActive",
    key: "isActive",
    type: "component",
    component: (props: any) => <SimpleSwitchToggle {...props} />,
  },
  {
    title: "Actions",
    key: "actions",
    type: "component",
    component: (props: any) => <SimpleDropDown {...props} />,
  },
];

export const transactionTableHeads = [
  {
    title: "Transaction ID",
    key: "id",
    type: "string",
  },
  {
    title: "Amount",
    key: "amount",
    type: "amount",
  },
  {
    title: "Sender Id",
    key: "senderId",
    type: "string",
  },
  {
    title: "Receiver Id",
    key: "receiverId",
    type: "string",
  },
  {
    title: "Created at",
    key: "createdAt",
    type: "date",
  },
  {
    title: "Updated at",
    key: "createdAt",
    type: "date",
  },
  {
    title: "Status",
    key: "status",
    type: "string",
  },
];

export const usersTableHeads = {
  account: [
    {
      title: "Account Id",
      key: "accId",
      type: "string",
    },
    {
      title: "Name",
      key: "name",
      type: "string",
    },
    {
      title: "Current Balance",
      key: "amount",
      type: "amount",
    },
    {
      title: "Created At",
      key: "createdAt",
      type: "date",
    },
  ],
  level1: [
    {
      title: "Email",
      key: "email",
      type: "string",
    },
  ],
};

// {
//   "account": {
//       "accId": "b36193cc-1a55-4101-9a38-e2f578cc116a",
//       "name": "user1",
//       "amount": 50,
//       "createdAt": "2022-11-17T04:40:20.771Z",
//       "updatedAt": "2022-11-17T04:40:20.771Z",
//       "isAdmin": false
//   },
//   "email": "user1@mwarner.com"
// }

export const historyDataHeader = {
  driver: [
    {
      title: "EmpId",
      key: "empId",
      type: "string",
    },
    {
      title: "Profile",
      key: "profile",
      type: "image",
      urlType: "driver",
    },
    {
      title: "Name",
      key: "name",
      type: "string",
    },
  ],
  level1: [
    {
      title: "Start",
      key: "start",
      type: "time-string",
    },
    {
      title: "End",
      key: "end",
      type: "time-string",
    },
  ],
  perks: [
    {
      title: "Perks",
      key: "perks",
      type: "array",
    },
  ],
};

export const demoTableData = {
  head: [
    {
      title: "S. no",
      key: "s.no",
      type: "number",
    },
    {
      title: "Profile",
      key: "profile",
      type: "image",
    },
    {
      title: "Name",
      key: "name",
      type: "string",
    },
    {
      title: "Created At",
      key: "createdAt",
      type: "date",
    },
    {
      title: "Status",
      key: "duties",
      type: "string",
      trueField: "On Duty",
      falseField: "Off Duty",
    },
  ],
  data: [
    {
      name: "Binova",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Aman",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Ajay",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Amit",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Amit",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Amit",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Amit",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Amit",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Amit",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Amit",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
    {
      name: "Amit",
      createdAt: "2022-07-13T07:33:55.858Z",
      status: [],
      profile: "https://i.pravatar.cc/300",
    },
  ],
};
