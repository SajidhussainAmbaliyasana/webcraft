// src/pages/WebsitesPage.jsx
import { useState } from "react";
import {
  Box, Typography, Button, Card, CardContent,
  Skeleton, TextField, InputAdornment, alpha,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";

// import {
//   useGetWebsitesQuery,
//   useCreateWebsiteMutation,
//   useUpdateWebsiteMutation,
//   useDeleteWebsiteMutation,
//   usePublishWebsiteMutation,
// } from "../redux/api/websiteApi";

import WebsiteCard from "../components/WebsiteCard";
import WebsiteFormDialog from "../components/WebsiteFormDialog";
import ConfirmDialog from "../components/common/ConfirmDialog";
import useSnackbar from "../hooks/useSnackbar";
import { COLORS } from "../theme";

// ── Skeleton placeholder while loading ───────────────
const SkeletonCard = () => (
  <Card>
    <Box sx={{ height: 3, background: COLORS.borderSubtle }} />
    <CardContent sx={{ p: 2.5 }}>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
        <Skeleton variant="rectangular" width={36} height={36} sx={{ borderRadius: "9px", flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="80%" height={16} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Skeleton variant="rectangular" width={60} height={22} sx={{ borderRadius: "6px" }} />
        <Skeleton variant="rectangular" width={70} height={22} sx={{ borderRadius: "6px" }} />
      </Box>
      <Skeleton variant="rectangular" height={1} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={36} sx={{ borderRadius: "8px" }} />
    </CardContent>
  </Card>
);

// ── Main Page ─────────────────────────────────────────
const Website = () => {
  const notify = useSnackbar();

  // RTK Query hooks
  // const { data: websites = [], isLoading }          = useGetWebsitesQuery();
  // const [createWebsite, { isLoading: creating }]    = useCreateWebsiteMutation();
  // const [updateWebsite, { isLoading: updating }]    = useUpdateWebsiteMutation();
  // const [deleteWebsite, { isLoading: deleting }]    = useDeleteWebsiteMutation();
  // const [publishWebsite, { isLoading: publishing }] = usePublishWebsiteMutation();

  //this is temperory 
  // Dummy local state
  const [websites, setWebsites] = useState([
    {
      _id: "1",
      name: "Portfolio Website",
      subdomain: "portfolio",
      description: "Personal portfolio website",
      pageCount: 4,
      isPublished: true,
    },
    {
      _id: "2",
      name: "Agency Site",
      subdomain: "agency",
      description: "Digital agency landing page",
      pageCount: 7,
      isPublished: false,
    },
    {
      _id: "3",
      name: "Restaurant",
      subdomain: "restaurant",
      description: "Restaurant ordering website",
      pageCount: 5,
      isPublished: true,
    },
  ]);

  const isLoading = false;
  const creating = false;
  const updating = false;
  const deleting = false;
  const publishing = false;

  // Dialog / modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [editWebsite, setEditWebsite] = useState(null);  // website object or null
  const [deleteTarget, setDeleteTarget] = useState(null);  // website to delete
  const [publishTarget, setPublishTarget] = useState(null);  // website to publish/unpublish
  const [search, setSearch] = useState("");

  // ── Handlers ──────────────────────────────────────
  const handleCreate = async (form) => {
    try {
      //await createWebsite(form).unwrap();
      setWebsites((prev) => [
        ...prev,
        {
          _id: Date.now().toString(),
          ...form,
          pageCount: 0,
          isPublished: false,
        },
      ]);
      notify.success("Website created successfully!");
      setCreateOpen(false);
    } catch (err) {
      notify.error(err?.data?.message || "Failed to create website.");
    }
  };

  const handleUpdate = async (form) => {
    try {
      //await updateWebsite({ id: editWebsite._id, ...form }).unwrap();
      setWebsites((prev) =>
        prev.map((w) =>
          w._id === editWebsite._id
            ? { ...w, ...form }
            : w
        )
      );
      notify.success("Website updated.");
      setEditWebsite(null);
    } catch (err) {
      notify.error(err?.data?.message || "Failed to update website.");
    }
  };

  const handleDelete = async () => {
    try {
      //await deleteWebsite(deleteTarget._id).unwrap();
      setWebsites((prev) =>
        prev.filter((w) => w._id !== deleteTarget._id)
      );
      notify.success("Website deleted.");
      setDeleteTarget(null);
    } catch (err) {
      notify.error(err?.data?.message || "Failed to delete website.");
    }
  };

  const handlePublish = async () => {
    const isPublished = publishTarget?.isPublished || publishTarget?.status === "published";
    try {
      //await publishWebsite(publishTarget._id).unwrap();
      setWebsites((prev) =>
        prev.map((w) =>
          w._id === publishTarget._id
            ? { ...w, isPublished: !w.isPublished }
            : w
        )
      );
      notify.success(isPublished ? "Website unpublished." : "Website is now live! 🚀");
      setPublishTarget(null);
    } catch (err) {
      notify.error(err?.data?.message || "Publish failed.");
    }
  };

  // Filter by search term
  const filtered = websites.filter(
    (w) =>
      w.name?.toLowerCase().includes(search.toLowerCase()) ||
      w.subdomain?.toLowerCase().includes(search.toLowerCase())
  );

  const isPublishTarget = publishTarget?.isPublished || publishTarget?.status === "published";

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>

      {/* ── Header ── */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>MANAGE</Typography>
          <Typography variant="h3" sx={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
            My Websites
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          New Website
        </Button>
      </Box>

      {/* ── Search (only when there are websites) ── */}
      {websites.length > 0 && (
        <TextField
          placeholder="Search websites…"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3, maxWidth: 360 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 17, color: COLORS.textMuted }} />
              </InputAdornment>
            ),
          }}
        />
      )}

      {/* ── Website Grid ── */}
      {isLoading ? (
        // Skeleton loading state
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2.5 }}>
          {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </Box>
      ) : filtered.length === 0 ? (
        // Empty state
        <Card>
          <CardContent sx={{ py: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2.5 }}>
            <Box sx={{
              width: 64, height: 64, borderRadius: "16px",
              background: alpha(COLORS.cyan, 0.08),
              border: `1px solid ${alpha(COLORS.cyan, 0.2)}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <LanguageIcon sx={{ fontSize: 28, color: COLORS.cyan }} />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 1, fontSize: "1.2rem" }}>
                {search ? `No results for "${search}"` : "No websites yet"}
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 340, mx: "auto" }}>
                {search
                  ? "Try a different search term."
                  : "Create your first website. Add pages, drop in components, and publish."
                }
              </Typography>
            </Box>
            {!search && (
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
                Create your first website
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        // Website cards grid
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2.5 }}>
          {filtered.map((website) => (
            <WebsiteCard
              key={website._id}
              website={website}
              onEdit={(w) => setEditWebsite(w)}
              onDelete={(w) => setDeleteTarget(w)}
              onPublish={(w) => setPublishTarget(w)}
            />
          ))}
        </Box>
      )}

      {/* ── Dialogs ── */}
      {/* Create */}
      <WebsiteFormDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
        loading={creating}
      />

      {/* Edit */}
      <WebsiteFormDialog
        open={!!editWebsite}
        onClose={() => setEditWebsite(null)}
        onSubmit={handleUpdate}
        website={editWebsite}
        loading={updating}
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete "${deleteTarget?.name}"?`}
        description="This will permanently delete the website, all its pages, and all components. This action cannot be undone."
        confirmLabel="Delete Website"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      {/* Publish/Unpublish confirm */}
      <ConfirmDialog
        open={!!publishTarget}
        title={isPublishTarget ? "Unpublish website?" : "Publish website?"}
        description={isPublishTarget
          ? "Your website will go offline and visitors won't be able to access it."
          : `Your website will go live at webcraft.io/${publishTarget?.subdomain}.`
        }
        confirmLabel={isPublishTarget ? "Unpublish" : "Publish 🚀"}
        loading={publishing}
        onConfirm={handlePublish}
        onClose={() => setPublishTarget(null)}
      />
    </Box>
  );
};

export default Website;