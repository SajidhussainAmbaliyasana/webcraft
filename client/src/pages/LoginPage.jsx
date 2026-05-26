import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  alpha,
} from "@mui/material";
import LoginBox from '../Components/LoginBox';
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { COLORS } from "../theme";
//import useSnackbar from "../hooks/useSnackbar";

// ── tiny helpers ──────────────────────────────────────────────
const GridLine = () => (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
      zIndex: 0,
    }}
  />
);

const Orb = ({ sx }) => (
  <Box
    sx={{
      position: "fixed",
      borderRadius: "50%",
      filter: "blur(100px)",
      pointerEvents: "none",
      zIndex: 0,
      ...sx,
    }}
  />
);

const LoginPage = () => {
  return (
    <Box sx={{
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      position: "relative",
      justifyContent: "space-between",
    }}>
      <GridLine />
      <Orb sx={{ width: 500, height: 500, top: "-10%", left: "-10%", background: "radial-gradient(#4fc3f7, transparent)", opacity: 0.12 }} />
      <Orb sx={{ width: 400, height: 400, bottom: "-10%", right: "-5%", background: "radial-gradient(#7c4dff, transparent)", opacity: 0.12 }} />

      {/* ── Left decorative panel (hidden on mobile) ── */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
          maxWidth: "58%",
          flexDirection: "column",
          justifyContent: "center",
          padding: "32px 48px",
          position: "relative",
          zIndex: 1,
          borderRight: `1px solid ${COLORS.borderSubtle}`,
        }}
      >
        {/* Logo */}
        <RouterLink to="/" style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 5 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: "10px",
              background: "linear-gradient(135deg, #4fc3f7, #7c4dff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff",
              boxShadow: `0 0 24px ${alpha(COLORS.cyan, 0.4)}`,
            }}>W</Box>
            <Typography variant="h5" sx={{ color: COLORS.textPrimary, letterSpacing: "-0.5px" }}>
              Webcraft
            </Typography>
          </Box>
        </RouterLink>

        <Typography variant="h2" sx={{ fontSize: "clamp(32px, 3.5vw, 48px)", mb: 2, lineHeight: 1.1 }}>
          Build something<br />
          <Box component="span" sx={{ background: "linear-gradient(90deg, #4fc3f7, #7c4dff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            extraordinary.
          </Box>
        </Typography>
        <Typography sx={{ color: COLORS.textSecondary, maxWidth: 360, lineHeight: 1.8, fontSize: "0.95rem" }}>
          The next-generation website builder trusted by designers and developers worldwide.
        </Typography>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 4, mt: 6 }}>
          {[["10k+", "Websites built"], ["99.9%", "Uptime SLA"], ["40+", "Components"]].map(([val, label]) => (
            <Box key={label}>
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: COLORS.textPrimary, letterSpacing: "-1px" }}>{val}</Typography>
              <Typography variant="caption" sx={{ color: COLORS.textMuted }}>{label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Decorative card mockup */}
        <Box sx={{
          mt: 5, p: 2.5, borderRadius: "14px",
          border: `1px solid ${COLORS.borderSubtle}`,
          background: alpha(COLORS.bgCard, 0.6),
          backdropFilter: "blur(20px)",
          maxWidth: 340,
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            {["◻ Hero", "◻ Cards", "◻ Footer"].map((c) => (
              <Typography key={c} variant="caption" sx={{ color: COLORS.textMuted, fontFamily: "'DM Mono', monospace" }}>{c}</Typography>
            ))}
          </Box>
          {[80, 60, 90, 50].map((w, i) => (
            <Box key={i} sx={{ height: 6, width: `${w}%`, borderRadius: 3, background: i === 0 ? alpha(COLORS.cyan, 0.4) : alpha(COLORS.borderSubtle, 0.5), mb: 1.5 }} />
          ))}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Box sx={{ flex: 1, height: 28, borderRadius: "7px", background: "linear-gradient(90deg, #4fc3f7, #7c4dff)", opacity: 0.7 }} />
            <Box sx={{ width: 28, height: 28, borderRadius: "7px", border: `1px solid ${COLORS.borderSubtle}` }} />
          </Box>
        </Box>
      </Box>

      {/* ── Right: login form ── */}
      <Box
        sx={{
          width: { xs: "100%", md: "42%" },
          maxWidth: "520px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: { xs: "24px 20px", md: "40px 36px" },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Mobile logo */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1.2, mb: 6 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: "9px", background: "linear-gradient(135deg, #4fc3f7, #7c4dff)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>W</Box>
          <Typography variant="h5" sx={{ color: COLORS.textPrimary }}>Webcraft</Typography>
        </Box>

        {/* Heading */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>WELCOME BACK</Typography>
          <Typography variant="h3" sx={{ fontSize: "2rem", mb: 1 }}>Sign in</Typography>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Box component={RouterLink} to="/signup" sx={{ color: COLORS.cyan, textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", "&:hover": { opacity: 0.75 } }}>
              Create one →
            </Box>
          </Typography>
        </Box>

       <LoginBox/>

        <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 3, color: COLORS.textMuted }}>
          By signing in you agree to our Terms &amp; Privacy Policy.
        </Typography>
      </Box>
    </Box>
  )
}

export default LoginPage
