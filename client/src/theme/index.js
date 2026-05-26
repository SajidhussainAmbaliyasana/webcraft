// src/theme/index.js
import { createTheme, alpha } from "@mui/material/styles";

const COLORS = {
  bg: "#060812",
  bgSurface: "#0c1022",
  bgCard: "#0f1428",
  bgCardHover: "#141830",
  borderSubtle: "rgba(99,179,237,0.1)",
  borderMid: "rgba(99,179,237,0.18)",
  cyan: "#4fc3f7",
  purple: "#7c4dff",
  pink: "#f472b6",
  green: "#34d399",
  textPrimary: "#e8f4fd",
  textSecondary: "rgba(232,244,253,0.5)",
  textMuted: "rgba(232,244,253,0.25)",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: COLORS.cyan,
      dark: "#0ea5e9",
      light: "#7dd3fc",
      contrastText: "#060812",
    },
    secondary: {
      main: COLORS.purple,
      contrastText: "#fff",
    },
    background: {
      default: COLORS.bg,
      paper: COLORS.bgCard,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
      disabled: COLORS.textMuted,
    },
    divider: COLORS.borderSubtle,
    error: { main: "#f87171" },
    success: { main: COLORS.green },
    warning: { main: "#fbbf24" },
    info: { main: COLORS.cyan },
  },

  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      letterSpacing: "-3px",
      color: COLORS.textPrimary,
    },
    h2: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      letterSpacing: "-2px",
      color: COLORS.textPrimary,
    },
    h3: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      letterSpacing: "-1px",
      color: COLORS.textPrimary,
    },
    h4: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h5: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.8rem",
      letterSpacing: "0.5px",
      color: COLORS.textSecondary,
    },
    subtitle2: {
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.7rem",
      letterSpacing: "1px",
      color: COLORS.textMuted,
      textTransform: "uppercase",
    },
    body1: {
      fontFamily: "'DM Sans', sans-serif",
      color: COLORS.textSecondary,
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: "'DM Sans', sans-serif",
      color: COLORS.textMuted,
      fontSize: "0.82rem",
    },
    caption: {
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.7rem",
      color: COLORS.textMuted,
      letterSpacing: "0.5px",
    },
    button: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 600,
      letterSpacing: "-0.2px",
    },
  },

  shape: { borderRadius: 10 },

  shadows: [
    "none",
    `0 1px 3px rgba(0,0,0,0.4)`,
    `0 2px 8px rgba(0,0,0,0.5)`,
    `0 4px 16px rgba(0,0,0,0.5)`,
    `0 8px 24px rgba(0,0,0,0.5)`,
    `0 12px 40px rgba(0,0,0,0.6)`,
    `0 0 0 1px ${COLORS.borderSubtle}, 0 8px 32px rgba(0,0,0,0.6)`,
    `0 0 40px rgba(79,195,247,0.12)`,
    `0 0 60px rgba(124,77,255,0.15)`,
    ...Array(16).fill("none"),
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@import":
          "url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap')",
        html: { scrollBehavior: "smooth" },
        body: {
          background: COLORS.bg,
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 10% 20%, rgba(79,195,247,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 10%, rgba(124,77,255,0.06) 0%, transparent 60%)
          `,
          backgroundAttachment: "fixed",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { background: COLORS.bg },
          "&::-webkit-scrollbar-thumb": {
            background: COLORS.borderMid,
            borderRadius: 3,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9,
          textTransform: "none",
          transition: "all 0.2s ease",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          "&:focus-visible": {
            outline: `2px solid ${COLORS.cyan}`,
            outlineOffset: 2,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`,
          color: "#fff",
          boxShadow: `0 0 24px ${alpha(COLORS.cyan, 0.25)}`,
          "&:hover": {
            background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`,
            boxShadow: `0 4px 32px ${alpha(COLORS.cyan, 0.4)}`,
            transform: "translateY(-1px)",
          },
          "&:active": { transform: "translateY(0)" },
        },
        outlinedPrimary: {
          border: `1px solid ${COLORS.borderMid}`,
          color: COLORS.textSecondary,
          "&:hover": {
            border: `1px solid ${alpha(COLORS.cyan, 0.5)}`,
            background: alpha(COLORS.cyan, 0.06),
            color: COLORS.textPrimary,
          },
        },
        sizeLarge: { padding: "12px 28px", fontSize: "0.95rem" },
        sizeMedium: { padding: "9px 20px" },
        sizeSmall: { padding: "6px 14px", fontSize: "0.8rem" },
      },
    },

    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: alpha(COLORS.bgSurface, 0.8),
            borderRadius: 10,
            fontFamily: "'DM Sans', sans-serif",
            "& fieldset": { border: `1px solid ${COLORS.borderSubtle}` },
            "&:hover fieldset": { border: `1px solid ${COLORS.borderMid}` },
            "&.Mui-focused fieldset": {
              border: `1px solid ${alpha(COLORS.cyan, 0.5)}`,
              boxShadow: `0 0 0 3px ${alpha(COLORS.cyan, 0.08)}`,
            },
            "& input": {
              color: COLORS.textPrimary,
              "&:-webkit-autofill": {
                WebkitBoxShadow: `0 0 0 100px ${COLORS.bgSurface} inset`,
                WebkitTextFillColor: COLORS.textPrimary,
              },
            },
          },
          "& .MuiInputLabel-root": {
            color: COLORS.textMuted,
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.82rem",
            "&.Mui-focused": { color: COLORS.cyan },
          },
          "& .MuiFormHelperText-root": {
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: COLORS.bgCard,
          border: `1px solid ${COLORS.borderSubtle}`,
          borderRadius: 14,
          backdropFilter: "blur(20px)",
          transition: "all 0.2s ease",
          "&:hover": {
            border: `1px solid ${COLORS.borderMid}`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${COLORS.borderMid}`,
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          background: COLORS.bgCard,
          backgroundImage: "none",
          border: `1px solid ${COLORS.borderSubtle}`,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: COLORS.bgSurface,
          borderRight: `1px solid ${COLORS.borderSubtle}`,
          backgroundImage: "none",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: alpha(COLORS.bg, 0.85),
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${COLORS.borderSubtle}`,
          boxShadow: "none",
          backgroundImage: "none",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.5px",
          borderRadius: 6,
          border: `1px solid ${COLORS.borderSubtle}`,
          background: alpha(COLORS.bgSurface, 0.8),
        },
        colorPrimary: {
          background: alpha(COLORS.cyan, 0.1),
          border: `1px solid ${alpha(COLORS.cyan, 0.3)}`,
          color: COLORS.cyan,
        },
        colorSuccess: {
          background: alpha(COLORS.green, 0.1),
          border: `1px solid ${alpha(COLORS.green, 0.3)}`,
          color: COLORS.green,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: COLORS.bgCard,
          border: `1px solid ${COLORS.borderMid}`,
          color: COLORS.textPrimary,
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          borderRadius: 7,
          boxShadow: `0 8px 24px rgba(0,0,0,0.5)`,
        },
        arrow: { color: COLORS.bgCard },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: COLORS.borderSubtle },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 9,
          margin: "2px 8px",
          transition: "all 0.15s ease",
          "&:hover": {
            background: alpha(COLORS.cyan, 0.06),
          },
          "&.Mui-selected": {
            background: alpha(COLORS.cyan, 0.1),
            borderLeft: `2px solid ${COLORS.cyan}`,
            "&:hover": { background: alpha(COLORS.cyan, 0.12) },
            "& .MuiListItemIcon-root": { color: COLORS.cyan },
            "& .MuiListItemText-primary": { color: COLORS.textPrimary },
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: { color: COLORS.textMuted, minWidth: 40 },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.82rem",
          color: COLORS.textSecondary,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "0.85rem",
        },
      },
    },

    MuiSkeleton: {
      styleOverrides: {
        root: {
          background: alpha(COLORS.borderSubtle, 0.5),
          "&::after": {
            background: `linear-gradient(90deg, transparent, ${alpha(COLORS.borderMid, 0.3)}, transparent)`,
          },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.78rem",
          border: `1px solid`,
        },
        standardError: {
          background: alpha("#f87171", 0.08),
          borderColor: alpha("#f87171", 0.2),
          color: "#fca5a5",
        },
        standardSuccess: {
          background: alpha(COLORS.green, 0.08),
          borderColor: alpha(COLORS.green, 0.2),
          color: COLORS.green,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.78rem",
          letterSpacing: "0.5px",
          textTransform: "none",
          color: COLORS.textMuted,
          "&.Mui-selected": { color: COLORS.textPrimary },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple})`,
          height: 2,
          borderRadius: 1,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          background: COLORS.bgCard,
          border: `1px solid ${COLORS.borderMid}`,
          borderRadius: 16,
          boxShadow: `0 32px 80px rgba(0,0,0,0.7)`,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          background: COLORS.bgCard,
          border: `1px solid ${COLORS.borderMid}`,
          borderRadius: 12,
          boxShadow: `0 16px 48px rgba(0,0,0,0.6)`,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.8rem",
          color: COLORS.textSecondary,
          borderRadius: 7,
          margin: "2px 6px",
          "&:hover": {
            background: alpha(COLORS.cyan, 0.06),
            color: COLORS.textPrimary,
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: COLORS.cyan,
            "& + .MuiSwitch-track": {
              background: alpha(COLORS.cyan, 0.4),
            },
          },
        },
        track: { background: COLORS.borderSubtle },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: COLORS.textMuted,
          "&.Mui-checked": { color: COLORS.cyan },
        },
      },
    },
  },
});

export default theme;
export { COLORS };