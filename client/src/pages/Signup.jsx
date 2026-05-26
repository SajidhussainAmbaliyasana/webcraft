
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, alpha } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import { COLORS } from "../theme";
import SignupBox from "../components/SignupBox";



// ── decorative helpers (same as login) ───────────────────────
const GridLine = () => (
    <Box sx={{ position: "fixed", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px)`, backgroundSize: "80px 80px", zIndex: 0 }} />
);
const Orb = ({ sx }) => (
    <Box sx={{ position: "fixed", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none", zIndex: 0, ...sx }} />
);

// ── component ─────────────────────────────────────────────────
const Signup = () => {
   

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
      <SignupBox/>
      {/* end right panel */}
    </Box>
    );
};

export default Signup;