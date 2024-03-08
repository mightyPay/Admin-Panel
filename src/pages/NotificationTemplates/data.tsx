import { SimpleSwitchToggle } from "../../generics";

export const BannerHeader = [
  {
    title: "S. no",
    key: "sno",
    type: "sno",
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
    title: "IsActive",
    key: "isActive",
    type: "component",
    component: (props: any) => <SimpleSwitchToggle {...props} />,
  },
  {
    title: "Applied",
    key: "isSet",
    type: "component",
    component: (props: any) => <SimpleSwitchToggle {...props} />,
  },
];

// {
//         "id": "4626ec01-8dcb-4983-ac14-fe8d9500e196",
//         "name": "first",
//         "createdAt": "2023-02-28T11:47:51.331Z",
//         "updatedAt": "2023-02-28T11:47:51.331Z",
//         "isActive": true,
//         "isSet": false,
//         "_count": {
//           "images": 5
//         }
//       }
