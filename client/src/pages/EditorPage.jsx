// src/pages/EditorPage.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, IconButton, Button, Tooltip,
  CircularProgress, Divider, alpha, Skeleton, Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import TabletAndroidOutlinedIcon from "@mui/icons-material/TabletAndroidOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// RTK Query hooks
import {
  useGetComponentsQuery,
  useAddComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
  useReorderComponentsMutation,
} from "../redux/api/componentApi";
import { useGetWebsiteQuery, usePublishWebsiteMutation } from "../redux/api/websiteApi";
import { useGetPageQuery } from "../redux/api/pageApi";

// Editor sub-components
import ComponentRenderer from "../components/editor/ComponentRenderer";
import ComponentPicker from "../components/editor/ComponentPicker";
import ComponentInspector from "../components/editor/ComponentInspector";
import PageSettingsDrawer from "../components/editor/PageSettingsDrawer";
import ConfirmDialog from "../components/ConfirmDialog";
import { DEFAULT_CONTENT } from "../components/editor/componentRegistry";
import { createHistory } from "../components/editor/EditorHistory";
import useSnackbar from "../hooks/useSnackbar";
import { COLORS } from "../theme";

// ── Device preview widths ─────────────────────────────────────
const DEVICE_WIDTHS = { desktop: "100%", tablet: "768px", mobile: "390px" };
const DEVICE_ICONS = [
  { key: "desktop", icon: <DesktopWindowsOutlinedIcon sx={{ fontSize: 16 }} />, label: "Desktop" },
  { key: "tablet", icon: <TabletAndroidOutlinedIcon sx={{ fontSize: 16 }} />, label: "Tablet" },
  { key: "mobile", icon: <SmartphoneOutlinedIcon sx={{ fontSize: 16 }} />, label: "Mobile" },
];

// ── Skeleton loaders ──────────────────────────────────────────
const LeftSkeleton = () => <Box sx={{ p: 1 }}>{[1, 2, 3].map(i => <Skeleton key={i} variant="rectangular" height={38} sx={{ borderRadius: "8px", mb: 1 }} />)}</Box>;
const CanvasSkeleton = () => <Box sx={{ p: 4 }}>{[1, 2].map(i => <Skeleton key={i} variant="rectangular" height={180} sx={{ borderRadius: "10px", mb: 2 }} />)}</Box>;

// ── Main EditorPage ───────────────────────────────────────────
const EditorPage = () => {
  const { websiteId, pageId } = useParams();
  const navigate = useNavigate();
  const notify = useSnackbar();
  const historyRef = useRef(null);

  // ── Queries ───────────────────────────────────────────────
  const { data: website } = useGetWebsiteQuery(websiteId, { skip: !websiteId });
  const { data: page, isLoading: pageLoading } =
  useGetPageQuery(pageId, {
    skip: !pageId
  });
  const { data: components = [], isLoading: compLoading } = useGetComponentsQuery({ websiteId, pageId }, { skip: !websiteId || !pageId });

  // ── Mutations ─────────────────────────────────────────────
  const [addComponent, { isLoading: adding }] = useAddComponentMutation();
  const [updateComponent] = useUpdateComponentMutation();
  const [deleteComponent] = useDeleteComponentMutation();
  const [reorderComponents] = useReorderComponentsMutation();
  const [publishWebsite, { isLoading: publishing }] = usePublishWebsiteMutation();

  // ── Local state ───────────────────────────────────────────
  const [selectedId, setSelectedId] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [publishConfirm, setPublishConfirm] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [device, setDevice] = useState("desktop");
  const [pageTheme, setPageTheme] = useState({});
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const isPublished = website?.isPublished || website?.status === "published";
  const selected = components.find((c) => c._id === selectedId) || null;
  const sorted = [...components].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const isLoading = pageLoading || compLoading;

  // Init history + theme when data loads
  useEffect(() => {
    if (components.length && !historyRef.current) {
      historyRef.current = createHistory(components);
      refreshUndoRedo();
    }
    if (page?.theme) setPageTheme(page.theme);
  }, [components, page]);

  const refreshUndoRedo = () => {
    if (!historyRef.current) return;
    setCanUndo(historyRef.current.canUndo());
    setCanRedo(historyRef.current.canRedo());
  };

  // ── Keyboard shortcuts (Ctrl+Z / Ctrl+Y) ─────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) { e.preventDefault(); handleUndo(); }
      if ((e.metaKey || e.ctrlKey) && (e.key === "y" || (e.shiftKey && e.key === "z"))) { e.preventDefault(); handleRedo(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleAdd = async (type) => {
    try {
      const result = await addComponent({
        pageId,
        type,
        order: components.length + 1,
        data: {
          content: DEFAULT_CONTENT[type] || {},
          props: {},
          styles: {},
        },
      }).unwrap();
      const next = [...components, result];
      historyRef.current?.push(next);
      refreshUndoRedo();
      notify.success(`${type} component added.`);
    } catch (err) {
      notify.error(err?.data?.message || "Failed to add component.");
    }
  };

  const handleUpdate = async (updated) => {
    try {
      await updateComponent({
        pageId,
        componentId: updated._id,
        data: updated.data,
      }).unwrap();

      const next = components.map((c) =>
        c._id === updated._id ? updated : c
      );

      historyRef.current?.push(next);
      refreshUndoRedo();
      notify.success("Component updated.");
    } catch (err) {
      notify.error(err?.data?.message || "Update failed.");
    }
  };
  const handleDelete = async () => {
    try {
      await deleteComponent({ websiteId, pageId, componentId: deleteTarget._id }).unwrap();
      const next = components.filter((c) => c._id !== deleteTarget._id);
      historyRef.current?.push(next);
      refreshUndoRedo();
      setSelectedId(null);
      setDeleteTarget(null);
      notify.success("Component deleted.");
    } catch (err) {
      notify.error(err?.data?.message || "Delete failed.");
    }
  };

  const handleMove = async (direction) => {
    if (!selected) return;
    const s = [...sorted];
    const idx = s.findIndex((c) => c._id === selected._id);
    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= s.length) return;
    [s[idx], s[newIdx]] = [s[newIdx], s[idx]];
    try {
      await reorderComponents({ websiteId, pageId, order: s.map((c) => c._id) }).unwrap();
    } catch {
      notify.error("Reorder failed.");
    }
  };

  const handleUndo = useCallback(async () => {
    const prev = historyRef.current?.undo();
    if (!prev) return;
    try { await reorderComponents({ websiteId, pageId, order: prev.map((c) => c._id) }).unwrap(); } catch { }
    refreshUndoRedo();
  }, [websiteId, pageId]);

  const handleRedo = useCallback(async () => {
    const next = historyRef.current?.redo();
    if (!next) return;
    try { await reorderComponents({ websiteId, pageId, order: next.map((c) => c._id) }).unwrap(); } catch { }
    refreshUndoRedo();
  }, [websiteId, pageId]);

  const handleSaveTheme = (theme) => {
    setPageTheme(theme);
    notify.success("Theme applied! Connect updatePageTheme API to persist.");
  };

  const handlePublish = async () => {
    try {
      await publishWebsite(websiteId).unwrap();
      notify.success(isPublished ? "Website unpublished." : "Website is now live! 🚀");
      setPublishConfirm(false);
    } catch (err) {
      notify.error(err?.data?.message || "Publish failed.");
    }
  };

  // ── Render ────────────────────────────────────────────────
  return (
    // Full-screen layout — no DashboardLayout wrapper
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: COLORS.bg }}>

      {/* ══════════════════ TOP BAR ══════════════════ */}
      <Box sx={{
        height: 52, flexShrink: 0,
        borderBottom: `1px solid ${COLORS.borderSubtle}`,
        background: alpha(COLORS.bgSurface, 0.95),
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", gap: 1, px: 2,
      }}>

        {/* Back */}
        <Tooltip title={`Back to ${website?.name || "pages"}`} arrow>
          <IconButton size="small" onClick={() => navigate(`/dashboard/websites/${websiteId}/pages`)} sx={{ color: COLORS.textMuted }}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* Breadcrumb */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, overflow: "hidden" }}>
          <Typography variant="caption" sx={{ display: { xs: "none", sm: "block" }, whiteSpace: "nowrap" }}>
            {website?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: COLORS.textMuted }}>/</Typography>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: COLORS.textPrimary, whiteSpace: "nowrap" }}>
            {pageLoading ? <Skeleton width={80} /> : (page?.title || "Page")}
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: "'DM Mono', monospace", display: { xs: "none", md: "block" }, color: COLORS.textMuted }}>
            {page?.slug}
          </Typography>
          <Chip
            label={isPublished ? "● Live" : "○ Draft"}
            size="small"
            color={isPublished ? "success" : "default"}
            sx={{ height: 20, fontFamily: "'DM Mono', monospace", fontSize: "0.65rem" }}
          />
        </Box>

        {/* Device preview toggle */}
        <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 0.5, background: alpha(COLORS.bgCard, 0.8), border: `1px solid ${COLORS.borderSubtle}`, borderRadius: "9px", p: 0.5 }}>
          {DEVICE_ICONS.map((d) => (
            <Tooltip key={d.key} title={d.label} arrow>
              <Box
                onClick={() => setDevice(d.key)}
                sx={{
                  width: 28, height: 28, borderRadius: "7px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  background: device === d.key ? alpha(COLORS.cyan, 0.12) : "transparent",
                  border: `1px solid ${device === d.key ? alpha(COLORS.cyan, 0.4) : "transparent"}`,
                  color: device === d.key ? COLORS.cyan : COLORS.textMuted,
                  transition: "all 0.15s",
                  "&:hover": { background: alpha(COLORS.cyan, 0.06), color: COLORS.textSecondary },
                }}
              >
                {d.icon}
              </Box>
            </Tooltip>
          ))}
        </Box>

        {/* Undo / Redo */}
        <Tooltip title="Undo (Ctrl+Z)" arrow>
          <span>
            <IconButton size="small" onClick={handleUndo} disabled={!canUndo} sx={{ color: canUndo ? COLORS.textMuted : alpha(COLORS.textMuted, 0.3) }}>
              <UndoIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Redo (Ctrl+Y)" arrow>
          <span>
            <IconButton size="small" onClick={handleRedo} disabled={!canRedo} sx={{ color: canRedo ? COLORS.textMuted : alpha(COLORS.textMuted, 0.3) }}>
              <RedoIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </span>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* Page theme */}
        <Tooltip title="Page theme &amp; colors" arrow>
          <IconButton size="small" onClick={() => setSettingsOpen(true)} sx={{ color: COLORS.textMuted, "&:hover": { color: COLORS.purple } }}>
            <PaletteOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>

        {/* Add component */}
        <Button
          variant="outlined" size="small"
          startIcon={adding ? <CircularProgress size={12} /> : <AddIcon />}
          onClick={() => setPickerOpen(true)}
          disabled={adding}
          sx={{ height: 32, display: { xs: "none", sm: "flex" } }}
        >
          Add
        </Button>

        {/* View live */}
        {isPublished && (
          <Tooltip title="View live site" arrow>
            <IconButton size="small" onClick={() => window.open(`/sites/${website?.slug}`, "_blank")} sx={{ color: COLORS.green, border: `1px solid ${alpha(COLORS.green, 0.3)}`, borderRadius: "8px" }}>
              <OpenInNewIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}

        {/* Publish */}
        <Button
          variant={isPublished ? "outlined" : "contained"} size="small"
          startIcon={publishing ? <CircularProgress size={12} sx={{ color: "inherit" }} /> : <RocketLaunchOutlinedIcon />}
          onClick={() => setPublishConfirm(true)}
          disabled={publishing}
          sx={{
            height: 32,
            ...(isPublished ? { borderColor: alpha(COLORS.green, 0.4), color: COLORS.green } : {}),
          }}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
      </Box>

      {/* ══════════════════ BODY ══════════════════ */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── LEFT: Layers panel ── */}
        <Box sx={{
          width: 192, flexShrink: 0,
          borderRight: `1px solid ${COLORS.borderSubtle}`,
          background: COLORS.bgSurface,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
          <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.borderSubtle}` }}>
            <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px" }}>
              LAYERS ({components.length})
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", py: 1 }}>
            {isLoading ? <LeftSkeleton /> : sorted.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: COLORS.textMuted, lineHeight: 1.6 }}>
                  No components.<br />Click Add to start.
                </Typography>
              </Box>
            ) : sorted.map((comp, idx) => (
              <Box
                key={comp._id}
                onClick={() => setSelectedId(comp._id === selectedId ? null : comp._id)}
                sx={{
                  mx: 1, mb: 0.5, px: 1.5, py: 1,
                  borderRadius: "8px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 1,
                  border: `1px solid ${comp._id === selectedId ? alpha(COLORS.cyan, 0.4) : "transparent"}`,
                  background: comp._id === selectedId ? alpha(COLORS.cyan, 0.07) : "transparent",
                  transition: "all 0.12s",
                  "&:hover": { background: alpha(COLORS.cyan, 0.04) },
                }}
              >
                <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: COLORS.textMuted, minWidth: 18 }}>
                  {String(idx + 1).padStart(2, "0")}
                </Typography>
                <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: comp._id === selectedId ? COLORS.textPrimary : COLORS.textSecondary, flex: 1 }}>
                  {comp.type}
                </Typography>
                {/* Drag handle indicator */}
                <Typography sx={{ fontSize: 10, color: COLORS.textMuted, opacity: 0.4 }}>⠿</Typography>
              </Box>
            ))}
          </Box>

          {/* Add button at bottom of layers */}
          <Box sx={{ p: 1.5, borderTop: `1px solid ${COLORS.borderSubtle}` }}>
            <Button variant="outlined" fullWidth size="small" startIcon={<AddIcon />} onClick={() => setPickerOpen(true)}>
              Add
            </Button>
          </Box>
        </Box>

        {/* ── CENTRE: Page canvas ── */}
        <Box sx={{
          flex: 1, overflowY: "auto",
          background: "#040610",
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          {/* Device width wrapper */}
          <Box sx={{ width: "100%", maxWidth: DEVICE_WIDTHS[device], transition: "max-width 0.3s ease" }}>

            {/* Page frame */}
            <Box sx={{
              background: pageTheme.bg || COLORS.bg,
              borderRadius: "14px",
              border: `1px solid ${COLORS.borderSubtle}`,
              minHeight: 560,
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
              fontFamily: pageTheme.fontFamily || "'DM Sans', sans-serif",
            }}>
              {isLoading ? <CanvasSkeleton /> : sorted.length === 0 ? (
                /* Empty canvas */
                <Box
                  onClick={() => setPickerOpen(true)}
                  sx={{
                    height: 560,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: 2, cursor: "pointer",
                    "&:hover .add-icon-box": { transform: "scale(1.06)" },
                  }}
                >
                  <Box className="add-icon-box" sx={{ width: 64, height: 64, borderRadius: "18px", background: alpha(COLORS.cyan, 0.08), border: `1px dashed ${alpha(COLORS.cyan, 0.35)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, color: COLORS.cyan, transition: "transform 0.2s" }}>
                    +
                  </Box>
                  <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", color: COLORS.textMuted }}>
                    Click to add your first component
                  </Typography>
                </Box>
              ) : (
                /* Rendered components */
                <Box>
                  {sorted.map((comp) => (
                    <ComponentRenderer
                      key={comp._id}
                      component={comp}
                      pageTheme={pageTheme}
                      editorMode
                      selected={selectedId === comp._id}
                      onSelect={(c) => setSelectedId(c._id === selectedId ? null : c._id)}
                    />
                  ))}

                  {/* Drop zone at bottom */}
                  <Box
                    onClick={() => setPickerOpen(true)}
                    sx={{
                      m: 3, py: 3, borderRadius: "10px",
                      border: `1px dashed ${alpha(COLORS.borderMid, 0.4)}`,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
                      cursor: "pointer", transition: "all 0.15s",
                      "&:hover": { border: `1px dashed ${alpha(COLORS.cyan, 0.45)}`, background: alpha(COLORS.cyan, 0.02) },
                    }}
                  >
                    <AddIcon sx={{ fontSize: 16, color: COLORS.textMuted }} />
                    <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.textMuted }}>
                      Add component
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Device label below canvas */}
            <Box sx={{ textAlign: "center", mt: 1.5 }}>
              <Typography variant="caption" sx={{ color: COLORS.textMuted, fontFamily: "'DM Mono', monospace" }}>
                {device.charAt(0).toUpperCase() + device.slice(1)} — {DEVICE_WIDTHS[device]}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ── RIGHT: Inspector ── */}
        <ComponentInspector
          component={selected}
          onUpdate={handleUpdate}
          onDelete={() => setDeleteTarget(selected)}
          onMoveUp={() => handleMove("up")}
          onMoveDown={() => handleMove("down")}
          onDeselect={() => setSelectedId(null)}
        />
      </Box>

      {/* ══════════════════ DIALOGS ══════════════════ */}

      {/* Component picker */}
      <ComponentPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleAdd}
      />

      {/* Page theme/color settings */}
      <PageSettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={pageTheme}
        onSave={handleSaveTheme}
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete "${deleteTarget?.type}" component?`}
        description="This will permanently remove this component from the page. This cannot be undone."
        confirmLabel="Delete Component"
        danger
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      {/* Publish confirm */}
      <ConfirmDialog
        open={publishConfirm}
        title={isPublished ? "Unpublish website?" : "Publish website?"}
        description={isPublished
          ? "Your website will go offline. Visitors won't be able to access it."
          : `Your website will go live at: webcraft.io/${website?.subdomain}`
        }
        confirmLabel={isPublished ? "Unpublish" : "Publish 🚀"}
        loading={publishing}
        onConfirm={handlePublish}
        onClose={() => setPublishConfirm(false)}
      />
    </Box>
  );
};

export default EditorPage;