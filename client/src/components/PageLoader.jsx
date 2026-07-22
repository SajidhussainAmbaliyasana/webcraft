// src/components/common/PageLoader.jsx
// Option 1 — Logo Pulse loader
// Usage: <Suspense fallback={<PageLoader />}>

import { Box, Typography, alpha } from "@mui/material";

const PageLoader = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#060812",
        gap: 2,
      }}
    >
      {/* Pulsing logo box */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "14px",
          background: "linear-gradient(135deg, #4fc3f7, #7c4dff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "24px",
          color: "#fff",
          animation: "logoPulse 1.8s ease-in-out infinite",
          "@keyframes logoPulse": {
            "0%, 100%": {
              transform: "scale(1)",
              boxShadow: "0 0 0 0 rgba(79,195,247,0.4)",
            },
            "50%": {
              transform: "scale(1.08)",
              boxShadow: "0 0 0 16px rgba(79,195,247,0)",
            },
          },
        }}
      >
        W
      </Box>

      {/* Brand name fading in/out */}
      <Typography
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          color: "rgba(232,244,253,0.4)",
          letterSpacing: "-0.3px",
          animation: "fadeInOut 1.8s ease-in-out infinite",
          "@keyframes fadeInOut": {
            "0%, 100%": { opacity: 0.4 },
            "50%":       { opacity: 1   },
          },
        }}
      >
        Webcraft
      </Typography>
    </Box>
  );
};

export default PageLoader;