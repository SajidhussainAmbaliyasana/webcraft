import { useNavigate } from "react-router-dom";

import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
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
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { useGetStatsQuery } from "../redux/api/authApi";
import { useMeQuery } from "../redux/api/authApi";
import { ROUTES } from "../constants";
import { COLORS } from "../theme";
import { SUBSCRIPTION_PLANS } from "../constants";

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

  // const user = { name: "Sajid Hussain" };
  // const websites = [];
  const { data, isLoading } = useGetStatsQuery();

  const user = data?.data?.user;

  const totalWebsites = data?.data?.totalWebsites || 0;

  const totalPages = data?.data?.totalPages || 0;

  const publishedCount = data?.data?.publishedWebsites || 0;

  const firstName = user?.firstName || "John";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";


  const { data: userData } = useMeQuery();
  const subscriptionData = userData?.data?.subscription;

const startedAt = subscriptionData?.startedAt
  ? new Date(subscriptionData.startedAt)
  : null;

const expiresAt = subscriptionData?.expiresAt
  ? new Date(subscriptionData.expiresAt)
  : null;

const daysLeft = expiresAt
  ? Math.max(
      0,
      Math.ceil(
        (expiresAt - new Date()) /
          (1000 * 60 * 60 * 24)
      )
    )
  : 0;

const renewalDate = expiresAt
  ? expiresAt.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  : "No expiry";

let periodPercent = 0;

if (startedAt && expiresAt) {
  const totalDays =
    (expiresAt - startedAt) /
    (1000 * 60 * 60 * 24);

  const usedDays =
    totalDays - daysLeft;

  periodPercent = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (usedDays / totalDays) * 100
      )
    )
  );
}
 const plan = userData?.data?.subscription?.plan || "free";

  const websiteCount =
    userData?.data?.websiteCount || 0;
 const subscription =
  SUBSCRIPTION_PLANS[plan] ||
  SUBSCRIPTION_PLANS.free;

  

  console.log("plan =", plan);
  console.log("subscription =", subscription);

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
            value: totalWebsites,
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

      {/* ── Quick Actions + Subscription ── */}

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

        {/* Current Subscription — replaces Recent Activity */}

        <Box
          sx={{
            flex: "1 1 360px",
            minWidth: "320px",
          }}
        >
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>

              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1rem" }}
                >
                  Current Subscription
                </Typography>
                <Chip label="Active" size="small" color="success" />
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
                Plan details
              </Typography>

              {/* Plan badge row */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                  py: 1.5,
                  borderRadius: "10px",
                  border: `1px solid ${alpha(COLORS.purple, 0.3)}`,
                  background: alpha(COLORS.purple, 0.07),
                  mb: 1.5,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: COLORS.textMuted,
                      mb: 0.3,
                    }}
                  >
                    Your plan
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: COLORS.textPrimary,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {subscription.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "20px",
                    background: `linear-gradient(135deg, ${COLORS.purple}, ${alpha(COLORS.cyan, 0.8)})`,
                  }}
                >
                  <WorkspacePremiumOutlinedIcon sx={{ fontSize: 14, color: "#fff" }} />
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {subscription.name.toUpperCase()}
                  </Typography>
                </Box>
              </Box>

              {/* Info rows */}
              <Box
                sx={{
                  borderRadius: "10px",
                  border: `1px solid ${COLORS.borderSubtle}`,
                  background: alpha(COLORS.bgCard, 0.4),
                  px: 1.5,
                  mb: 1.5,
                }}
              >
                {[
                  {
                    icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 15 }} />,
                    label: "Billing cycle",
                    value: plan === "free" ? "Free" : "Monthly",
                  },
                  {
                    icon: <CreditCardOutlinedIcon sx={{ fontSize: 15 }} />,
                    label: "Amount",
                    value: `${subscription.price} / month`,
                  },
                  {
                    icon: <LanguageIcon sx={{ fontSize: 15 }} />,
                    label: "Websites",
                    value: `${websiteCount} of ${subscription.websiteLimit} used`
                  },
                ].map((row, i, arr) => (
                  <Box key={row.label}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: COLORS.textMuted }}>
                        {row.icon}
                        <Typography variant="body2" sx={{ fontSize: "0.8rem", color: COLORS.textMuted }}>
                          {row.label}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: COLORS.textPrimary }}>
                        {row.value}
                      </Typography>
                    </Box>
                    {i < arr.length - 1 && (
                      <Box sx={{ borderTop: `1px solid ${COLORS.borderSubtle}` }} />
                    )}
                  </Box>
                ))}
              </Box>

              

              {/* Renewal date */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                  py: 1.4,
                  borderRadius: "10px",
                  border: `1px solid ${COLORS.borderSubtle}`,
                  background: alpha(COLORS.bgCard, 0.4),
                  mb: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      background: alpha(COLORS.cyan, 0.1),
                      border: `1px solid ${alpha(COLORS.cyan, 0.25)}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: COLORS.cyan,
                    }}
                  >
                    <AutorenewOutlinedIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "0.7rem", color: COLORS.textMuted, mb: 0.2 }}>
                      Renews on
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: COLORS.textPrimary }}>
                      {renewalDate}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={`${daysLeft}d left`}
                  size="small"
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    background: alpha(COLORS.cyan, 0.1),
                    color: COLORS.cyan,
                    border: `1px solid ${alpha(COLORS.cyan, 0.25)}`,
                  }}
                />
              </Box>

              {/* Upgrade button */}
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: alpha(COLORS.purple, 0.4),
                  color: COLORS.purple,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  py: 1,
                  "&:hover": {
                    borderColor: COLORS.purple,
                    background: alpha(COLORS.purple, 0.06),
                  },
                }}
              >
                Upgrade plan
              </Button>

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