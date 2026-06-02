// src/components/editor/ComponentInspector.jsx
import { useState, useEffect } from "react";
import {
    Box, Typography, TextField, Button, Divider,
    IconButton, Tooltip, Tabs, Tab, Slider,
    Select, MenuItem, FormControl, InputLabel, alpha,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import { COLORS } from "../../theme";

// ── Tiny colour swatch picker ─────────────────────────────────
const SWATCHES = [
    "#ffffff", "#f8fafc", "#0f172a", "#060812",
    "#fef2f2", "#f0fdf4", "#f0f9ff", "#fdf4ff",
    "#4fc3f7", "#7c4dff", "#f472b6", "#34d399",
    "#fbbf24", "#f87171", "#60a5fa", "transparent",
];

const ColorRow = ({ label, value, onChange }) => (
    <Box sx={{ mb: 1.5 }}>
        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 0.75 }}>
            {label}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 0.75 }}>
            {SWATCHES.map((c) => (
                <Box
                    key={c}
                    onClick={() => onChange(c)}
                    sx={{
                        width: 20, height: 20, borderRadius: "5px",
                        background: c === "transparent" ? "repeating-conic-gradient(#aaa 0% 25%, #fff 0% 50%) 0 0 / 8px 8px" : c,
                        border: value === c ? `2px solid ${COLORS.cyan}` : `1px solid rgba(255,255,255,0.15)`,
                        cursor: "pointer", transition: "transform 0.1s",
                        "&:hover": { transform: "scale(1.15)" },
                    }}
                />
            ))}
        </Box>
        <TextField
            size="small" fullWidth
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. #ffffff or transparent"
            sx={{ "& .MuiOutlinedInput-root": { fontFamily: "'DM Mono', monospace", fontSize: "0.72rem" } }}
        />
    </Box>
);

// ── Main inspector ────────────────────────────────────────────
const ComponentInspector = ({ component, onUpdate, onDelete, onMoveUp, onMoveDown, onDeselect }) => {
    const [tab, setTab] = useState(0);
    const [contentStr, setContentStr] = useState("");
    const [propsStr, setPropsStr] = useState("");
    const [contentError, setContentError] = useState("");
    const [propsError, setPropsError] = useState("");
    const [styles, setStyles] = useState({});

    useEffect(() => {
        if (component) {
            setContentStr(JSON.stringify(component.data?.content || {}, null, 2));
            setPropsStr(JSON.stringify(component.data?.props || {}, null, 2));
            setStyles(component.data?.styles || {});
            setContentError(""); setPropsError(""); setTab(0);
        }
    }, [component]);

    // Empty state
    if (!component) {
        return (
            <Box sx={{ width: 260, borderLeft: `1px solid ${COLORS.borderSubtle}`, background: COLORS.bgSurface, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, p: 3 }}>
                <Box sx={{ width: 44, height: 44, borderRadius: "12px", background: alpha(COLORS.borderSubtle, 0.5), border: `1px solid ${COLORS.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: COLORS.textMuted }}>◈</Box>
                <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.textMuted, textAlign: "center", lineHeight: 1.6 }}>
                    Select a component<br />to inspect properties
                </Typography>
            </Box>
        );
    }

    const handleSaveContent = () => {
        let content, props;
        try { content = JSON.parse(contentStr); setContentError(""); } catch { setContentError("Invalid JSON"); return; }
        try { props = JSON.parse(propsStr); setPropsError(""); } catch { setPropsError("Invalid JSON"); return; }
        onUpdate({
            ...component,
            data: {
                content,
                props,
                styles,
            },
        });
    };

    const handleSaveStyles = () => {
        let content = component.data?.content || {};
        let props = component.data?.props || {};
        try { content = JSON.parse(contentStr); } catch { }
        try { props = JSON.parse(propsStr); } catch { }
        onUpdate({
            ...component,
            data: {
                content,
                props,
                styles,
            },
        });
    };

    const setStyle = (key, val) => setStyles((p) => ({ ...p, [key]: val }));

    return (
        <Box sx={{ width: 260, flexShrink: 0, borderLeft: `1px solid ${COLORS.borderSubtle}`, background: COLORS.bgSurface, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Header */}
            <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                    <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px" }}>INSPECTOR</Typography>
                    <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: COLORS.textPrimary }}>{component.type}</Typography>
                </Box>
                <Tooltip title="Deselect" arrow>
                    <IconButton size="small" onClick={onDeselect} sx={{ color: COLORS.textMuted }}>
                        <CloseIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Move + Delete row */}
            <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.borderSubtle}`, display: "flex", gap: 1 }}>
                <Tooltip title="Move up" arrow>
                    <IconButton size="small" onClick={onMoveUp} sx={{ color: COLORS.textMuted, border: `1px solid ${COLORS.borderSubtle}`, borderRadius: "7px" }}><KeyboardArrowUpIcon sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
                <Tooltip title="Move down" arrow>
                    <IconButton size="small" onClick={onMoveDown} sx={{ color: COLORS.textMuted, border: `1px solid ${COLORS.borderSubtle}`, borderRadius: "7px" }}><KeyboardArrowDownIcon sx={{ fontSize: 16 }} /></IconButton>
                </Tooltip>
                <Box sx={{ flex: 1 }} />
                <Tooltip title="Delete component" arrow>
                    <IconButton size="small" onClick={onDelete} sx={{ color: alpha("#f87171", 0.7), border: `1px solid ${alpha("#f87171", 0.2)}`, borderRadius: "7px", "&:hover": { background: alpha("#f87171", 0.08) } }}>
                        <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Tabs */}
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: `1px solid ${COLORS.borderSubtle}`, minHeight: 40 }}>
                <Tab icon={<CodeIcon sx={{ fontSize: 14 }} />} iconPosition="start" label="Content" sx={{ minHeight: 40, fontSize: "0.72rem", py: 0 }} />
                <Tab icon={<PaletteOutlinedIcon sx={{ fontSize: 14 }} />} iconPosition="start" label="Styles" sx={{ minHeight: 40, fontSize: "0.72rem", py: 0 }} />
            </Tabs>

            {/* Content tab */}
            {tab === 0 && (
                <>
                    <Box sx={{ flex: 1, overflow: "auto", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box>
                            <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 0.75 }}>CONTENT (JSON)</Typography>
                            <TextField multiline minRows={5} maxRows={12} fullWidth value={contentStr} onChange={(e) => setContentStr(e.target.value)} error={!!contentError} helperText={contentError}
                                sx={{ "& .MuiOutlinedInput-root": { fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", lineHeight: 1.6 } }}
                            />
                        </Box>
                        <Divider />
                        <Box>
                            <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 0.75 }}>PROPS (JSON)</Typography>
                            <TextField multiline minRows={3} maxRows={8} fullWidth value={propsStr} onChange={(e) => setPropsStr(e.target.value)} error={!!propsError} helperText={propsError}
                                sx={{ "& .MuiOutlinedInput-root": { fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", lineHeight: 1.6 } }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ p: 2, borderTop: `1px solid ${COLORS.borderSubtle}` }}>
                        <Button variant="contained" fullWidth size="small" onClick={handleSaveContent}>Apply Changes</Button>
                    </Box>
                </>
            )}

            {/* Styles tab */}
            {tab === 1 && (
                <>
                    <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>

                        <ColorRow label="BACKGROUND" value={styles.backgroundColor || "transparent"} onChange={(v) => setStyle("backgroundColor", v)} />
                        <ColorRow label="TEXT COLOR" value={styles.color || ""} onChange={(v) => setStyle("color", v)} />

                        <Divider sx={{ my: 1.5 }} />

                        {/* Text align */}
                        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 0.75 }}>ALIGNMENT</Typography>
                        <Box sx={{ display: "flex", gap: 0.75, mb: 2 }}>
                            {["left", "center", "right"].map((a) => (
                                <Box key={a} onClick={() => setStyle("textAlign", a)} sx={{ flex: 1, py: 0.75, borderRadius: "7px", cursor: "pointer", textAlign: "center", border: `1px solid ${styles.textAlign === a ? COLORS.cyan : COLORS.borderSubtle}`, background: styles.textAlign === a ? alpha(COLORS.cyan, 0.08) : "transparent", fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: styles.textAlign === a ? COLORS.cyan : COLORS.textMuted, transition: "all 0.12s" }}>
                                    {a.charAt(0).toUpperCase() + a.slice(1)}
                                </Box>
                            ))}
                        </Box>

                        {/* Padding */}
                        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 0.75 }}>PADDING TOP — {styles.paddingTop ?? 32}px</Typography>
                        <Slider value={styles.paddingTop ?? 32} onChange={(_, v) => setStyle("paddingTop", v)} min={0} max={120} step={4} size="small" sx={{ color: COLORS.cyan, mb: 1 }} />

                        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 0.75 }}>PADDING BOTTOM — {styles.paddingBottom ?? 32}px</Typography>
                        <Slider value={styles.paddingBottom ?? 32} onChange={(_, v) => setStyle("paddingBottom", v)} min={0} max={120} step={4} size="small" sx={{ color: COLORS.purple, mb: 1 }} />

                        <Divider sx={{ my: 1.5 }} />

                        {/* Border radius */}
                        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "1px", mb: 0.75 }}>BORDER RADIUS — {styles.borderRadius ?? 0}px</Typography>
                        <Slider value={styles.borderRadius ?? 0} onChange={(_, v) => setStyle("borderRadius", v)} min={0} max={40} step={2} size="small" sx={{ color: COLORS.pink, mb: 1 }} />

                        <ColorRow label="BORDER COLOR" value={styles.borderColor || "transparent"} onChange={(v) => setStyle("borderColor", v)} />

                        <Divider sx={{ my: 1.5 }} />

                        {/* Max width */}
                        <FormControl fullWidth size="small">
                            <InputLabel sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem" }}>Max Width</InputLabel>
                            <Select value={styles.maxWidth || "100%"} label="Max Width" onChange={(e) => setStyle("maxWidth", e.target.value)} sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>
                                {["100%", "1200px", "960px", "720px", "600px", "480px"].map((w) => (
                                    <MenuItem key={w} value={w} sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>{w}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Box>
                    <Box sx={{ p: 2, borderTop: `1px solid ${COLORS.borderSubtle}` }}>
                        <Button variant="contained" fullWidth size="small" onClick={handleSaveStyles}>Apply Styles</Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ComponentInspector;