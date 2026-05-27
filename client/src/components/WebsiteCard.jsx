// src/components/WebsiteCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card, CardContent, Box, Typography, IconButton,
  Menu, MenuItem, Divider, Tooltip, Chip, alpha,
} from "@mui/material";
import MoreVertIcon            from "@mui/icons-material/MoreVert";
import EditOutlinedIcon        from "@mui/icons-material/EditOutlined";
//import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import OpenInNewIcon           from "@mui/icons-material/OpenInNew";
import ArticleOutlinedIcon     from "@mui/icons-material/ArticleOutlined";
import { COLORS }              from "../theme";

const WebsiteCard = ({ website, onEdit, onDelete, onPublish }) => {
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();

  const isPublished = website?.isPublished || website?.status === "published";

  return (
    <Card sx={{
      transition: "all 0.2s",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${alpha(COLORS.cyan, 0.15)}`,
      },
    }}>
      {/* Top accent bar */}
      <Box sx={{
        height: 3,
        background: isPublished
          ? `linear-gradient(90deg, ${COLORS.green}, ${COLORS.cyan})`
          : `linear-gradient(90deg, ${COLORS.borderSubtle}, ${COLORS.borderMid})`,
      }} />

      <CardContent sx={{ p: 2.5 }}>
        {/* Header row */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flex: 1, minWidth: 0 }}>
            {/* Avatar */}
            <Box sx={{
              width: 36, height: 36, borderRadius: "9px", flexShrink: 0,
              background: `linear-gradient(135deg, ${alpha(COLORS.cyan, 0.2)}, ${alpha(COLORS.purple, 0.2)})`,
              border: `1px solid ${alpha(COLORS.cyan, 0.2)}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 14, color: COLORS.cyan,
            }}>
              {website.name?.[0]?.toUpperCase() || "W"}
            </Box>
            {/* Name + subdomain */}
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{
                fontWeight: 700, fontSize: "0.95rem", color: COLORS.textPrimary,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {website.name}
              </Typography>
              <Typography variant="caption" sx={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                webcraft.io/{website.subdomain}
              </Typography>
            </Box>
          </Box>

          {/* More menu trigger */}
          <Tooltip title="More options" arrow>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); setAnchor(e.currentTarget); }} sx={{ color: COLORS.textMuted, flexShrink: 0 }}>
              <MoreVertIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Optional description */}
        {website.description && (
          <Typography sx={{ fontSize: "0.82rem", color: COLORS.textSecondary, lineHeight: 1.6, mb: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {website.description}
          </Typography>
        )}

        {/* Status + page count */}
        <Box sx={{ display: "flex", gap: 1, mb: 2.5, flexWrap: "wrap" }}>
          <Chip label={isPublished ? "● Live" : "○ Draft"} size="small" color={isPublished ? "success" : "default"} />
          <Chip label={`${website.pageCount ?? 0} pages`} size="small" icon={<ArticleOutlinedIcon sx={{ fontSize: "12px !important" }} />} />
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Primary action */}
        <Box
          onClick={() => navigate(`/dashboard/websites/${website._id}/pages`)}
          sx={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
            py: 1, borderRadius: "8px",
            background: alpha(COLORS.cyan, 0.07),
            border: `1px solid ${alpha(COLORS.cyan, 0.2)}`,
            cursor: "pointer", transition: "all 0.15s",
            "&:hover": { background: alpha(COLORS.cyan, 0.12), border: `1px solid ${alpha(COLORS.cyan, 0.35)}` },
          }}
        >
          <ArticleOutlinedIcon sx={{ fontSize: 15, color: COLORS.cyan }} />
          <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.cyan }}>
            Manage Pages
          </Typography>
        </Box>
      </CardContent>

      {/* Context menu */}
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{ sx: { minWidth: 180 } }}
      >
        <MenuItem onClick={() => { setAnchor(null); onEdit(website); }}>
          <EditOutlinedIcon sx={{ fontSize: 15, mr: 1.5 }} /> Edit details
        </MenuItem>
        <MenuItem onClick={() => { setAnchor(null); navigate(`/dashboard/websites/${website._id}/pages`); }}>
          <ArticleOutlinedIcon sx={{ fontSize: 15, mr: 1.5 }} /> Manage pages
        </MenuItem>
        <MenuItem onClick={() => { setAnchor(null); onPublish(website); }}>
          <RocketLaunchOutlinedIcon sx={{ fontSize: 15, mr: 1.5 }} />
          {isPublished ? "Unpublish" : "Publish"}
        </MenuItem>
        {isPublished && (
          <MenuItem onClick={() => { setAnchor(null); window.open(`/sites/${website.subdomain}`, "_blank"); }}>
            <OpenInNewIcon sx={{ fontSize: 15, mr: 1.5 }} /> View live site
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={() => { setAnchor(null); onDelete(website); }}
          sx={{ color: alpha("#f87171", 0.8), "&:hover": { background: alpha("#f87171", 0.08), color: "#f87171" } }}
        >
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 15, mr: 1.5 }} /> Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default WebsiteCard;