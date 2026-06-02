// src/components/ConfirmDialog.jsx
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Button, CircularProgress, Box, alpha,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { COLORS } from "../theme";

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  danger       = false,
  loading      = false,
  onConfirm,
  onClose,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ pb: 0.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: "9px",
          background: danger ? alpha("#f87171", 0.1) : alpha(COLORS.cyan, 0.1),
          border: `1px solid ${danger ? alpha("#f87171", 0.3) : alpha(COLORS.cyan, 0.25)}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <WarningAmberIcon sx={{ fontSize: 18, color: danger ? "#f87171" : COLORS.cyan }} />
        </Box>
        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: COLORS.textPrimary }}>
          {title}
        </Typography>
      </Box>
    </DialogTitle>

    <DialogContent sx={{ pt: 2 }}>
      <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.7 }}>
        {description}
      </Typography>
    </DialogContent>

    <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
      <Button variant="outlined" onClick={onClose} disabled={loading}>Cancel</Button>
      <Button
        variant="contained" onClick={onConfirm} disabled={loading}
        sx={danger ? { background: alpha("#f87171", 0.9), "&:hover": { background: "#f87171" } } : {}}
      >
        {loading
          ? <CircularProgress size={18} thickness={5} sx={{ color: "#fff" }} />
          : confirmLabel
        }
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;