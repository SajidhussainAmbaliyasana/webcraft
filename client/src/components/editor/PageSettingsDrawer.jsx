// src/components/editor/PageSettingsDrawer.jsx
import { useState, useEffect } from "react";
import {
  Drawer, Box, Typography, Divider, IconButton,
  Select, MenuItem, FormControl, InputLabel,
  Button, alpha, Tooltip,
} from "@mui/material";
import CloseIcon       from "@mui/icons-material/Close";
import RestartAltIcon  from "@mui/icons-material/RestartAlt";
import { COLORS } from "../../theme";

const FONT_OPTIONS = [
  { value: "'DM Sans', sans-serif",       label: "DM Sans (Default)"      },
  { value: "'Inter', sans-serif",          label: "Inter"                  },
  { value: "'Syne', sans-serif",           label: "Syne"                   },
  { value: "'Georgia', serif",             label: "Georgia (Serif)"        },
  { value: "'Playfair Display', serif",    label: "Playfair Display"       },
  { value: "'Roboto Mono', monospace",     label: "Roboto Mono"            },
  { value: "'Space Grotesk', sans-serif",  label: "Space Grotesk"          },
  { value: "'Poppins', sans-serif",        label: "Poppins"                },
];

export const PRESET_THEMES = [
  { label: "Dark",       bg: "#060812", text: "#e8f4fd", accent: "#4fc3f7", cardBg: "#0f1428", border: "rgba(99,179,237,0.12)"   },
  { label: "Light",      bg: "#ffffff", text: "#0f172a", accent: "#3b82f6", cardBg: "#f8fafc", border: "#e2e8f0"                  },
  { label: "Warm White", bg: "#fafaf8", text: "#1c1917", accent: "#f97316", cardBg: "#f5f5f0", border: "#e7e5e4"                  },
  { label: "Slate",      bg: "#0f172a", text: "#f1f5f9", accent: "#818cf8", cardBg: "#1e293b", border: "rgba(148,163,184,0.15)"   },
  { label: "Forest",     bg: "#0d1f17", text: "#d1fae5", accent: "#34d399", cardBg: "#132619", border: "rgba(52,211,153,0.15)"    },
  { label: "Rose",       bg: "#fff1f2", text: "#1f0a0d", accent: "#f43f5e", cardBg: "#ffe4e6", border: "#fecdd3"                  },
  { label: "Midnight",   bg: "#0a0a0f", text: "#e2e2ff", accent: "#7c4dff", cardBg: "#10101a", border: "rgba(124,77,255,0.2)"    },
  { label: "Sand",       bg: "#fdf8f0", text: "#3d2c1e", accent: "#d97706", cardBg: "#fef3e2", border: "#fde68a"                  },
];

const SWATCHES = [
  "#ffffff","#f8fafc","#0f172a","#060812",
  "#4fc3f7","#7c4dff","#f472b6","#34d399",
  "#fbbf24","#f87171","#60a5fa","#a78bfa",
];

const ColorField = ({ label, value, onChange }) => (
  <Box sx={{ mb: 2 }}>
    <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 0.75 }}>
      {label}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ width: 28, height: 28, borderRadius: "7px", background: value, border: `1px solid ${alpha(COLORS.borderMid, 0.8)}`, flexShrink: 0 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, flex: 1 }}>
        {SWATCHES.map((c) => (
          <Box key={c} onClick={() => onChange(c)} sx={{ width: 18, height: 18, borderRadius: "4px", background: c, border: value === c ? `2px solid ${COLORS.cyan}` : `1px solid rgba(255,255,255,0.12)`, cursor: "pointer", transition: "transform 0.1s", "&:hover": { transform: "scale(1.2)" } }} />
        ))}
      </Box>
    </Box>
    <Box
      component="input"
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mt: 0.75, width: "100%", height: 30, borderRadius: "7px", border: `1px solid ${COLORS.borderSubtle}`, background: "transparent", cursor: "pointer", padding: "2px" }}
    />
  </Box>
);

const PageSettingsDrawer = ({ open, onClose, theme: initialTheme, onSave }) => {
  const [theme, setTheme] = useState(initialTheme || PRESET_THEMES[0]);

  useEffect(() => {
    if (initialTheme) setTheme(initialTheme);
  }, [initialTheme, open]);

  const set = (key, val) => setTheme((p) => ({ ...p, [key]: val }));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          background: COLORS.bgSurface,
          border: `1px solid ${COLORS.borderSubtle}`,
          borderRadius: "16px 0 0 16px",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ px: 2.5, py: 2, borderBottom: `1px solid ${COLORS.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Box>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: COLORS.textPrimary }}>Page Theme</Typography>
          <Typography variant="caption">Colors, fonts &amp; layout</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="Reset to dark default" arrow>
            <IconButton size="small" onClick={() => setTheme(PRESET_THEMES[0])} sx={{ color: COLORS.textMuted }}>
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton size="small" onClick={onClose} sx={{ color: COLORS.textMuted }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: "auto", p: 2.5 }}>

        {/* Preset themes */}
        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 1.5 }}>PRESET THEMES</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 3 }}>
          {PRESET_THEMES.map((p) => (
            <Box
              key={p.label}
              onClick={() => setTheme(p)}
              sx={{
                p: 1.2, borderRadius: "9px", cursor: "pointer",
                border: `1px solid ${theme.label === p.label ? COLORS.cyan : COLORS.borderSubtle}`,
                background: p.bg,
                transition: "all 0.15s",
                "&:hover": { border: `1px solid ${alpha(COLORS.cyan, 0.5)}` },
              }}
            >
              <Box sx={{ display: "flex", gap: 0.75, mb: 0.75 }}>
                {[p.text, p.accent, p.cardBg].map((c, i) => (
                  <Box key={i} sx={{ width: 14, height: 14, borderRadius: "3px", background: c, border: "1px solid rgba(0,0,0,0.1)" }} />
                ))}
              </Box>
              <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: p.text, opacity: 0.8 }}>
                {p.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        {/* Custom colors */}
        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 1.5 }}>CUSTOM COLORS</Typography>
        <ColorField label="PAGE BACKGROUND" value={theme.bg}      onChange={(v) => set("bg", v)}      />
        <ColorField label="TEXT COLOR"       value={theme.text}    onChange={(v) => set("text", v)}    />
        <ColorField label="ACCENT / PRIMARY" value={theme.accent}  onChange={(v) => set("accent", v)}  />
        <ColorField label="CARD BACKGROUND"  value={theme.cardBg}  onChange={(v) => set("cardBg", v)}  />

        <Divider sx={{ my: 2 }} />

        {/* Font */}
        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 1.5 }}>TYPOGRAPHY</Typography>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem" }}>Body Font</InputLabel>
          <Select value={theme.fontFamily || "'DM Sans', sans-serif"} label="Body Font" onChange={(e) => set("fontFamily", e.target.value)} sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem" }}>
            {FONT_OPTIONS.map((f) => (
              <MenuItem key={f.value} value={f.value} sx={{ fontFamily: f.value, fontSize: "0.82rem" }}>{f.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* Live preview */}
        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 1.5 }}>PREVIEW</Typography>
        <Box sx={{ borderRadius: "10px", overflow: "hidden", border: `1px solid ${theme.border || COLORS.borderSubtle}`, background: theme.bg }}>
          <Box sx={{ p: 1.5, background: theme.cardBg, borderBottom: `1px solid ${theme.border || COLORS.borderSubtle}` }}>
            <Typography sx={{ fontFamily: theme.fontFamily || "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: theme.text }}>Page Title</Typography>
          </Box>
          <Box sx={{ p: 1.5 }}>
            <Typography sx={{ fontFamily: theme.fontFamily || "'DM Sans', sans-serif", fontSize: "0.75rem", color: theme.text, opacity: 0.7, lineHeight: 1.6, mb: 1 }}>
              This is how your body text looks with this theme.
            </Typography>
            <Box sx={{ display: "inline-block", px: 1.5, py: 0.5, borderRadius: "6px", background: theme.accent }}>
              <Typography sx={{ fontFamily: theme.fontFamily, fontSize: "0.7rem", color: "#fff", fontWeight: 700 }}>Button</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2.5, borderTop: `1px solid ${COLORS.borderSubtle}`, flexShrink: 0, display: "flex", gap: 1 }}>
        <Button variant="outlined" fullWidth onClick={onClose}>Cancel</Button>
        <Button variant="contained" fullWidth onClick={() => { onSave(theme); onClose(); }}>Apply Theme</Button>
      </Box>
    </Drawer>
  );
};

export default PageSettingsDrawer;