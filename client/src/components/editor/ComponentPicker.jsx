// src/components/editor/ComponentPicker.jsx
import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, Box,
  Typography, TextField, InputAdornment, alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { COMPONENT_TYPES } from "./componentRegistry";
import { COLORS } from "../../theme";

const ComponentPicker = ({ open, onClose, onSelect }) => {
  const [search, setSearch] = useState("");

  const filtered = COMPONENT_TYPES.filter(
    (c) =>
      c.label.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (type) => {
    onSelect(type);
    setSearch("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 0 }}>
        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: COLORS.textPrimary, mb: 0.5 }}>
          Add Component
        </Typography>
        <Typography variant="caption">
          Choose a component type to add to this page.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Search */}
        <TextField
          placeholder="Search components…"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 17, color: COLORS.textMuted }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
          {filtered.map((c) => (
            <Box
              key={c.type}
              onClick={() => handleSelect(c.type)}
              sx={{
                p: 2, borderRadius: "10px", cursor: "pointer",
                border: `1px solid ${COLORS.borderSubtle}`,
                background: alpha(COLORS.bgCard, 0.5),
                transition: "all 0.15s",
                "&:hover": {
                  border: `1px solid ${alpha(COLORS.cyan, 0.35)}`,
                  background: alpha(COLORS.cyan, 0.04),
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Box sx={{
                width: 36, height: 36, borderRadius: "9px", mb: 1.2,
                background: alpha(COLORS.cyan, 0.08),
                border: `1px solid ${alpha(COLORS.cyan, 0.2)}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: COLORS.cyan,
              }}>
                {c.icon}
              </Box>
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: COLORS.textPrimary, mb: 0.3 }}>
                {c.label}
              </Typography>
              <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: COLORS.textMuted }}>
                {c.description}
              </Typography>
            </Box>
          ))}

          {filtered.length === 0 && (
            <Box sx={{ gridColumn: "span 2", py: 4, textAlign: "center" }}>
              <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: COLORS.textMuted }}>
                No components match "{search}"
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentPicker;