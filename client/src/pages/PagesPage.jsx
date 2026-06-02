// src/pages/PagesPage.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Card, CardContent,
  Skeleton, Chip, Divider, IconButton,
  Menu, MenuItem, Tooltip, alpha,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useGetWebsiteQuery, usePublishWebsiteMutation } from "../redux/api/websiteApi";
import { useGetPagesQuery, useCreatePageMutation, useUpdatePageMutation, useDeletePageMutation } from "../redux/api/pageApi";
import ConfirmDialog from "../components/ConfirmDialog";
import PageFormDialog from "../components/PageFormDialog";
import useSnackbar from "../hooks/useSnackbar";
import { COLORS } from "../theme";

// ── Page card ─────────────────────────────────────────
const PageCard = ({ page, websiteId, onEdit, onDelete }) => {
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();

  return (
    <Card sx={{ transition: "all 0.2s", "&:hover": { transform: "translateY(-2px)", boxShadow: `0 12px 32px rgba(0,0,0,0.35), 0 0 0 1px ${alpha(COLORS.purple, 0.18)}` } }}>
      <CardContent sx={{ p: 2.5 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: "8px", flexShrink: 0, background: alpha(COLORS.purple, 0.1), border: `1px solid ${alpha(COLORS.purple, 0.25)}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.purple }}>
              {page.isHomePage ? <HomeOutlinedIcon sx={{ fontSize: 16 }} /> : <ArticleOutlinedIcon sx={{ fontSize: 16 }} />}
            </Box>
            <Box>
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: COLORS.textPrimary }}>
                {page.title}
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: "'DM Mono', monospace" }}>{page.slug}</Typography>
            </Box>
          </Box>
          <Tooltip title="More options" arrow>
            <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)} sx={{ color: COLORS.textMuted }}>
              <MoreVertIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Chips */}
        <Box sx={{ display: "flex", gap: 1, mb: 2.5, flexWrap: "wrap" }}>
          <Chip label={`${page.components?.length ?? 0} components`} size="small" />
          {page.isHomePage && <Chip label="Home" size="small" color="primary" />}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Open editor CTA */}
        <Box
          onClick={() => navigate(`/dashboard/websites/${websiteId}/pages/${page._id}/editor`)}
          sx={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
            py: 1, borderRadius: "8px",
            background: alpha(COLORS.purple, 0.07),
            border: `1px solid ${alpha(COLORS.purple, 0.22)}`,
            cursor: "pointer", transition: "all 0.15s",
            "&:hover": { background: alpha(COLORS.purple, 0.13), border: `1px solid ${alpha(COLORS.purple, 0.38)}` },
          }}
        >
          <EditNoteIcon sx={{ fontSize: 15, color: COLORS.purple }} />
          <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.purple }}>
            Open Editor
          </Typography>
        </Box>
      </CardContent>

      {/* Context menu */}
      <Menu
        anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{ sx: { minWidth: 170 } }}
      >
        <MenuItem onClick={() => { setAnchor(null); onEdit(page); }}>
          <EditOutlinedIcon sx={{ fontSize: 15, mr: 1.5 }} /> Edit details
        </MenuItem>
        <MenuItem onClick={() => { setAnchor(null); navigate(`/dashboard/websites/${websiteId}/pages/${page._id}/editor`); }}>
          <EditNoteIcon sx={{ fontSize: 15, mr: 1.5 }} /> Open editor
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { setAnchor(null); onDelete(page); }} sx={{ color: alpha("#f87171", 0.8), "&:hover": { background: alpha("#f87171", 0.08), color: "#f87171" } }}>
          <DeleteOutlineIcon sx={{ fontSize: 15, mr: 1.5 }} /> Delete page
        </MenuItem>
      </Menu>
    </Card>
  );
};

// ── Skeleton ──────────────────────────────────────────
const PageCardSkeleton = () => (
  <Card>
    <CardContent sx={{ p: 2.5 }}>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
        <Skeleton variant="rectangular" width={32} height={32} sx={{ borderRadius: "8px", flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="50%" height={20} />
          <Skeleton variant="text" width="30%" height={16} />
        </Box>
      </Box>
      <Skeleton variant="rectangular" height={1} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={36} sx={{ borderRadius: "8px" }} />
    </CardContent>
  </Card>
);

// ── Main Page ─────────────────────────────────────────
const PagesPage = () => {
  const { websiteId } = useParams();
  const navigate = useNavigate();
  const notify = useSnackbar();

  const { data: website } = useGetWebsiteQuery(websiteId, { skip: !websiteId });
  const websiteData = website?.website;
  const { data: pagesResponse, isLoading } = useGetPagesQuery(websiteId, { skip: !websiteId });

  const pages = pagesResponse?.data || [];
  const [createPage, { isLoading: creating }] = useCreatePageMutation();
  const [updatePage, { isLoading: updating }] = useUpdatePageMutation();
  const [deletePage, { isLoading: deleting }] = useDeletePageMutation();
  const [publishSite, { isLoading: publishing }] = usePublishWebsiteMutation();

  const [createOpen, setCreateOpen] = useState(false);
  const [editPage, setEditPage] = useState(null);
  const [deletePage_, setDeletePage] = useState(null);
  const [publishConfirm, setPublishConfirm] = useState(false);

  const isPublished =websiteData?.isPublished || websiteData?.status === "published";

  const handleCreate = async (form) => {
    try {
      await createPage({
        websiteId,
        name: form.title,
        title: form.title,
        slug: form.slug,
        description: "",
        isHomePage: form.isHomePage,
      }).unwrap();
      notify.success("Page created!");
      setCreateOpen(false);
    } catch (err) {
      notify.error(err?.data?.message || "Failed to create page.");
    }
  };

  const handleUpdate = async (form) => {
    try {
      await updatePage({
        pageId: editPage._id,
        name: form.title,
        title: form.title,
        description: "",
      }).unwrap();

      notify.success("Page updated.");
      setEditPage(null);
    } catch (err) {
      notify.error(err?.data?.message || "Failed to update page.");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePage(deletePage_._id).unwrap();

      notify.success("Page deleted.");
      setDeletePage(null);
    } catch (err) {
      notify.error(err?.data?.message || "Failed to delete page.");
    }
  };

  const handlePublish = async () => {
    try {
      await publishSite(websiteId).unwrap();
      notify.success(isPublished ? "Website unpublished." : "Website is now live! 🚀");
      setPublishConfirm(false);
    } catch (err) {
      notify.error(err?.data?.message || "Publish failed.");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>

      {/* Back nav */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <IconButton size="small" onClick={() => navigate("/dashboard/websites")} sx={{ color: COLORS.textMuted }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption" sx={{ color: COLORS.textMuted }}>All Websites</Typography>
      </Box>

      {/* Website header */}
      <Card sx={{ mb: 4, overflow: "hidden" }}>
        <Box sx={{ height: 3, background: isPublished ? `linear-gradient(90deg, ${COLORS.green}, ${COLORS.cyan})` : `linear-gradient(90deg, ${COLORS.borderSubtle}, ${COLORS.borderMid})` }} />
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.75, flexWrap: "wrap" }}>
                <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: COLORS.textPrimary, letterSpacing: "-0.5px" }}>
                  {websiteData?.name || <Skeleton width={160} />}
                </Typography>
                <Chip label={isPublished ? "● Live" : "○ Draft"} size="small" color={isPublished ? "success" : "default"} />
              </Box>
              <Typography variant="caption" sx={{ fontFamily: "'DM Mono', monospace" }}>
                webcraft.io/{websiteData?.slug}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button
                variant={isPublished ? "outlined" : "contained"}
                size="small"
                startIcon={<RocketLaunchOutlinedIcon />}
                onClick={() => setPublishConfirm(true)}
                sx={isPublished ? { borderColor: alpha(COLORS.green, 0.4), color: COLORS.green } : {}}
              >
                {isPublished ? "Unpublish" : "Publish"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Pages header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>PAGES</Typography>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: COLORS.textPrimary }}>
            {isLoading ? <Skeleton width={100} /> : `${pages.length} page${pages.length !== 1 ? "s" : ""}`}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          New Page
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Pages grid */}
      {isLoading ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2.5 }}>
          {[1, 2, 3].map((i) => <PageCardSkeleton key={i} />)}
        </Box>
      ) : pages.length === 0 ? (
        <Card>
          <CardContent sx={{ py: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2.5 }}>
            <Box sx={{ width: 60, height: 60, borderRadius: "16px", background: alpha(COLORS.purple, 0.08), border: `1px solid ${alpha(COLORS.purple, 0.2)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArticleOutlinedIcon sx={{ fontSize: 26, color: COLORS.purple }} />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 1, fontSize: "1.1rem" }}>No pages yet</Typography>
              <Typography variant="body2" sx={{ maxWidth: 320, mx: "auto" }}>
                Add your first page — Home, About, Contact — then open the editor to build it.
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
              Create first page
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2.5 }}>
          {pages.map((page) => (
            <PageCard
              key={page._id}
              page={page}
              websiteId={websiteId}
              onEdit={(p) => setEditPage(p)}
              onDelete={(p) => setDeletePage(p)}
            />
          ))}
        </Box>
      )}

      {/* Dialogs */}
      <PageFormDialog open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={handleCreate} loading={creating} />
      <PageFormDialog open={!!editPage} onClose={() => setEditPage(null)} onSubmit={handleUpdate} page={editPage} loading={updating} />
      <ConfirmDialog
        open={!!deletePage_}
        title={`Delete "${deletePage_?.title}"?`}
        description="This will permanently delete the page and all its components."
        confirmLabel="Delete Page"
        danger loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeletePage(null)}
      />
      <ConfirmDialog
        open={publishConfirm}
        title={isPublished ? "Unpublish website?" : "Publish website?"}
       description={isPublished  ? "Your website will go offline." : `Live at: webcraft.io/${websiteData?.slug}`}
        confirmLabel={isPublished ? "Unpublish" : "Publish 🚀"}
        loading={publishing}
        onConfirm={handlePublish}
        onClose={() => setPublishConfirm(false)}
      />
    </Box>
  );
};

export default PagesPage;