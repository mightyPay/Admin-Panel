import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Layouts
import { BaseLayout, SideBarLayout } from "./layouts";
// Containers
import { ProtectedRoute } from "./containers";
// Components
import { SuspenseLoader } from "./components";
import { TiThListOutline } from "react-icons/ti";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import CleanlyDashboard from "./pages/Cleanly";

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Page
const DashBoard = Loader(lazy(() => import("./pages/DashBoard")));
const LoginPage = Loader(lazy(() => import("./pages/Login")));
const SignUpPage = Loader(lazy(() => import("./pages/SignUp")));
const DriverPage = Loader(lazy(() => import("./pages/Driver")));
const PerkPage = Loader(lazy(() => import("./pages/Perk")));
const HistoryPage = Loader(lazy(() => import("./pages/History")));
const DepartMentPage = Loader(lazy(() => import("./pages/DepartMent")));
const AppUserPage = Loader(lazy(() => import("./pages/AppUser")));
const AssetPage = Loader(lazy(() => import("./pages/Asset")));
const TransactionPage = Loader(lazy(() => import("./pages/Transaction")));
const EmailVerificationPage = Loader(
  lazy(() => import("./pages/EmailVerification"))
);
const PageWrapper = Loader(lazy(() => import("./components/PageWrapper")));
const BannerListPage = Loader(lazy(() => import("./pages/Banner/List")));
const BannerCreatePage = Loader(lazy(() => import("./pages/Banner/Create")));
const BannerPage = Loader(lazy(() => import("./pages/Banner")));

const NotificationTemplateCreatePage = Loader(
  lazy(() => import("./pages/NotificationTemplates/Create"))
);
const NotificationTemplateListPage = Loader(
  lazy(() => import("./pages/NotificationTemplates/List"))
);
const RewardRuleListPage = Loader(
  lazy(() => import("./pages/RewardRule/List"))
);
const RewardRuleCreatePage = Loader(
  lazy(() => import("./pages/RewardRule/Create"))
);

const CampaignCreatePage = Loader(
  lazy(() => import("./pages/Campaign/Create"))
);
const CampaignListPage = Loader(lazy(() => import("./pages/Campaign/List")));

const UserCreatePage = Loader(lazy(() => import("./pages/Users/Create")));
const UserListPage = Loader(lazy(() => import("./pages/Users/List")));
const MerchantListPage = Loader(lazy(() => import("./pages/Merchant")));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <SideBarLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <DashBoard />,
      },
      {
        path: "app-user",
        element: <AppUserPage />,
      },
      {
        path: "users",
        children: [
          {
            path: "create",
            element: <UserCreatePage />,
          },
          {
            path: "list",
            element: <UserListPage />,
          },
        ],
      },
      {
        path: "transactions",
        element: <TransactionPage />,
      },
      {
        path: "merchants",
        element: <MerchantListPage />,
      },
      {
        path:"cleanly",
        element:<CleanlyDashboard/>
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "app/banner",
        element: <BannerPage />,
        children: [
          {
            path: "list",
            index: true,
            element: <BannerListPage />,
          },
          {
            path: "create",
            element: <BannerCreatePage />,
          },
        ],
      },
      {
        path: "rewards",
        children: [
          {
            path: "list",
            index: true,
            element: <RewardRuleListPage />,
          },
          {
            path: "create",
            element: <RewardRuleCreatePage />,
          },
        ],
      },
      {
        path: "campaign",
        children: [
          {
            path: "list",
            index: true,
            element: <CampaignListPage />,
          },
          {
            path: "create",
            element: <CampaignCreatePage />,
          },
        ],
      },
      {
        path: "template",
        children: [
          {
            path: "list",
            index: true,
            element: <NotificationTemplateListPage />,
          },
          {
            path: "create",
            element: <NotificationTemplateCreatePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/email-verify/:token",
    element: <EmailVerificationPage />,
  },
];

export default routes;

export const apiRoutes = {
  Auth: {
    SignIn: "/auth/signin",
    SignUp: "/auth/signup",
    LogOut: "/auth/logout",
    RefreshToken: "/auth/refresh",
  },
  Driver: {
    AddDriver: "driver",
    StartDuty: "driver/start-duty",
    AddPerk: "driver/add-perk",
    EndDuty: "driver/end-duty",
    CheckDuty: "driver/check-duty",
    AssignPerk: "driver/assign-perk",
  },
};
