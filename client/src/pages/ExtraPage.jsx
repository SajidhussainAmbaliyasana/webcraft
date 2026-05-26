// src/pages/auth/RegisterPage.jsx
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  alpha,
  LinearProgress,
  Grid,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
// import { useRegisterMutation } from "../../features/auth/authApi";
// import { ROUTES } from "../../constants";
import { COLORS } from "../theme";
import useSnackbar from "../hooks/useSnackbar";

// ── password strength helper ──────────────────────────────────
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const map = [
    { label: "Too short", color: "#f87171" },
    { label: "Weak", color: "#fbbf24" },
    { label: "Fair", color: "#fbbf24" },
    { label: "Strong", color: "#34d399" },
    { label: "Very strong", color: "#4fc3f7" },
  ];
  return { score, ...map[score] };
};

// ── decorative helpers (same as login) ───────────────────────
const GridLine = () => (
  <Box sx={{ position: "fixed", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px)`, backgroundSize: "80px 80px", zIndex: 0 }} />
);
const Orb = ({ sx }) => (
  <Box sx={{ position: "fixed", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none", zIndex: 0, ...sx }} />
);

// ── component ─────────────────────────────────────────────────
const ExtraPage = () => {
  //   const navigate = useNavigate();
  //   const notify = useSnackbar();
  //   const [register, { isLoading }] = useRegisterMutation();

  //   const [form, setForm] = useState({ firstName: "", lastName: "", username: "", email: "", phone: "", password: "", confirmPassword: "" });
  //   const [showPass, setShowPass] = useState(false);
  //   const [showConfirm, setShowConfirm] = useState(false);
  //   const [apiError, setApiError] = useState("");
  //   const [fieldErrors, setFieldErrors] = useState({});

  //   const strength = getPasswordStrength(form.password);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setForm((prev) => ({ ...prev, [name]: value }));
  //     if (apiError) setApiError("");
  //     if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  //   };

  //   const validate = () => {
  //     const errors = {};
  //     if (!form.firstName.trim()) errors.firstName = "First name is required.";
  //     if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  //     if (!form.username.trim()) errors.username = "Username is required.";
  //     if (!form.email.trim()) errors.email = "Email is required.";
  //     else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Enter a valid email.";
  //     if (!form.phone.trim()) errors.phone = "Phone number is required.";
  //     if (!form.password) errors.password = "Password is required.";
  //     else if (form.password.length < 6) errors.password = "At least 6 characters.";
  //     if (!form.confirmPassword) errors.confirmPassword = "Please confirm your password.";
  //     else if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  //     return errors;
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const errors = validate();
  //     if (Object.keys(errors).length) { setFieldErrors(errors); return; }

  //     try {
  //       await register({ firstName: form.firstName, lastName: form.lastName, username: form.username, email: form.email, phone: form.phone, password: form.password }).unwrap();
  //       notify.success("Account created! Welcome to Webcraft.");
  //       navigate(ROUTES.DASHBOARD, { replace: true });
  //     } catch (err) {
  //       const msg = err?.data?.message || err?.data?.error || "Registration failed. Please try again.";
  //       setApiError(msg);
  //     }
  //   };

  return (
    <Box sx={{
      display: "flex",
      position: "relative",
      height: "100vh",
      overflow: "hidden",
      justifyContent: "space-between",
    }}>
      <GridLine />
      <Orb sx={{ width: 500, height: 500, top: "-10%", right: "-10%", background: "radial-gradient(#7c4dff, transparent)", opacity: 0.12 }} />
      <Orb sx={{ width: 400, height: 400, bottom: "-10%", left: "-5%", background: "radial-gradient(#f472b6, transparent)", opacity: 0.1 }} />

      {/* ── Left decorative panel ── */}
      <Box sx={{ display: { xs: "none", md: "flex" }, flex: 1, flexDirection: "column", justifyContent: "center", padding: "36px 56px", position: "relative", zIndex: 1, borderRight: `1px solid ${COLORS.borderSubtle}` }}>
        <RouterLink to="/" style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 5 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "linear-gradient(135deg, #4fc3f7, #7c4dff)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", boxShadow: `0 0 24px ${alpha(COLORS.cyan, 0.4)}` }}>W</Box>
            <Typography variant="h5" sx={{ color: COLORS.textPrimary, letterSpacing: "-0.5px" }}>Webcraft</Typography>
          </Box>
        </RouterLink>

        <Typography variant="h2" sx={{ fontSize: "clamp(32px, 3.5vw, 48px)", mb: 2, lineHeight: 1.1 }}>
          Start building<br />
          <Box component="span" sx={{ background: "linear-gradient(90deg, #7c4dff, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            for free.
          </Box>
        </Typography>
        <Typography sx={{ color: COLORS.textSecondary, maxWidth: 360, lineHeight: 1.8, fontSize: "0.95rem" }}>
          Create your account in seconds and start composing beautiful websites with a drag-and-drop visual editor.
        </Typography>

        {/* Feature checklist */}
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {["No credit card required", "Free plan, forever", "40+ ready-made components", "Publish in one click"].map((feat) => (
            <Box key={feat} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 18, color: COLORS.cyan }} />
              <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", color: COLORS.textSecondary }}>{feat}</Typography>
            </Box>
          ))}
        </Box>

        {/* Decorative UI preview */}
        <Box sx={{ mt: 4, p: 2.5, borderRadius: "14px", border: `1px solid ${COLORS.borderSubtle}`, background: alpha(COLORS.bgCard, 0.6), backdropFilter: "blur(20px)", maxWidth: 340 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399" }} />
            <Typography variant="caption">New website created</Typography>
          </Box>
          {["My Portfolio", "E-commerce Store", "Agency Landing"].map((site, i) => (
            <Box key={site} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1, borderBottom: i < 2 ? `1px solid ${COLORS.borderSubtle}` : "none" }}>
              <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.textSecondary }}>{site}</Typography>
              <Box sx={{ px: 1, py: 0.3, borderRadius: "5px", background: alpha(COLORS.green, 0.1), border: `1px solid ${alpha(COLORS.green, 0.3)}` }}>
                <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: COLORS.green }}>Live</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Right: register form ── */}
      <Box sx={{
        width: { xs: "100%", md: "42%" },
        maxWidth: "500px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 1,
        overflowY: "auto",
        "&::-webkit-scrollbar": { width: "3px" },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": { background: "rgba(99,179,237,0.25)", borderRadius: "4px" },
      }}>
        {/* Fixed-height wrapper with padding */}
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", padding: { xs: "40px 24px 48px 24px", md: "52px 48px 48px 48px" }, pr: { md: "44px" } }}>

          {/* Mobile logo */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1.2, mb: 4 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: "9px", background: "linear-gradient(135deg, #4fc3f7, #7c4dff)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>W</Box>
            <Typography variant="h5" sx={{ color: COLORS.textPrimary }}>Webcraft</Typography>
          </Box>

          {/* Heading — always visible, never scrolls away */}
          <Box sx={{ mb: 3, flexShrink: 0 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>GET STARTED</Typography>
            <Typography variant="h3" sx={{ fontSize: "2rem", mb: 1 }}>Create account</Typography>
            <Typography variant="body2">
              Already have an account?{" "}
              <Box component={RouterLink} to="/login" sx={{ color: COLORS.cyan, textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", "&:hover": { opacity: 0.75 } }}>
                Sign in →
              </Box>
            </Typography>
          </Box>

          {/* {apiError && <Alert severity="error" sx={{ mb: 3 }}>{apiError}</Alert>} */}

          <Box component="form"
            // onSubmit={handleSubmit}
            noValidate sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

            {/* ── Row 1: First name + Last name ── */}
            {/* <Grid container spacing={1.5}>
              <Grid item xs={6}>
                <TextField
                  label="First name"
                  name="firstName"
                  // value={form.firstName}
                  // onChange={handleChange}
                  autoComplete="given-name"
                  fullWidth
                  // error={!!fieldErrors.firstName}
                  // helperText={fieldErrors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last name"
                  name="lastName"
                  // value={form.lastName}
                  // onChange={handleChange}
                  autoComplete="family-name"
                  fullWidth
                  // error={!!fieldErrors.lastName}
                  // helperText={fieldErrors.lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid> */} 
            <TextField
                  label="First name"
                  name="firstName"
                  // value={form.firstName}
                  // onChange={handleChange}
                  autoComplete="given-name"
                  fullWidth
                  // error={!!fieldErrors.firstName}
                  // helperText={fieldErrors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                      </InputAdornment>
                    ),
                  }}
                />
            <TextField
              label="Last name"
              name="lastName"
              // value={form.lastName}
              // onChange={handleChange}
              autoComplete="family-name"
              fullWidth
              // error={!!fieldErrors.lastName}
              // helperText={fieldErrors.lastName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* ── Username ── */}
            <TextField
              label="Username"
              name="username"
              // value={form.username}
              // onChange={handleChange}
              autoComplete="username"
              fullWidth
              // error={!!fieldErrors.username}
              // helperText={fieldErrors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* ── Email ── */}
            <TextField
              label="Email address"
              name="email"
              type="email"
              // value={form.email}
              // onChange={handleChange}
              autoComplete="email"
              fullWidth
              // error={!!fieldErrors.email}
              // helperText={fieldErrors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* ── Phone ── */}
            <TextField
              label="Phone number"
              name="phone"
              type="tel"
              // value={form.phone}
              // onChange={handleChange}
              autoComplete="tel"
              fullWidth
              // error={!!fieldErrors.phone}
              // helperText={fieldErrors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlinedIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* ── Password ── */}
            <Box>
              <TextField
                label="Password"
                name="password"
                // type={showPass ? "text" : "password"}
                // value={form.password}
                // onChange={handleChange}
                autoComplete="new-password"
                fullWidth
                // error={!!fieldErrors.password}
                // helperText={fieldErrors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <IconButton onClick={() => setShowPass((p) => !p)} edge="end" sx={{ color: COLORS.textMuted }}>
                        {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton> */}
                    </InputAdornment>
                  ),
                }}
              />
              {/* Password strength bar */}
              {/* {form.password && (
                <Box sx={{ mt: 1, px: 0.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(strength.score / 4) * 100}
                    sx={{
                      height: 3, borderRadius: 2,
                      background: alpha(COLORS.borderSubtle, 0.5),
                      "& .MuiLinearProgress-bar": { background: strength.color, borderRadius: 2 },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: strength.color, mt: 0.5, display: "block" }}>
                    {strength.label}
                  </Typography>
                </Box>
              )} */}
            </Box>

            {/* ── Confirm Password ── */}
            <TextField
              label="Confirm password"
              name="confirmPassword"
              // type={showConfirm ? "text" : "password"}
              // value={form.confirmPassword}
              // onChange={handleChange}
              autoComplete="new-password"
              fullWidth
              // error={!!fieldErrors.confirmPassword}
              // helperText={fieldErrors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {/* <IconButton onClick={() => setShowConfirm((p) => !p)} edge="end" sx={{ color: COLORS.textMuted }}>
                      {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton> */}
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" size="large" fullWidth
              // disabled={isLoading}
              sx={{ mt: 1, height: 50 }}>
              {/* {isLoading
                ? <CircularProgress size={20} thickness={5} sx={{ color: "#fff" }} />
                : "Create account →"
              } */}
            </Button>
          </Box>

          <Divider sx={{ my: 4 }}>
            <Typography variant="caption">or continue with</Typography>
          </Divider>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            {["Google", "GitHub"].map((provider) => (
              <Button key={provider} variant="outlined" fullWidth sx={{ height: 44, fontFamily: "'DM Mono', monospace", fontSize: "0.78rem" }}>
                {provider}
              </Button>
            ))}
          </Box>

          <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 3, color: COLORS.textMuted }}>
            By signing up you agree to our Terms &amp; Privacy Policy.
          </Typography>

        </Box>{/* end inner padding wrapper */}
      </Box>{/* end right panel */}
    </Box>
  );
};

export default ExtraPage;