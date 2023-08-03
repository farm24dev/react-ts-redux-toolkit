import { RouteObject } from "react-router-dom";
import DashboardLayoutHome from "../pages/dashboard/dashboard-layout-home";
import DashboardLeave from "../pages/dashboard/dashboard-leave";
import DashboardMangeLeave from "../pages/dashboard/dashboard-manage-leave";
import DashboardLayout from "../pages/dashboard/dashboard-layout";
import PermisstionDenied from "../pages/dashboard/permisstion-denied";
import DashboardEditProfilePage from "../pages/dashboard/dashboard-edit-profile";

const routeDashboard: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardLayoutHome />,
      },
      {
        path: "request-for-leave",
        element: <DashboardLeave />,
      },
      {
        path: "manage-leave",
        element: <DashboardMangeLeave />,
      },
      {
        path: "permisstion-denied",
        element: <PermisstionDenied />,
      },
      {
        path: "edit-profile",
        element: <DashboardEditProfilePage />,
      },
    ],
  },
];

export default routeDashboard;
