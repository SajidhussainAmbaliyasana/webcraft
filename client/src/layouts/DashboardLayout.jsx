import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../components/SideBar";
import TopNavbar from "../components/TopNavbar";

import { selectSidebarCollapsed } from "../redux/slices/uiSlice";
import { COLORS } from "../theme";

const DashboardLayout = () => {
  const collapsed = useSelector(selectSidebarCollapsed);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: COLORS.bg,
      }}
    >
      <Sidebar />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          width: 0,
        }}
      >
        <TopNavbar pageTitle="Dashboard" />

        <Toolbar sx={{ minHeight: "60px !important" }} />

        <Box
          sx={{
            flex: 1,
            p: { xs: 2.5, md: 4 },
            overflowY: "auto",
            overflowX: "hidden",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;