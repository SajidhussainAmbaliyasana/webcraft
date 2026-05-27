import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Chip,
  Tooltip,
  Divider,
  alpha,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
//import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useDispatch, useSelector } from "react-redux";

import {
  setSidebarMobileOpen,
  selectSidebarCollapsed,
} from "../redux/slices/uiSlice";
import {useLogoutMutation} from '../redux/api/authApi'

import {
  ROUTES,
  SIDEBAR_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
} from "../constants";

import { COLORS } from "../theme";

const TopNavbar = ({ pageTitle = "Dashboard",user }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const collapsed = useSelector(
    selectSidebarCollapsed
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const sidebarW = collapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_WIDTH;

  // Temporary static user
  // const user = {
  //   name: "Sajid Hussain",
  //   email: "sajid@gmail.com",
  // };

  const initials =
  user?.firstName?.charAt(0).toUpperCase() || "?";

  const handleLogout = async () => {

    try {

        setAnchorEl(null);

        await logout().unwrap();

        navigate(ROUTES.LOGIN);

    } catch (error) {

        console.log(error);
    }
};

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: {
          md: `calc(100% - ${sidebarW}px)`,
        },

        ml: {
          md: `${sidebarW}px`,
        },

        transition:
          "width 0.2s ease, margin 0.2s ease",

        zIndex: (theme) =>
          theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "60px !important",
          px: { xs: 2, md: 3 },
          gap: 2,
        }}
      >
        {/* Mobile menu toggle */}

        <IconButton
          edge="start"
          onClick={() =>
            dispatch(setSidebarMobileOpen(true))
          }
          sx={{
            display: { md: "none" },
            color: COLORS.textMuted,
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Page title */}

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              color: COLORS.textPrimary,
              letterSpacing: "-0.3px",
            }}
          >
            {pageTitle}
          </Typography>
        </Box>

        {/* Right actions */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* Live badge */}

          <Chip
            label="● Live"
            size="small"
            color="success"
            sx={{
              fontSize: "0.68rem",
              height: 24,
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          />

          {/* Notifications */}

          <Tooltip title="Notifications" arrow>
            <IconButton
              size="small"
              sx={{
                color: COLORS.textMuted,

                "&:hover": {
                  color: COLORS.textPrimary,
                },
              }}
            >
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* User menu */}

          <Box
            onClick={(e) =>
              setAnchorEl(e.currentTarget)
            }
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,

              cursor: "pointer",

              px: 1.5,
              py: 0.75,

              borderRadius: "9px",

              border: `1px solid ${COLORS.borderSubtle}`,

              background: alpha(
                COLORS.bgCard,
                0.6
              ),

              transition: "all 0.15s",

              "&:hover": {
                border: `1px solid ${COLORS.borderMid}`,
                background: alpha(
                  COLORS.bgCard,
                  0.9
                ),
              },
            }}
          >
            <Avatar
              sx={{
                width: 26,
                height: 26,
                fontSize: "0.65rem",
              }}
            >
              {initials}
            </Avatar>

            <Typography
              sx={{
                fontSize: "0.78rem",
                color: COLORS.textSecondary,

                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              {user?.firstName || "User"}
            </Typography>

            <KeyboardArrowDownIcon
              sx={{
                fontSize: 16,
                color: COLORS.textMuted,
              }}
            />
          </Box>
        </Box>
      </Toolbar>

      {/* User dropdown menu */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        {/* User info */}

        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: COLORS.textPrimary,
            }}
          >
            {user?.firstName || "User"}
          </Typography>

          <Typography variant="caption">
            {user?.email}
          </Typography>
        </Box>

        <Divider />

        <MenuItem
          onClick={() => {
            setAnchorEl(null);

            navigate("/dashboard/settings");
          }}
        >
          {/* <PersonOutlineIcon
            sx={{
              fontSize: 16,
              mr: 1.5,
            }}
          /> */}
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);

            navigate("/dashboard/settings");
          }}
        >
          <SettingsOutlinedIcon
            sx={{
              fontSize: 16,
              mr: 1.5,
            }}
          />
          Settings
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{
            color: alpha("#f87171", 0.8),

            "&:hover": {
              background: alpha(
                "#f87171",
                0.08
              ),

              color: "#f87171",
            },
          }}
        >
          <LogoutIcon
            sx={{
              fontSize: 16,
              mr: 1.5,
            }}
          />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default TopNavbar;