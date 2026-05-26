// src/components/ui/GlobalSnackbar.jsx
import { Snackbar, Alert, alpha } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar, selectSnackbar } from "../../redux/slices/uiSlice";
import { COLORS } from "../../theme";

const SEVERITY_STYLES = {
  success: { border: `1px solid ${alpha("#34d399", 0.3)}`, bg: alpha("#34d399", 0.08) },
  error:   { border: `1px solid ${alpha("#f87171", 0.3)}`, bg: alpha("#f87171", 0.08) },
  warning: { border: `1px solid ${alpha("#fbbf24", 0.3)}`, bg: alpha("#fbbf24", 0.08) },
  info:    { border: `1px solid ${alpha("#4fc3f7", 0.3)}`, bg: alpha("#4fc3f7", 0.08) },
};

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(selectSnackbar);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    dispatch(hideSnackbar());
  };

  const styles = SEVERITY_STYLES[severity] || SEVERITY_STYLES.info;

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="outlined"
        sx={{
          background: styles.bg,
          border: styles.border,
          color: COLORS.textPrimary,
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.78rem",
          borderRadius: "10px",
          backdropFilter: "blur(20px)",
          "& .MuiAlert-icon": { opacity: 0.85 },
          "& .MuiAlert-action button": { color: COLORS.textMuted },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;