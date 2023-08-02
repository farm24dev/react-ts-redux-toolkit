import { RouteObject } from "react-router-dom";
import DashboardLayoutHome from "../pages/dashboard/dashboard-layout-home";
import DashboardLeave from "../pages/dashboard/dashboard-leave";
import DashboardMangeLeave from "../pages/dashboard/dashboard-manage-leave";
import DashboardLayout from "../pages/dashboard/dashboard-layout";
import PermisstionDenied from "../pages/dashboard/permisstion-denied";

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
    ],
  },
];

export default routeDashboard;
