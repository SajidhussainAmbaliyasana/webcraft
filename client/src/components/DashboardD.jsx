import { useNavigate } from "react-router-dom";

import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  alpha,
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
//import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
//import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";

import { ROUTES } from "../constants";
import { COLORS } from "../theme";

/* ── Stat Card ─────────────────────────────────────── */
const StatCard = ({ label, value, icon, accent }) => (
  <Card sx={{ position: "relative", overflow: "hidden", height: "100%" }}>
    {accent && (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 80% 60% at 100% 0%, ${alpha(accent, 0.08)} 0%, transparent 70%)`,
        }}
      />
    )}
    <CardContent sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Typography variant="subtitle2">{label}</Typography>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "9px",
            flexShrink: 0,
            background: accent ? alpha(accent, 0.12) : alpha(COLORS.borderSubtle, 0.5),
            border: `1px solid ${accent ? alpha(accent, 0.25) : COLORS.borderSubtle}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent || COLORS.textMuted,
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: "2rem",
          letterSpacing: "-1px",
          color: COLORS.textPrimary,
        }}
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

/* ── Quick Action Row ───────────────────────────────── */
const QuickAction = ({ label, description, icon, accent, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 2,
      py: 1.5,
      px: 2,
      borderRadius: "10px",
      border: `1px solid ${COLORS.borderSubtle}`,
      background: alpha(COLORS.bgCard, 0.4),
      transition: "all 0.18s",
      "&:hover": {
        border: `1px solid ${accent ? alpha(accent, 0.35) : COLORS.borderMid}`,
        background: alpha(COLORS.bgCardHover, 0.6),
        transform: "translateY(-1px)",
      },
    }}
  >
    <Box
      sx={{
        width: 38,
        height: 38,
        borderRadius: "10px",
        flexShrink: 0,
        background: accent
          ? `linear-gradient(135deg, ${accent}, ${COLORS.purple})`
          : alpha(COLORS.borderSubtle, 0.5),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      {icon}
    </Box>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "0.88rem",
          color: COLORS.textPrimary,
          mb: 0.25,
        }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "0.76rem" }}>
        {description}
      </Typography>
    </Box>
    <ArrowForwardIcon sx={{ fontSize: 15, color: COLORS.textMuted, flexShrink: 0 }} />
  </Box>
);

/* ── Activity Item ──────────────────────────────────── */
const ActivityItem = ({ label, time, icon, accent }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      py: 1.4,
      px: 2,
      borderRadius: "10px",
      border: `1px solid ${COLORS.borderSubtle}`,
      background: alpha(COLORS.bgCard, 0.4),
    }}
  >
    <Box
      sx={{
        width: 34,
        height: 34,
        borderRadius: "9px",
        flexShrink: 0,
        background: accent ? alpha(accent, 0.12) : alpha(COLORS.borderSubtle, 0.5),
        border: `1px solid ${accent ? alpha(accent, 0.25) : COLORS.borderSubtle}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: accent || COLORS.textMuted,
      }}
    >
      {icon}
    </Box>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "0.85rem",
          color: COLORS.textPrimary,
          mb: 0.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "0.72rem" }}>
        {time}
      </Typography>
    </Box>
  </Box>
);

/* ── Main Dashboard ─────────────────────────────────── */
const DashboardD = () => {
  const navigate = useNavigate();

  const user = { name: "Sajid Hussain" };
  const websites = [];

  const firstName = user?.name?.split(" ")[0] || "there";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const totalPages = 0;
  const totalViews = 0;
  const publishedCount = 0;

  const recentActivity = [
    {
      label: "Portfolio site published",
      time: "2 min ago",
      //icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />,
      accent: COLORS.green,
    },
    {
      label: "Hero section updated",
      time: "18 min ago",
      icon: <EditNoteIcon sx={{ fontSize: 16 }} />,
      accent: COLORS.purple,
    },
    {
      label: "New page created",
      time: "1 hr ago",
      //icon: <AddCircleOutlineIcon sx={{ fontSize: 16 }} />,
      accent: COLORS.cyan,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* ── Header ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            {greeting.toUpperCase()}
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", mb: 0.5 }}
          >
            {greeting}, {firstName} 👋
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
            Here's what's happening with your websites today.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(ROUTES.WEBSITES)}
          sx={{ height: 44, whiteSpace: "nowrap" }}
        >
          New Website
        </Button>
      </Box>

      {/* ── Stat Cards ── */}

      <Box
        sx={{
          display: "flex",
          gap: 2.5,
          flexWrap: "wrap",
          justifyContent: "space-between",
          mb: 3.5,

          boxSizing: "border-box",
        }}
      >
        {[
          {
            label: "TOTAL WEBSITES",
            value: websites.length,
            icon: <LanguageIcon sx={{ fontSize: 18 }} />,
            accent: COLORS.cyan,
          },
          {
            label: "TOTAL PAGES",
            value: totalPages,
            icon: <EditNoteIcon sx={{ fontSize: 18 }} />,
            accent: COLORS.purple,
          },
          {
            label: "TOTAL VIEWS",
            value: totalViews,
            icon: <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />,
            accent: COLORS.pink,
          },
          {
            label: "PUBLISHED",
            value: publishedCount,
            icon: <TrendingUpIcon sx={{ fontSize: 18 }} />,
            accent: COLORS.green,
          },
        ].map((s) => (
          <Box
            key={s.label}
            sx={{
              flex: "1 1 240px",
              minWidth: "240px",
            }}
          >
            <StatCard {...s} />
          </Box>
        ))}
      </Box>

      {/* ── Quick Actions + Recent Activity ── */}
      {/* <Grid container spacing={2.5} sx={{ width: "100%", mx: 0,border:"10px solid red",boxSizing:"border-box" }}>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 0.5, fontSize: "1rem" }}>
                Quick Actions
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 2.5,
                  fontSize: "0.72rem",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                Jump right into building
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                <QuickAction
                  label="Create a new website"
                  description="Start from scratch or use a template"
                  icon={<AddIcon sx={{ fontSize: 18 }} />}
                  accent={COLORS.cyan}
                  onClick={() => navigate(ROUTES.WEBSITES)}
                />
                <QuickAction
                  label="Manage websites"
                  description="View, edit and publish your websites"
                  icon={<LanguageIcon sx={{ fontSize: 18 }} />}
                  accent={COLORS.purple}
                  onClick={() => navigate(ROUTES.WEBSITES)}
                />
                <QuickAction
                  label="Open editor"
                  description="Visual component-based editor"
                  icon={<EditNoteIcon sx={{ fontSize: 18 }} />}
                  onClick={() => navigate(ROUTES.WEBSITES)}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  Recent Activity
                </Typography>
                <Chip label="Today" size="small" color="primary" />
              </Box>

              <Typography
                variant="body2"
                sx={{
                  mb: 2.5,
                  fontSize: "0.72rem",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                Latest changes
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                {recentActivity.map((item) => (
                  <ActivityItem key={item.label} {...item} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
      <Box
        sx={{
          display: "flex",
          gap: 2.5,
          flexWrap: "wrap",
          boxSizing: "border-box",
        }}
      >
        {/* Quick Actions */}

        <Box
          sx={{
            flex: "2 1 600px",
            minWidth: "320px",
          }}
        >
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 0.5, fontSize: "1rem" }}
              >
                Quick Actions
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: 2.5,
                  fontSize: "0.72rem",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                Jump right into building
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25,
                }}
              >
                <QuickAction
                  label="Create a new website"
                  description="Start from scratch or use a template"
                  icon={<AddIcon sx={{ fontSize: 18 }} />}
                  accent={COLORS.cyan}
                  onClick={() =>
                    navigate(ROUTES.WEBSITES)
                  }
                />

                <QuickAction
                  label="Manage websites"
                  description="View, edit and publish your websites"
                  icon={
                    <LanguageIcon
                      sx={{ fontSize: 18 }}
                    />
                  }
                  accent={COLORS.purple}
                  onClick={() =>
                    navigate(ROUTES.WEBSITES)
                  }
                />

                <QuickAction
                  label="Open editor"
                  description="Visual component-based editor"
                  icon={
                    <EditNoteIcon
                      sx={{ fontSize: 18 }}
                    />
                  }
                  onClick={() =>
                    navigate(ROUTES.WEBSITES)
                  }
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Recent Activity */}

        <Box
          sx={{
            flex: "1 1 360px",
            minWidth: "320px",
          }}
        >
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1rem" }}
                >
                  Recent Activity
                </Typography>

                <Chip
                  label="Today"
                  size="small"
                  color="primary"
                />
              </Box>

              <Typography
                variant="body2"
                sx={{
                  mb: 2.5,
                  fontSize: "0.72rem",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                Latest changes
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25,
                }}
              >
                {recentActivity.map((item) => (
                  <ActivityItem
                    key={item.label}
                    {...item}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Card
        sx={{
          mt: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",

            background: `radial-gradient(
              ellipse 60% 80% at 100% 50%,
              ${alpha(COLORS.purple, 0.12)}
              0%,
              transparent 70%
            )`,
          }}
        />

        <CardContent
          sx={{
            p: 3,

            display: "flex",
            justifyContent:
              "space-between",

            alignItems: "center",

            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 0.5 }}
            >
              Ready to build?
            </Typography>

            <Typography variant="body2">
              Create your first website and
              experience the future of web
              building.
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={
              <RocketLaunchOutlinedIcon />
            }
            onClick={() =>
              navigate(ROUTES.WEBSITES)
            }
          >
            Start building
          </Button>
        </CardContent>
      </Card>

    </Box>

  );
};

export default DashboardD;