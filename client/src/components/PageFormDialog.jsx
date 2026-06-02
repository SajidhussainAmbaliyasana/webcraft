// src/components/PageFormDialog.jsx
import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, CircularProgress,
  Box, FormControlLabel, Switch, alpha,
} from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { COLORS } from "../theme";

const PageFormDialog = ({ open, onClose, onSubmit, page = null, loading = false }) => {
  const isEdit = !!page;

  const [form,   setForm]   = useState({ title: "", slug: "", isHomePage: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (page) {
      setForm({ title: page.title || "", slug: page.slug || "", isHomePage: page.isHomePage || false });
    } else {
      setForm({ title: "", slug: "", isHomePage: false });
    }
    setErrors({});
  }, [page, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "title" && !isEdit) {
      // Auto-generate slug from title
      const slug = "/" + value.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      setForm((p) => ({ ...p, title: value, slug }));
    } else {
      setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    }
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Page title is required.";
    if (!form.slug.trim())  errs.slug  = "Slug is required.";
    else if (!/^\/[a-z0-9-/]*$/.test(form.slug)) errs.slug = "Slug must start with / and use lowercase letters, numbers, hyphens.";
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
          <Box sx={{ width: 36, height: 36, borderRadius: "9px", background: alpha(COLORS.purple, 0.1), border: `1px solid ${alpha(COLORS.purple, 0.25)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArticleOutlinedIcon sx={{ fontSize: 18, color: COLORS.purple }} />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: COLORS.textPrimary }}>
              {isEdit ? "Edit Page" : "Create New Page"}
            </Typography>
            <Typography variant="caption">
              {isEdit ? "Update this page's details." : "Add a new page to your website."}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          label="Page Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          autoFocus
          error={!!errors.title}
          helperText={errors.title || "e.g. Home, About Us, Contact"}
        />
        <TextField
          label="Slug (URL path)"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          fullWidth
          error={!!errors.slug}
          helperText={errors.slug || "e.g. /about, /contact, /services"}
        />
        <FormControlLabel
          control={<Switch name="isHomePage" checked={form.isHomePage} onChange={handleChange} size="small" />}
          label={
            <Box>
              <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", color: COLORS.textSecondary }}>Set as home page</Typography>
              <Typography variant="caption">Loads at the root URL of your website.</Typography>
            </Box>
          }
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading
            ? <CircularProgress size={18} thickness={5} sx={{ color: "#fff" }} />
            : isEdit ? "Save Changes" : "Create Page"
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PageFormDialog;