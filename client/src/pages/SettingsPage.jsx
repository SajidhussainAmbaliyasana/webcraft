// src/pages/SettingsPage.jsx
import { useState } from "react";
import {
  Box, Typography, Card, CardContent,
  TextField, Button, Divider, Avatar,
  Alert, CircularProgress, alpha,
} from "@mui/material";
import SaveOutlinedIcon  from "@mui/icons-material/SaveOutlined";
import LockOutlinedIcon  from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import useSnackbar       from "../hooks/useSnackbar";
import { COLORS }        from "../theme";


// ── Section card ──────────────────────────────────────
const SectionCard = ({ icon, title, subtitle, children, accent }) => (
  <Card sx={{ position: "relative", overflow: "hidden" }}>
    {accent && (
      <Box sx={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 50% at 100% 0%, ${alpha(accent, 0.06)} 0%, transparent 70%)`,
      }} />
    )}
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.75 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: "9px", flexShrink: 0,
          background: accent ? alpha(accent, 0.12) : alpha(COLORS.borderSubtle, 0.5),
          border: `1px solid ${accent ? alpha(accent, 0.25) : COLORS.borderSubtle}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: accent || COLORS.textMuted,
        }}>
          {icon}
        </Box>
        <Box>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: COLORS.textPrimary }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.78rem" }}>{subtitle}</Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 2.5 }} />
      {children}
    </CardContent>
  </Card>
);

// ── Main page ─────────────────────────────────────────
const SettingsPage = () => {
  const notify = useSnackbar();

  // Profile state — pre-filled from user object
  // TODO: replace with real user data from useGetCurrentUserQuery
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [profileLoading, setProfileLoading] = useState(false);

  // Password state
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleProfileChange = (e) => setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handlePasswordChange = (e) => {
    setPassword((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (passwordError) setPasswordError("");
  };

  const handleProfileSave = async () => {
    setProfileLoading(true);
    // TODO: call updateProfile API mutation here
    setTimeout(() => {
      setProfileLoading(false);
      notify.success("Profile updated.");
    }, 800);
  };

  const handlePasswordSave = async () => {
    if (!password.current) { setPasswordError("Current password is required."); return; }
    if (password.next.length < 6) { setPasswordError("New password must be at least 6 characters."); return; }
    if (password.next !== password.confirm) { setPasswordError("Passwords do not match."); return; }
    setPasswordLoading(true);
    // TODO: call updatePassword API mutation here
    setTimeout(() => {
      setPasswordLoading(false);
      setPassword({ current: "", next: "", confirm: "" });
      notify.success("Password updated.");
    }, 800);
  };

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>ACCOUNT</Typography>
        <Typography variant="h3" sx={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>Settings</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 660 }}>

        {/* ── Profile ── */}
        <SectionCard icon={<PersonIcon sx={{ fontSize: 18 }} />} title="Profile" subtitle="Update your personal information." accent={COLORS.cyan}>
          {/* Avatar */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Avatar sx={{ width: 52, height: 52, fontSize: "1rem" }}>{initials}</Avatar>
            <Box>
              <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: COLORS.textPrimary, mb: 0.2 }}>
                {profile.name || "Your Name"}
              </Typography>
              <Typography variant="caption">{profile.email || "your@email.com"}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              fullWidth
            />
            <TextField
              label="Email address"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              fullWidth
            />
          </Box>

          <Button
            variant="contained"
            startIcon={profileLoading ? <CircularProgress size={14} sx={{ color: "#fff" }} /> : <SaveOutlinedIcon />}
            onClick={handleProfileSave}
            disabled={profileLoading}
            sx={{ mt: 3 }}
          >
            Save changes
          </Button>
        </SectionCard>

        {/* ── Password ── */}
        <SectionCard icon={<LockOutlinedIcon sx={{ fontSize: 18 }} />} title="Password" subtitle="Change your account password." accent={COLORS.purple}>
          {passwordError && <Alert severity="error" sx={{ mb: 2 }}>{passwordError}</Alert>}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Current password"
              name="current"
              type="password"
              value={password.current}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              label="New password"
              name="next"
              type="password"
              value={password.next}
              onChange={handlePasswordChange}
              fullWidth
              helperText="At least 6 characters."
            />
            <TextField
              label="Confirm new password"
              name="confirm"
              type="password"
              value={password.confirm}
              onChange={handlePasswordChange}
              fullWidth
            />
          </Box>

          <Button
            variant="outlined"
            startIcon={passwordLoading ? <CircularProgress size={14} /> : <LockOutlinedIcon />}
            onClick={handlePasswordSave}
            disabled={passwordLoading}
            sx={{ mt: 3 }}
          >
            Update password
          </Button>
        </SectionCard>

        {/* ── Danger zone ── */}
        <Card sx={{ border: `1px solid ${alpha("#f87171", 0.2)}` }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 0.5, fontSize: "1rem", color: "#f87171" }}>Danger Zone</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>Irreversible actions — proceed with caution.</Typography>
            <Divider sx={{ mb: 2.5, borderColor: alpha("#f87171", 0.15) }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: "0.85rem", color: COLORS.textSecondary, mb: 0.3 }}>Delete account</Typography>
                <Typography variant="caption">Permanently deletes your account and all websites.</Typography>
              </Box>
              <Button
                variant="outlined"
                sx={{ borderColor: alpha("#f87171", 0.3), color: "#f87171", "&:hover": { borderColor: "#f87171", background: alpha("#f87171", 0.08) } }}
                onClick={() => notify.error("Account deletion — connect to your backend API.")}
              >
                Delete account
              </Button>
            </Box>
          </CardContent>
        </Card>

      </Box>
    </Box>
  );
};

export default SettingsPage;