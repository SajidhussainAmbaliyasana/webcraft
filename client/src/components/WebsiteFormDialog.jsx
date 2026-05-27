// src/components/WebsiteFormDialog.jsx
import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, CircularProgress, Box, alpha,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { COLORS } from "../theme";

const WebsiteFormDialog = ({ open, onClose, onSubmit, website = null, loading = false }) => {
  const isEdit = !!website;

  const [form, setForm]     = useState({ name: "", subdomain: "", description: "" });
  const [errors, setErrors] = useState({});

  // Reset form when dialog opens
  useEffect(() => {
    if (website) {
      setForm({ name: website.name || "", subdomain: website.subdomain || "", description: website.description || "" });
    } else {
      setForm({ name: "", subdomain: "", description: "" });
    }
    setErrors({});
  }, [website, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-generate subdomain from name when creating
    if (name === "name" && !isEdit) {
      const sub = value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setForm((p) => ({ ...p, name: value, subdomain: sub }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }

    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())      errs.name      = "Website name is required.";
    if (!form.subdomain.trim()) errs.subdomain = "Subdomain is required.";
    else if (!/^[a-z0-9-]+$/.test(form.subdomain))
      errs.subdomain = "Only lowercase letters, numbers, and hyphens.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: "9px",
            background: alpha(COLORS.cyan, 0.1),
            border: `1px solid ${alpha(COLORS.cyan, 0.25)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <LanguageIcon sx={{ fontSize: 18, color: COLORS.cyan }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: COLORS.textPrimary }}>
              {isEdit ? "Edit Website" : "Create New Website"}
            </Typography>
            <Typography variant="caption">
              {isEdit ? "Update your website details." : "Start building a new website."}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          label="Website Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          autoFocus
          error={!!errors.name}
          helperText={errors.name || "e.g. My Portfolio, Agency Site"}
        />

        <TextField
          label="Subdomain"
          name="subdomain"
          value={form.subdomain}
          onChange={handleChange}
          fullWidth
          error={!!errors.subdomain}
          helperText={errors.subdomain || `Your site: webcraft.io/${form.subdomain || "your-site"}`}
          InputProps={{
            startAdornment: (
              <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: COLORS.textMuted, mr: 0.5, whiteSpace: "nowrap" }}>
                webcraft.io/
              </Typography>
            ),
          }}
        />

        <TextField
          label="Description (optional)"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={2}
          helperText="A short description of what this website is about."
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading
            ? <CircularProgress size={18} thickness={5} sx={{ color: "#fff" }} />
            : isEdit ? "Save Changes" : "Create Website"
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WebsiteFormDialog;