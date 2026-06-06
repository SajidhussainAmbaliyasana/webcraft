import { Box, Toolbar } from "@mui/material";
import SideBar       from "../components/SideBar";
import TopNavbar     from "../components/TopNavbar";
import SettingPage from "./SettingsPage";
import { COLORS }    from "../theme";
import SettingsPage from "./SettingsPage";
 
const SettingsPageShell = () => (
  <Box sx={{ display: "flex", minHeight: "100vh", background: COLORS.bg }}>
    {/* <SideBar /> */}
    <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, width: 0 }}>
      {/* <TopNavbar pageTitle="Settings" /> */}
      {/* <Toolbar sx={{ minHeight: "60px !important" }} /> */}
      <Box sx={{ flex: 1, p: { xs: 2.5, md: 4 }, overflowY: "auto", overflowX: "hidden", width: "100%", boxSizing: "border-box" }}>
        <SettingsPage />
      </Box>
    </Box>
  </Box>
);
 
export default SettingsPageShell;