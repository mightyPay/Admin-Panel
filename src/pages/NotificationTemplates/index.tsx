// import React from "react";
// import { MdOutlineCreateNewFolder } from "react-icons/md";
// import { TiThListOutline } from "react-icons/ti";
// import { PageWrapper } from "../../components";

// function NotificationTemplates() {
//   return (
//     <PageWrapper
//       menus={[
//         {
//           id: "notificationList",
//           title: "Template list",
//           Icon: TiThListOutline,
//           index: true,
//           url: "/dashboard/notifications/template/list",
//         },
//         {
//           id: "notificationCreate",
//           title: "Template Create",
//           Icon: MdOutlineCreateNewFolder,
//           index: false,
//           url: "/dashboard/notifications/template/create",
//         },
//       ]}
//     />
//   );
// }

// export default NotificationTemplates;

export { default as CreateNotificationTemplate } from "./Create";
export { default as ListNotificationTemplate } from "./List";
