import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  Avatar,
  Divider,
  alpha,
  IconButton,
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useDispatch, useSelector } from "react-redux";

import {
  toggleSidebar,
  setSidebarMobileOpen,
  selectSidebarCollapsed,
  selectSidebarMobileOpen,
} from "../redux/slices/uiSlice";

import { useLogoutMutation } from '../redux/api/authApi'
import { baseApi } from "../redux/api/baseApi";

import {
  ROUTES,
  SIDEBAR_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
} from "../constants";

import { COLORS } from "../theme";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: <DashboardOutlinedIcon fontSize="small" />,
    path: ROUTES.DASHBOARD,
  },
  {
    label: "Websites",
    icon: <LanguageIcon fontSize="small" />,
    path: ROUTES.WEBSITES,
  },
  {
    label: "Editor",
    icon: <EditNoteIcon fontSize="small" />,
    path: "/dashboard/editor",
  },
  {
    label: "Settings",
    icon: <SettingsOutlinedIcon fontSize="small" />,
    path: ROUTES.SETTINGS,
  },
];

const Logo = ({ collapsed }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      px: collapsed ? 1.5 : 2.5,
      py: 2.5,
      mb: 1,
    }}
  >
    <Box
      sx={{
        width: 34,
        height: 34,
        borderRadius: "10px",
        flexShrink: 0,
        background: "linear-gradient(135deg, #4fc3f7, #7c4dff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 16,
        color: "#fff",
        boxShadow: `0 0 20px ${alpha(COLORS.cyan, 0.35)}`,
      }}
    >
      W
    </Box>

    {!collapsed && (
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "1.1rem",
          color: COLORS.textPrimary,
          letterSpacing: "-0.5px",
        }}
      >
        WebCraft
      </Typography>
    )}
  </Box>
);

const UserCard = ({ user, collapsed }) => {

  const initials = user?.firstName?.charAt(0).toUpperCase() || "?";

  return (
    <Box
      sx={{
        mx: collapsed ? 1 : 1.5,
        mb: 1.5,
        p: collapsed ? 1 : 1.5,
        borderRadius: "10px",
        border: `1px solid ${COLORS.borderSubtle}`,
        background: alpha(COLORS.bgCard, 0.5),
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        overflow: "hidden",
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          fontSize: "0.75rem",
          flexShrink: 0,
        }}
      >
        {initials}
      </Avatar>

      {!collapsed && (
        <Box sx={{ overflow: "hidden" }}>
          <Typography
            sx={{
              fontSize: "0.78rem",
              color: COLORS.textPrimary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user?.firstName || "User"}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {user?.email || ""}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const SidebarContent = ({ collapsed, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleNav = (path) => {
    navigate(path);
    dispatch(setSidebarMobileOpen(false));
  };
  const handleLogout = async () => {
    try {
      await logout().unwrap();

      dispatch(baseApi.util.resetApiState());

      navigate(ROUTES.LOGIN, { replace: true });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        py: 1,
      }}
    >
      <Logo collapsed={collapsed} />

      <Divider sx={{ mb: 1 }} />

      {!collapsed && (
        <Typography
          variant="subtitle2"
          sx={{
            px: 3,
            mb: 0.5,
            mt: 1,
          }}
        >
          NAVIGATION
        </Typography>
      )}

      <List sx={{ flex: 1, px: 0.5 }}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== ROUTES.DASHBOARD &&
              location.pathname.startsWith(item.path));

          const btn = (
            <ListItemButton
              key={item.label}
              selected={isActive}
              onClick={() => handleNav(item.path)}
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 1.5 : 2,
                minHeight: 44,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? "unset" : 40,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText primary={item.label} />
              )}
            </ListItemButton>
          );

          return collapsed ? (
            <Tooltip
              key={item.label}
              title={item.label}
              placement="right"
              arrow
            >
              {btn}
            </Tooltip>
          ) : (
            btn
          );
        })}
      </List>


      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ mb: 1 }} />

        <UserCard
          user={user}
          collapsed={collapsed}
        />

        {collapsed ? (
          <Tooltip title="Logout" placement="right" arrow>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                justifyContent: "center",
                mx: 0.5,
                mb: 1,
                borderRadius: "9px",
                minHeight: 44,

                "&:hover": {
                  background: alpha("#f87171", 0.08),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  justifyContent: "center",
                  color: alpha("#f87171", 0.6),
                }}
              >
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        ) : (
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 0.5,
              mb: 1,
              borderRadius: "9px",
              minHeight: 44,

              "&:hover": {
                background: alpha("#f87171", 0.08),
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: alpha("#f87171", 0.6),
              }}
            >
              <LogoutIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText
              primary="Logout"
              sx={{
                "& .MuiListItemText-primary": {
                  color: alpha("#f87171", 0.7),
                  fontSize: "0.82rem",
                },
              }}
            />
          </ListItemButton>
        )}
      </Box>
    </Box>
  );
};

const SideBar = ({ user }) => {
  const dispatch = useDispatch();

  const collapsed = useSelector(
    selectSidebarCollapsed
  );

  const mobileOpen = useSelector(
    selectSidebarMobileOpen
  );

  const drawerWidth = collapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_WIDTH;

  const collapseBtn = (
    <IconButton
      onClick={() => dispatch(toggleSidebar())}
      size="small"
      sx={{
        position: "absolute",
        top: 72,
        right: -16,
        zIndex: 1400,
        width: 28,
        height: 28,
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.borderMid}`,
        color: COLORS.textMuted,
        boxShadow: "0 4px 12px rgba(0,0,0,0.35)",


        "&:hover": {
          background: COLORS.bgCardHover,
          color: COLORS.textPrimary,
        },

        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      {collapsed ? (
        <ChevronRightIcon sx={{ fontSize: 16 }} />
      ) : (
        <ChevronLeftIcon sx={{ fontSize: 16 }} />
      )}
    </IconButton>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() =>
          dispatch(setSidebarMobileOpen(false))
        }
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <SidebarContent collapsed={collapsed} user={user} />
      </Drawer>


      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",

          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {collapseBtn}

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            transition: "width 0.2s ease",

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              overflowX: "hidden",
              transition: "width 0.2s ease",
            },
          }}
        >
          <SidebarContent collapsed={collapsed} user={user} />
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;