import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink, useLocation } from "react-router-dom";
type MenuItem = {
  label: string;
  icon: any;
  href: string;
};
export const MainListItems = () => {
  const location = useLocation();
  const menuItem: Array<MenuItem> = [
    {
      label: "หน้าหลัก",
      icon: <DashboardIcon />,
      href: "/dashboard",
    },
    {
      label: "ยื่นใบลา",
      icon: <ContactPageIcon />,
      href: "/dashboard/request-for-leave",
    },
    {
      label: "จัดการข้อมูลการลา",
      icon: <EditIcon />,
      href: "/dashboard/manage-leave",
    },
  ];
  return (
    <>
      {menuItem.map((item) => {
        return (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.href}
            sx={{
              backgroundColor: location.pathname === item.href ? "grey.300" : "",
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        );
      })}
    </>
  );
};
