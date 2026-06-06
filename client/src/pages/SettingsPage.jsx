// src/pages/SettingsPage.jsx
import { useState, useEffect } from "react";
import {
  Box, Typography, Card, CardContent, TextField, Button,
  Divider, Avatar, Alert, CircularProgress, alpha, Tabs, Tab,
  Chip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import useSnackbar from "../hooks/useSnackbar";
import { COLORS } from "../theme";
import {
  useMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
  useCreateCheckoutSessionMutation
} from "../redux/api/authApi";

// ─── helpers ──────────────────────────────────────────
const accent = {
  cyan: "#22d3ee",
  purple: "#a78bfa",
  amber: "#fbbf24",
  red: "#f87171",
  green: "#34d399",
};

const iconBox = (color) => ({
  width: 32, height: 32, borderRadius: "8px", flexShrink: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 15,
  background: alpha(color, 0.1),
  border: `1px solid ${alpha(color, 0.18)}`,
  color,
});

// ─── Section card ──────────────────────────────────────
const SectionCard = ({ icon, iconColor = accent.cyan, title, subtitle, children, sx }) => (
  <Card sx={{ background: "#141820", border: `1px solid rgba(255,255,255,0.07)`, borderRadius: "12px", overflow: "hidden", ...sx }}>
    <CardContent sx={{ p: 0 }}>
      <Box sx={{ px: 3, pt: 2.5, pb: 2, borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={iconBox(iconColor)}>{icon}</Box>
        <Box>
          <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#e2e8f0" }}>{title}</Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "#475569", mt: 0.25 }}>{subtitle}</Typography>
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>{children}</Box>
    </CardContent>
  </Card>
);

// ─── Info row ──────────────────────────────────────────
const InfoRow = ({ icon, label, value, mono }) => (
  <Box sx={{ display: "flex", alignItems: "center", py: 1.25, borderBottom: "1px solid rgba(255,255,255,0.04)", "&:last-child": { borderBottom: "none" } }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, width: 130, flexShrink: 0, color: "#475569", fontSize: "0.75rem" }}>
      {icon}
      <Typography sx={{ fontSize: "0.75rem", color: "#475569" }}>{label}</Typography>
    </Box>
    <Typography sx={{ fontSize: "0.8125rem", color: "#94a3b8", fontFamily: mono ? "'DM Mono', monospace" : "inherit" }}>
      {value}
    </Typography>
  </Box>
);

// ─── Plan card ────────────────────────────────────────
const PlanCard = ({ name, price, badge, badgeColor, features, isCurrent, isFeatured, isLocked, onUpgrade }) => (
  <Box sx={{
    flex: 1, border: `1px solid`,
    borderColor: isCurrent ? alpha(accent.cyan, 0.3) : isFeatured ? alpha(accent.purple, 0.35) : "rgba(255,255,255,0.07)",
    borderRadius: "10px", p: 2,
    background: isCurrent ? alpha(accent.cyan, 0.03) : isFeatured ? alpha(accent.purple, 0.04) : "transparent",
    display: "flex", flexDirection: "column",
  }}>
    <Chip
      label={badge}
      size="small"
      sx={{
        alignSelf: "flex-start", mb: 1, height: 20, fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.5px",
        background: alpha(badgeColor, 0.1), color: badgeColor,
        border: `1px solid ${alpha(badgeColor, 0.2)}`, borderRadius: "20px",
      }}
    />
    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#e2e8f0" }}>{name}</Typography>
    <Typography sx={{ fontSize: "1.375rem", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.05em", mt: 0.25 }}>
      {price}<Typography component="span" sx={{ fontSize: "0.75rem", fontWeight: 400, color: "#475569" }}>/mo</Typography>
    </Typography>
    <Divider sx={{ my: 1.25, borderColor: "rgba(255,255,255,0.05)" }} />
    {features.map(({ label, included }) => (
      <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75 }}>
        <Box sx={{ fontSize: 12, color: included ? accent.green : "#334155", display: "flex" }}>
          {included ? <CheckIcon sx={{ fontSize: 12 }} /> : <Box sx={{ width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✕</Box>}
        </Box>
        <Typography sx={{ fontSize: "0.6875rem", color: included ? "#64748b" : "#334155" }}>{label}</Typography>
      </Box>
    ))}
    <Button
      size="small"
      disabled={isCurrent || isLocked}
      onClick={onUpgrade}
      sx={{
        mt: "auto", pt: 1.5, borderRadius: "7px", fontSize: "0.75rem", fontWeight: 500, textTransform: "none",
        background: isCurrent ? alpha(accent.cyan, 0.08) : "transparent",
        border: `1px solid`,
        borderColor: isCurrent ? alpha(accent.cyan, 0.2) : isFeatured ? alpha(accent.purple, 0.3) : alpha(accent.amber, 0.2),
        color: isCurrent ? accent.cyan : isFeatured ? accent.purple : accent.amber,
        "&:hover": { background: isCurrent ? undefined : alpha(isFeatured ? accent.purple : accent.amber, 0.1) },
        "&.Mui-disabled": { color: accent.cyan, border: `1px solid ${alpha(accent.cyan, 0.2)}` },
      }}
    >
      {isCurrent
        ? "Current plan"
        : isLocked
          ? "Not Available"
          : `Upgrade to ${name} →`}
    </Button>
  </Box>
);

// ─── Main page ────────────────────────────────────────
const SettingsPage = () => {
  const notify = useSnackbar();
  const [activeTab, setActiveTab] = useState(0);

  // TODO: replace with useGetCurrentUserQuery
  const { data, isLoading } = useMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    status: "",
    lastLoginAt: null,
    subscription: {
      plan: "free",
      startedAt: null,
      expiresAt: null,
    },
  });

  useEffect(() => {
    if (data?.success) {
      setProfile({
        firstName: data.data.firstName || "",
        lastName: data.data.lastName || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        username: data.data.username || "",
        status: data.data.status || "",
        lastLoginAt: data.data.lastLoginAt || null,
        subscription: data.data.subscription || {
          plan: "free",
          startedAt: null,
          expiresAt: null,
        },
      });
    }
  }, [data]);

  const [profileLoading, setProfileLoading] = useState(false);
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "Your Name";
  const initials = [profile.firstName?.[0], profile.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "?";
  const planLabel = { free: "Free plan", pro: "Pro plan", business: "Business plan" }[profile.subscription?.plan] ?? "Free plan";
  const currentPlan =
    profile.subscription?.plan || "free";

  const handleProfileChange = (e) => setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handlePasswordChange = (e) => { setPassword((p) => ({ ...p, [e.target.name]: e.target.value })); if (passwordError) setPasswordError(""); };

  const handleProfileSave = async () => {
    try {
      setProfileLoading(true);

      const response = await updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        username: profile.username,
      }).unwrap();

      notify.success(
        response?.message || "Profile updated successfully."
      );
    } catch (error) {
      notify.error(
        error?.data?.message || "Failed to update profile."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSave = async () => {
    if (!password.current) {
      setPasswordError("Current password is required.");
      return;
    }

    if (password.next.length < 6) {
      setPasswordError(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (password.next !== password.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await updatePassword({
        currentPassword: password.current,
        newPassword: password.next,
      }).unwrap();

      setPassword({
        current: "",
        next: "",
        confirm: "",
      });

      notify.success(
        response?.message || "Password updated successfully."
      );
    } catch (error) {
      notify.error(
        error?.data?.message || "Failed to update password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteAccount().unwrap();

      notify.success(
        response?.message || "Account deleted successfully."
      );

      // Later:
      // await logout().unwrap();
      // navigate("/login");
      setPassword({
        current: "",
        next: "",
        confirm: "",
      });

      setPasswordError("");
    } catch (error) {
      notify.error(
        error?.data?.message || "Failed to delete account."
      );
    }
  };

  const handleUpgrade = async (plan) => {
    try {



      const response =
        await createCheckoutSession({
          plan: plan.toLowerCase(),
        }).unwrap();

      window.location.href = response.url;

    } catch (error) {
      notify.error(
        error?.data?.message ||
        "Failed to start checkout."
      );
    }
  };

  const planOrder = {
    free: 0,
    pro: 1,
    business: 2,
  };

  const PLANS = [
    {
      name: "Free", price: "$0", badge: "Current", badgeColor: accent.cyan,
      isCurrent: profile.subscription?.plan === "free",
      features: [
        { label: "50 tasks / month", included: true },
        { label: "1 workspace", included: true },
        { label: "Analytics", included: false },
        { label: "Priority support", included: false },
      ],
    },
    {
      name: "Pro", price: "$12", badge: "Popular", badgeColor: accent.purple, isFeatured: true,
      isCurrent: profile.subscription?.plan === "pro",
      features: [
        { label: "Unlimited tasks", included: true },
        { label: "5 workspaces", included: true },
        { label: "Analytics", included: true },
        { label: "Priority support", included: false },
      ],
    },
    {
      name: "Business", price: "$29", badge: "Teams", badgeColor: accent.amber,
      isCurrent: profile.subscription?.plan === "business",
      features: [
        { label: "Unlimited tasks", included: true },
        { label: "Unlimited workspaces", included: true },
        { label: "Advanced analytics", included: true },
        { label: "Priority support", included: true },
      ],
    },
  ];



  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>

      {/* Header */}
      <Box sx={{ mb: 2.5 }}>
        <Typography sx={{ fontSize: "0.6875rem", letterSpacing: "1.5px", color: accent.cyan, textTransform: "uppercase", fontWeight: 500, mb: 0.75 }}>
          Account
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", fontWeight: 600, color: "#f1f5f9", letterSpacing: "-0.025em" }}>
          Settings
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{
          mb: 3,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          "& .MuiTab-root": { textTransform: "none", fontSize: "0.9375rem", color: "#64748b", minWidth: 0, px: 2.5, py: 1.5, fontWeight: 500 },
          "& .Mui-selected": { color: `${accent.cyan} !important` },
          "& .MuiTabs-indicator": { backgroundColor: accent.cyan },
        }}
      >
        <Tab label="Profile" />
        <Tab label="Security" />
        <Tab label="Subscription" />
        <Tab label="Danger zone" />
      </Tabs>

      {/* ── Profile tab ── */}
      {activeTab === 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 620 }}>

          {/* User info display */}
          <SectionCard icon={<AccountCircleOutlinedIcon sx={{ fontSize: 16 }} />} title="Your profile" subtitle="Your current account information">
            {/* Avatar row */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5, pb: 2.5, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Avatar sx={{ width: 50, height: 50, background: "linear-gradient(135deg, #0e7490, #7c3aed)", fontSize: "0.9375rem", fontWeight: 600 }}>
                {initials}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9" }}>{fullName}</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#475569", mt: 0.25 }}>{profile.email || "your@email.com"}</Typography>
                <Chip
                  label={<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><Box sx={{ width: 5, height: 5, borderRadius: "50%", background: accent.cyan }} />{planLabel}</Box>}
                  size="small"
                  sx={{ mt: 0.75, height: 20, fontSize: "0.6875rem", background: alpha(accent.cyan, 0.08), color: accent.cyan, border: `1px solid ${alpha(accent.cyan, 0.18)}`, borderRadius: "20px" }}
                />
              </Box>
            </Box>

            {/* Info rows */}
            <InfoRow
              icon={<AlternateEmailIcon sx={{ fontSize: 14 }} />}
              label="Email"
              value={profile.email || "—"}
            />

            <InfoRow
              icon={<AccountCircleOutlinedIcon sx={{ fontSize: 14 }} />}
              label="Username"
              value={profile.username ? `@${profile.username}` : "—"}
              mono
            />

            <InfoRow
              icon={<PhoneOutlinedIcon sx={{ fontSize: 14 }} />}
              label="Phone"
              value={profile.phone || "—"}
            />

            <InfoRow
              icon={<CheckIcon sx={{ fontSize: 14 }} />}
              label="Status"
              value={profile.status || "—"}
            />

            <InfoRow
              icon={<AccessTimeOutlinedIcon sx={{ fontSize: 14 }} />}
              label="Last login"
              value={
                profile.lastLoginAt
                  ? new Date(profile.lastLoginAt).toLocaleString()
                  : "—"
              }
            />
          </SectionCard>

          {/* Edit profile */}
          <SectionCard icon={<EditOutlinedIcon sx={{ fontSize: 16 }} />} title="Edit profile" subtitle="Update your personal information">
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
              <TextField label="First name" name="firstName" value={profile.firstName} onChange={handleProfileChange} size="small" fullWidth />
              <TextField label="Last name" name="lastName" value={profile.lastName} onChange={handleProfileChange} size="small" fullWidth />
              <TextField label="Email address" name="email" type="email" value={profile.email} onChange={handleProfileChange} size="small" fullWidth />
              <TextField label="Phone number" name="phone" type="tel" value={profile.phone} onChange={handleProfileChange} size="small" fullWidth />
              <TextField
                label="Username" name="username" value={profile.username} onChange={handleProfileChange}
                size="small" fullWidth sx={{ gridColumn: "1 / -1" }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 1.25, mt: 2.5 }}>
              <Button
                variant="contained"
                startIcon={profileLoading ? <CircularProgress size={13} sx={{ color: "#0b0d12" }} /> : <CheckIcon sx={{ fontSize: 15 }} />}
                onClick={handleProfileSave}
                disabled={profileLoading}
                sx={{ background: accent.cyan, color: "#0b0d12", textTransform: "none", fontSize: "0.8125rem", "&:hover": { background: "#67e8f9" } }}
              >
                Save changes
              </Button>
              {/* <Button
                variant="outlined"
                onClick={() => setProfile((p) => ({ ...p, firstName: "", lastName: "", email: "", phone: "", username: "" }))}
                sx={{ textTransform: "none", fontSize: "0.8125rem", borderColor: "rgba(255,255,255,0.1)", color: "#94a3b8", "&:hover": { borderColor: "rgba(255,255,255,0.2)" } }}
              >
                Discard
              </Button> */}
            </Box>
          </SectionCard>
        </Box>
      )}

      {/* ── Security tab ── */}
      {activeTab === 1 && (
        <Box sx={{ maxWidth: 620 }}>
          <SectionCard icon={<LockOutlinedIcon sx={{ fontSize: 16 }} />} iconColor={accent.purple} title="Change password" subtitle="Update your account password">
            {/* Status hint */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1.25, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", mb: 2 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: accent.green, flexShrink: 0 }} />
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>Keep your account secure with a strong password</Typography>
            </Box>

            {passwordError && <Alert severity="error" sx={{ mb: 2, fontSize: "0.8125rem" }}>{passwordError}</Alert>}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <TextField label="Current password" name="current" type="password" value={password.current} onChange={handlePasswordChange} size="small" fullWidth />
              <TextField label="New password" name="next" type="password" value={password.next} onChange={handlePasswordChange} size="small" fullWidth helperText="At least 6 characters." />
              <TextField label="Confirm new password" name="confirm" type="password" value={password.confirm} onChange={handlePasswordChange} size="small" fullWidth />
            </Box>
            <Box sx={{ mt: 2.5 }}>
              <Button
                variant="contained"
                startIcon={passwordLoading ? <CircularProgress size={13} sx={{ color: "#0b0d12" }} /> : <LockOutlinedIcon sx={{ fontSize: 15 }} />}
                onClick={handlePasswordSave}
                disabled={passwordLoading}
                sx={{ background: accent.purple, color: "#0b0d12", textTransform: "none", fontSize: "0.8125rem", "&:hover": { background: "#c4b5fd" } }}
              >
                Update password
              </Button>
            </Box>
          </SectionCard>
        </Box>
      )}

      {/* ── Subscription tab ── */}
      {activeTab === 2 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 620 }}>

          {/* Current plan */}
          <SectionCard icon={<WorkspacePremiumOutlinedIcon sx={{ fontSize: 16 }} />} iconColor={accent.amber} title="Current plan" subtitle="Your active subscription">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1.25, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", mb: 2 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: accent.green, flexShrink: 0 }} />
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b", flex: 1 }}>
                {planLabel} — active since {
                  profile.subscription?.startedAt
                    ? new Date(profile.subscription.startedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )
                    : "N/A"
                }
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                {profile.subscription?.expiresAt ? `Expires ${new Date(profile.subscription.expiresAt).toLocaleDateString()}` : "No expiry"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {[
                { icon: "📅", label: profile.subscription?.plan === "free" ? "No renewal" : "Monthly" },
                { icon: "🗂", label: profile.subscription?.plan === "business" ? "Unlimited workspaces" : profile.subscription?.plan === "pro" ? "5 workspaces" : "1 workspace" },
                { icon: "✅", label: profile.subscription?.plan === "free" ? "50 tasks / mo" : "Unlimited tasks" },
              ].map(({ icon, label }) => (
                <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 0.75, px: 1.25, py: 0.625, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
                  <Typography sx={{ fontSize: "0.75rem", color: "#475569" }}>{icon} {label}</Typography>
                </Box>
              ))}
            </Box>
          </SectionCard>

          {/* Plan upgrade cards */}
          <SectionCard icon={<DiamondOutlinedIcon sx={{ fontSize: 16 }} />} iconColor={accent.purple} title="Upgrade plan" subtitle="Choose a plan that fits your workflow">
            <Box sx={{ display: "flex", gap: 1.25 }}>
              {PLANS.map((plan) => (
                <PlanCard
                  key={plan.name}
                  {...plan}
                  isLocked={
                    planOrder[plan.name.toLowerCase()] <
                    planOrder[currentPlan]
                  }
                  onUpgrade={() => handleUpgrade(plan.name)}
                />
              ))}
            </Box>
          </SectionCard>
        </Box>
      )}

      {/* ── Danger zone tab ── */}
      {activeTab === 3 && (
        <Box sx={{ maxWidth: 620 }}>
          <Card sx={{ background: "#141820", border: `1px solid ${alpha(accent.red, 0.15)}`, borderRadius: "12px" }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ px: 3, pt: 2.5, pb: 2, borderBottom: `1px solid ${alpha(accent.red, 0.08)}`, display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={iconBox(accent.red)}><WarningAmberOutlinedIcon sx={{ fontSize: 16 }} /></Box>
                <Box>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: accent.red }}>Danger zone</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#475569", mt: 0.25 }}>Irreversible actions — proceed with caution</Typography>
                </Box>
              </Box>
              <Box sx={{ p: 3, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: "0.8125rem", color: "#e2e8f0", mb: 0.5 }}>Delete account</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#475569", lineHeight: 1.6 }}>
                    Permanently removes your account, all tasks, and workspaces.<br />This action cannot be undone.
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    flexShrink: 0, textTransform: "none", fontSize: "0.8125rem",
                    borderColor: alpha(accent.red, 0.25), color: accent.red,
                    "&:hover": { borderColor: accent.red, background: alpha(accent.red, 0.06) },
                  }}
                  onClick={handleDeleteAccount}
                >
                  Delete account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

    </Box>
  );
};

export default SettingsPage;