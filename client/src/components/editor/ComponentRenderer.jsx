// // src/components/editor/ComponentRenderer.jsx
// import {
//     Box, Typography, Button, Accordion,
//     AccordionSummary, AccordionDetails, alpha
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import CheckIcon from "@mui/icons-material/Check";
// import { useState } from "react";
// import { COLORS } from "../../theme";

// // ── Helpers ───────────────────────────────────────────────────
// const t = (pageTheme, key, fallback) => pageTheme?.[key] || fallback;

// // ── Individual renderers ──────────────────────────────────────

// const HeroRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     const accent = t(pageTheme, "accent", COLORS.cyan);
//     return (
//         <Box sx={{ py: { xs: 8, md: p.large ? 14 : 10 }, px: { xs: 3, md: 8 }, textAlign: p.align || "center" }}>
//             {content.badge && (
//                 <Box component="span" sx={{ display: "inline-block", mb: 3, px: 2, py: 0.5, borderRadius: "100px", border: `1px solid ${alpha(accent, 0.35)}`, fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: accent, background: alpha(accent, 0.07) }}>
//                     {content.badge}
//                 </Box>
//             )}
//             <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, color: text, letterSpacing: "-2px", lineHeight: 1.1, mb: 2 }}>
//                 {content.heading || "Your Headline Here"}
//             </Typography>
//             {content.subheading && (
//                 <Typography sx={{ fontSize: "1.05rem", color: alpha(text, 0.6), maxWidth: 560, mx: "auto", mb: 4, lineHeight: 1.75 }}>
//                     {content.subheading}
//                 </Typography>
//             )}
//             {content.buttonText && (
//                 <Button variant="contained" size="large" href={content.buttonUrl || "#"} sx={{ background: `linear-gradient(135deg, ${accent}, #7c4dff)`, color: "#fff" }}>
//                     {content.buttonText}
//                 </Button>
//             )}
//         </Box>
//     );
// };

// const TextRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     return (
//         <Box sx={{ py: 4, px: { xs: 3, md: 6 }, textAlign: p.align || "left", maxWidth: p.narrow ? 680 : "100%", mx: p.narrow ? "auto" : undefined }}>
//             {content.heading && (
//                 <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: text, mb: 1.5, letterSpacing: "-0.5px" }}>
//                     {content.heading}
//                 </Typography>
//             )}
//             {content.body && (
//                 <Typography sx={{ fontSize: "0.95rem", color: alpha(text, 0.6), lineHeight: 1.85 }}>
//                     {content.body}
//                 </Typography>
//             )}
//         </Box>
//     );
// };

// const ButtonRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
//     const accent = t(pageTheme, "accent", COLORS.cyan);
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     return (
//         <Box sx={{ py: 3, px: { xs: 3, md: 6 }, textAlign: p.align || "center" }}>
//             <Button
//                 variant={p.variant || "contained"}
//                 size={p.size || "large"}
//                 href={content.url || "#"}
//                 sx={p.variant === "outlined"
//                     ? { borderColor: alpha(accent, 0.5), color: text }
//                     : { background: `linear-gradient(135deg, ${accent}, #7c4dff)`, color: "#fff" }
//                 }
//             >
//                 {content.label || "Click Here"}
//             </Button>
//         </Box>
//     );
// };

// const ImageRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
//     const border = t(pageTheme, "border", COLORS.borderSubtle);
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     return (
//         <Box sx={{ py: 3, px: p.fullWidth ? 0 : { xs: 3, md: 6 } }}>
//             {content.src ? (
//                 <Box component="img" src={content.src} alt={content.alt || ""}
//                     sx={{ width: "100%", borderRadius: p.fullWidth ? 0 : "12px", display: "block", objectFit: "cover", maxHeight: p.tall ? 500 : 320 }}
//                 />
//             ) : (
//                 <Box sx={{ width: "100%", height: 160, borderRadius: "12px", background: alpha(border, 0.3), border: `1px dashed ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: alpha(text, 0.3) }}>
//                     ◫ &nbsp; Set content.src to your image URL
//                 </Box>
//             )}
//         </Box>
//     );
// };

// const CardGridRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     const accent = t(pageTheme, "accent", COLORS.cyan);
//     const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
//     const border = t(pageTheme, "border", COLORS.borderSubtle);
//     const cards = content.cards || [];
//     return (
//         <Box sx={{ py: 6, px: { xs: 3, md: 6 } }}>
//             {content.heading && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 1, textAlign: "center" }}>{content.heading}</Typography>}
//             {content.subheading && <Typography sx={{ color: alpha(text, 0.55), textAlign: "center", mb: 5, fontSize: "0.95rem" }}>{content.subheading}</Typography>}
//             <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2.5 }}>
//                 {cards.map((card, i) => (
//                     <Box key={i} sx={{ p: 2.5, borderRadius: "12px", background: cardBg, border: `1px solid ${border}` }}>
//                         <Box sx={{ fontSize: 24, mb: 1.5, color: accent }}>{card.icon}</Box>
//                         <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: text, mb: 0.75 }}>{card.title}</Typography>
//                         <Typography sx={{ fontSize: "0.85rem", color: alpha(text, 0.55), lineHeight: 1.7 }}>{card.description}</Typography>
//                     </Box>
//                 ))}
//             </Box>
//         </Box>
//     );
// };

// const TestimonialRenderer = ({ content = {}, pageTheme = {} }) => {
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     const accent = t(pageTheme, "accent", COLORS.cyan);
//     const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
//     const border = t(pageTheme, "border", COLORS.borderSubtle);
//     const items = content.testimonials || [];
//     return (
//         <Box sx={{ py: 6, px: { xs: 3, md: 6 } }}>
//             {content.heading && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 4, textAlign: "center" }}>{content.heading}</Typography>}
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                 {items.map((item, i) => (
//                     <Box key={i} sx={{ p: 3, borderRadius: "12px", border: `1px solid ${border}`, background: cardBg, display: "flex", gap: 2 }}>
//                         <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, #7c4dff)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "#fff", flexShrink: 0 }}>
//                             {item.name?.[0] || "?"}
//                         </Box>
//                         <Box>
//                             <Typography sx={{ fontSize: "0.95rem", color: alpha(text, 0.65), lineHeight: 1.7, mb: 1, fontStyle: "italic" }}>"{item.quote}"</Typography>
//                             <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: text }}>{item.name}</Typography>
//                             <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: alpha(text, 0.4) }}>{item.role}</Typography>
//                         </Box>
//                     </Box>
//                 ))}
//             </Box>
//         </Box>
//     );
// };

// const FaqRenderer = ({ content = {}, pageTheme = {} }) => {
//     const [expanded, setExpanded] = useState(false);
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     const accent = t(pageTheme, "accent", COLORS.cyan);
//     const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
//     const border = t(pageTheme, "border", COLORS.borderSubtle);
//     const items = content.faqs || [];
//     return (
//         <Box sx={{ py: 6, px: { xs: 3, md: 6 }, maxWidth: 720, mx: "auto" }}>
//             {content.heading && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 4, textAlign: "center" }}>{content.heading}</Typography>}
//             {items.map((item, i) => (
//                 <Accordion key={i} expanded={expanded === i} onChange={() => setExpanded(expanded === i ? false : i)}
//                     sx={{ background: cardBg, border: `1px solid ${expanded === i ? alpha(accent, 0.3) : border}`, borderRadius: "10px !important", mb: 1, "&:before": { display: "none" } }}
//                 >
//                     <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: alpha(text, 0.4) }} />}>
//                         <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: text }}>{item.question}</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography sx={{ fontSize: "0.85rem", color: alpha(text, 0.6), lineHeight: 1.8 }}>{item.answer}</Typography>
//                     </AccordionDetails>
//                 </Accordion>
//             ))}
//         </Box>
//     );
// };

// const DividerRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     const border = t(pageTheme, "border", COLORS.borderSubtle);
//     return (
//         <Box sx={{ py: p.compact ? 2 : 4, px: { xs: 3, md: 6 } }}>
//             <Box sx={{ borderTop: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 {content.label && (
//                     <Box sx={{ mt: "-11px", px: 1.5, background: "transparent" }}>
//                         <Typography variant="caption" sx={{ color: alpha(text, 0.3) }}>{content.label}</Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// const FeatureRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     const accent = t(pageTheme, "accent", COLORS.cyan);
//     const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
//     const border = t(pageTheme, "border", COLORS.borderSubtle);
//     const feats = content.features || [];
//     return (
//         <Box sx={{ py: 6, px: { xs: 3, md: 6 } }}>
//             {content.heading && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 1, textAlign: "center" }}>{content.heading}</Typography>}
//             {content.subheading && <Typography sx={{ color: alpha(text, 0.55), textAlign: "center", mb: 5, fontSize: "0.95rem" }}>{content.subheading}</Typography>}
//             <Box sx={{ display: "flex", flexDirection: p.layout === "row" ? "row" : "column", gap: 2, flexWrap: "wrap" }}>
//                 {feats.map((f, i) => (
//                     <Box key={i} sx={{ flex: p.layout === "row" ? "1 1 200px" : "unset", display: "flex", gap: 2, p: 2.5, borderRadius: "12px", border: `1px solid ${border}`, background: cardBg, "&:hover": { border: `1px solid ${alpha(accent, 0.3)}` }, transition: "all 0.2s" }}>
//                         <Box sx={{ width: 36, height: 36, borderRadius: "9px", flexShrink: 0, background: alpha(accent, 0.1), border: `1px solid ${alpha(accent, 0.25)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: accent }}>
//                             {f.icon}
//                         </Box>
//                         <Box>
//                             <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: text, mb: 0.5 }}>{f.title}</Typography>
//                             <Typography sx={{ fontSize: "0.83rem", color: alpha(text, 0.55), lineHeight: 1.7 }}>{f.description}</Typography>
//                         </Box>
//                     </Box>
//                 ))}
//             </Box>
//         </Box>
//     );
// };

// const PricingRenderer = ({ content = {}, pageTheme = {} }) => {
//     const text = t(pageTheme, "text", COLORS.textPrimary);
//     const accent = t(pageTheme, "accent", COLORS.cyan);
//     const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
//     const border = t(pageTheme, "border", COLORS.borderSubtle);
//     const plans = content.plans || [];
//     return (
//         <Box sx={{ py: 6, px: { xs: 3, md: 6 } }}>
//             {content.heading && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 1, textAlign: "center" }}>{content.heading}</Typography>}
//             {content.subheading && <Typography sx={{ color: alpha(text, 0.55), textAlign: "center", mb: 5, fontSize: "0.95rem" }}>{content.subheading}</Typography>}
//             <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
//                 {plans.map((plan, i) => (
//                     <Box key={i} sx={{ flex: "1 1 220px", borderRadius: "12px", background: cardBg, border: `1px solid ${plan.highlighted ? alpha(accent, 0.45) : border}`, boxShadow: plan.highlighted ? `0 0 40px ${alpha(accent, 0.1)}` : "none", transform: plan.highlighted ? "scale(1.02)" : "scale(1)", p: 2.5, position: "relative" }}>
//                         {plan.highlighted && (
//                             <Box sx={{ position: "absolute", top: 12, right: 12, px: 1.2, py: 0.3, borderRadius: "100px", background: alpha(accent, 0.15), border: `1px solid ${alpha(accent, 0.3)}` }}>
//                                 <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: accent }}>POPULAR</Typography>
//                             </Box>
//                         )}
//                         <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: alpha(text, 0.4), mb: 0.5 }}>{plan.name}</Typography>
//                         <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2rem", color: text, letterSpacing: "-1px", mb: 0.3 }}>
//                             {plan.price}<Typography component="span" sx={{ fontSize: "0.8rem", fontWeight: 400, color: alpha(text, 0.35) }}>/mo</Typography>
//                         </Typography>
//                         <Typography sx={{ fontSize: "0.82rem", color: alpha(text, 0.5), mb: 2.5 }}>{plan.description}</Typography>
//                         <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
//                             {(plan.features || []).map((f, j) => (
//                                 <Box key={j} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                     <CheckIcon sx={{ fontSize: 14, color: plan.highlighted ? accent : COLORS.green }} />
//                                     <Typography sx={{ fontSize: "0.82rem", color: alpha(text, 0.6) }}>{f}</Typography>
//                                 </Box>
//                             ))}
//                         </Box>
//                         <Button variant={plan.highlighted ? "contained" : "outlined"} fullWidth size="small"
//                             sx={plan.highlighted ? { background: `linear-gradient(135deg, ${accent}, #7c4dff)`, color: "#fff" } : { borderColor: alpha(accent, 0.3), color: alpha(text, 0.7) }}
//                         >Get started</Button>
//                     </Box>
//                 ))}
//             </Box>
//         </Box>
//     );
// };

// // ── Registry map ─────────────────────────────────────────────
// const REGISTRY = {
//     hero: HeroRenderer,
//     text: TextRenderer,
//     button: ButtonRenderer,
//     image: ImageRenderer,
//     card_grid: CardGridRenderer,
//     testimonial: TestimonialRenderer,
//     faq: FaqRenderer,
//     divider: DividerRenderer,
//     feature: FeatureRenderer,
//     pricing: PricingRenderer,
// };

// // ── Main component ────────────────────────────────────────────
// const ComponentRenderer = ({ component, pageTheme = {}, editorMode = false, selected = false, onSelect }) => {
//     const Renderer = REGISTRY[component.type];

//     if (!Renderer) {
//         return (
//             <Box sx={{ py: 3, px: 4, my: 1, border: `1px dashed ${alpha("#f87171", 0.3)}`, borderRadius: "10px", background: alpha("#f87171", 0.04) }}>
//                 <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: alpha("#f87171", 0.7) }}>
//                     Unknown component: <strong>{component.type}</strong>
//                 </Typography>
//             </Box>
//         );
//     }

//     // Apply component-level styles
//     const styles = component.data?.styles || {};
//     const wrapSx = {
//         backgroundColor: styles.backgroundColor || "transparent",
//         color: styles.color || pageTheme?.text || "inherit",
//         textAlign: styles.textAlign || "unset",
//         fontFamily: pageTheme?.fontFamily || undefined,
//         ...(styles.paddingTop != null ? { paddingTop: `${styles.paddingTop}px` } : {}),
//         ...(styles.paddingBottom != null ? { paddingBottom: `${styles.paddingBottom}px` } : {}),
//         ...(styles.borderRadius != null ? { borderRadius: `${styles.borderRadius}px` } : {}),
//         ...(styles.borderColor ? { border: `1px solid ${styles.borderColor}` } : {}),
//         ...(styles.maxWidth && styles.maxWidth !== "100%" ? { maxWidth: styles.maxWidth, mx: "auto" } : {}),
//     };

//     const rendered = (
//         <Box sx={wrapSx}>
//             <Renderer
//                 content={component.data?.content || {}}
//                 props={component.data?.props || {}}
//                 styles={styles}
//                 pageTheme={pageTheme}
//             />
//         </Box>
//     );

//     if (!editorMode) return rendered;

//     return (
//         <Box
//             onClick={() => onSelect?.(component)}
//             sx={{
//                 position: "relative", cursor: "pointer",
//                 outline: selected ? `2px solid ${COLORS.cyan}` : `2px solid transparent`,
//                 outlineOffset: 2, borderRadius: "10px", transition: "outline 0.12s",
//                 "&:hover": { outline: `2px solid ${alpha(COLORS.cyan, 0.4)}` },
//             }}
//         >
//             {selected && (
//                 <Box sx={{ position: "absolute", top: -22, left: 0, zIndex: 10, px: 1.2, py: 0.2, borderRadius: "5px", background: COLORS.cyan, color: "#060812", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", fontWeight: 600, pointerEvents: "none", whiteSpace: "nowrap" }}>
//                     {component.type}
//                 </Box>
//             )}
//             {rendered}
//         </Box>
//     );
// };

// export default ComponentRenderer;
// src/components/editor/ComponentRenderer.jsx
// UPDATED: added NavbarRenderer — everything else unchanged
import {
    Box, Typography, Button, Accordion,
    AccordionSummary, AccordionDetails, alpha,
    IconButton, Drawer,
} from "@mui/material";
import ExpandMoreIcon    from "@mui/icons-material/ExpandMore";
import CheckIcon         from "@mui/icons-material/Check";
import MenuIcon          from "@mui/icons-material/Menu";
import CloseIcon         from "@mui/icons-material/Close";
import { useState }      from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLORS }        from "../../theme";

// ── Helpers ───────────────────────────────────────────────────
const t = (pageTheme, key, fallback) => pageTheme?.[key] || fallback;

// ─────────────────────────────────────────────────────────────
// ALL EXISTING RENDERERS — unchanged
// ─────────────────────────────────────────────────────────────

const HeroRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
    const text   = t(pageTheme, "text",   COLORS.textPrimary);
    const accent = t(pageTheme, "accent", COLORS.cyan);
    return (
        <Box sx={{ py: { xs: 8, md: p.large ? 14 : 10 }, px: { xs: 3, md: 8 }, textAlign: p.align || "center" }}>
            {content.badge && (
                <Box component="span" sx={{ display: "inline-block", mb: 3, px: 2, py: 0.5, borderRadius: "100px", border: `1px solid ${alpha(accent, 0.35)}`, fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: accent, background: alpha(accent, 0.07) }}>
                    {content.badge}
                </Box>
            )}
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: { xs: "2rem", md: "2.8rem" }, color: text, letterSpacing: "-2px", lineHeight: 1.1, mb: 2 }}>
                {content.heading || "Your Headline Here"}
            </Typography>
            {content.subheading && (
                <Typography sx={{ fontSize: "1.05rem", color: alpha(text, 0.6), maxWidth: 560, mx: "auto", mb: 4, lineHeight: 1.75 }}>
                    {content.subheading}
                </Typography>
            )}
            {content.buttonText && (
                <Button variant="contained" size="large" href={content.buttonUrl || "#"} sx={{ background: `linear-gradient(135deg, ${accent}, #7c4dff)`, color: "#fff" }}>
                    {content.buttonText}
                </Button>
            )}
        </Box>
    );
};

const TextRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
    const text = t(pageTheme, "text", COLORS.textPrimary);
    return (
        <Box sx={{ py: 4, px: { xs: 3, md: 6 }, textAlign: p.align || "left", maxWidth: p.narrow ? 680 : "100%", mx: p.narrow ? "auto" : undefined }}>
            {content.heading && (
                <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: text, mb: 1.5, letterSpacing: "-0.5px" }}>
                    {content.heading}
                </Typography>
            )}
            {content.body && (
                <Typography sx={{ fontSize: "0.95rem", color: alpha(text, 0.6), lineHeight: 1.85 }}>
                    {content.body}
                </Typography>
            )}
        </Box>
    );
};

const ButtonRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
    const accent = t(pageTheme, "accent", COLORS.cyan);
    const text   = t(pageTheme, "text",   COLORS.textPrimary);
    return (
        <Box sx={{ py: 3, px: { xs: 3, md: 6 }, textAlign: p.align || "center" }}>
            <Button variant={p.variant || "contained"} size={p.size || "large"} href={content.url || "#"}
                sx={p.variant === "outlined"
                    ? { borderColor: alpha(accent, 0.5), color: text }
                    : { background: `linear-gradient(135deg, ${accent}, #7c4dff)`, color: "#fff" }
                }
            >
                {content.label || "Click Here"}
            </Button>
        </Box>
    );
};

const ImageRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
    const border = t(pageTheme, "border", COLORS.borderSubtle);
    const text   = t(pageTheme, "text",   COLORS.textPrimary);
    return (
        <Box sx={{ py: 3, px: p.fullWidth ? 0 : { xs: 3, md: 6 } }}>
            {content.src ? (
                <Box component="img" src={content.src} alt={content.alt || ""}
                    sx={{ width: "100%", borderRadius: p.fullWidth ? 0 : "12px", display: "block", objectFit: "cover", maxHeight: p.tall ? 500 : 320 }}
                />
            ) : (
                <Box sx={{ width: "100%", height: 160, borderRadius: "12px", background: alpha(border, 0.3), border: `1px dashed ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: alpha(text, 0.3) }}>
                    ◫ &nbsp; Set content.src to your image URL
                </Box>
            )}
        </Box>
    );
};

const CardGridRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
    const text   = t(pageTheme, "text",   COLORS.textPrimary);
    const accent = t(pageTheme, "accent", COLORS.cyan);
    const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
    const border = t(pageTheme, "border", COLORS.borderSubtle);
    const cards  = content.cards || [];
    return (
        <Box sx={{ py: 6, px: { xs: 3, md: 6 } }}>
            {content.heading    && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 1, textAlign: "center" }}>{content.heading}</Typography>}
            {content.subheading && <Typography sx={{ color: alpha(text, 0.55), textAlign: "center", mb: 5, fontSize: "0.95rem" }}>{content.subheading}</Typography>}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2.5 }}>
                {cards.map((card, i) => (
                    <Box key={i} sx={{ p: 2.5, borderRadius: "12px", background: cardBg, border: `1px solid ${border}` }}>
                        <Box sx={{ fontSize: 24, mb: 1.5, color: accent }}>{card.icon}</Box>
                        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: text, mb: 0.75 }}>{card.title}</Typography>
                        <Typography sx={{ fontSize: "0.85rem", color: alpha(text, 0.55), lineHeight: 1.7 }}>{card.description}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const TestimonialRenderer = ({ content = {}, pageTheme = {} }) => {
    const text   = t(pageTheme, "text",   COLORS.textPrimary);
    const accent = t(pageTheme, "accent", COLORS.cyan);
    const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
    const border = t(pageTheme, "border", COLORS.borderSubtle);
    const items  = content.testimonials || [];
    return (
        <Box sx={{ py: 6, px: { xs: 3, md: 6 } }}>
            {content.heading && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 4, textAlign: "center" }}>{content.heading}</Typography>}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map((item, i) => (
                    <Box key={i} sx={{ p: 3, borderRadius: "12px", border: `1px solid ${border}`, background: cardBg, display: "flex", gap: 2 }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, #7c4dff)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "#fff", flexShrink: 0 }}>
                            {item.name?.[0] || "?"}
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "0.95rem", color: alpha(text, 0.65), lineHeight: 1.7, mb: 1, fontStyle: "italic" }}>"{item.quote}"</Typography>
                            <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: text }}>{item.name}</Typography>
                            <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",  color: alpha(text, 0.4) }}>{item.role}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const FaqRenderer = ({ content = {}, pageTheme = {} }) => {
    const [expanded, setExpanded] = useState(false);
    const text   = t(pageTheme, "text",   COLORS.textPrimary);
    const accent = t(pageTheme, "accent", COLORS.cyan);
    const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
    const border = t(pageTheme, "border", COLORS.borderSubtle);
    const items  = content.faqs || [];
    return (
        <Box sx={{ py: 6, px: { xs: 3, md: 6 }, maxWidth: 720, mx: "auto" }}>
            {content.heading && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 4, textAlign: "center" }}>{content.heading}</Typography>}
            {items.map((item, i) => (
                <Accordion key={i} expanded={expanded === i} onChange={() => setExpanded(expanded === i ? false : i)}
                    sx={{ background: cardBg, border: `1px solid ${expanded === i ? alpha(accent, 0.3) : border}`, borderRadius: "10px !important", mb: 1, "&:before": { display: "none" } }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: alpha(text, 0.4) }} />}>
                        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: text }}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ fontSize: "0.85rem", color: alpha(text, 0.6), lineHeight: 1.8 }}>{item.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

const DividerRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
    const text   = t(pageTheme, "text",   COLORS.textPrimary);
    const border = t(pageTheme, "border", COLORS.borderSubtle);
    return (
        <Box sx={{ py: p.compact ? 2 : 4, px: { xs: 3, md: 6 } }}>
            <Box sx={{ borderTop: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {content.label && (
                    <Box sx={{ mt: "-11px", px: 1.5 }}>
                        <Typography variant="caption" sx={{ color: alpha(text, 0.3) }}>{content.label}</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const FeatureRenderer = ({ content = {}, props: p = {}, pageTheme = {} }) => {
    const text   = t(pageTheme, "text",   COLORS.textPrimary);
    const accent = t(pageTheme, "accent", COLORS.cyan);
    const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
    const border = t(pageTheme, "border", COLORS.borderSubtle);
    const feats  = content.features || [];
    return (
        <Box sx={{ py: 6, px: { xs: 3, md: 6 } }}>
            {content.heading    && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 1, textAlign: "center" }}>{content.heading}</Typography>}
            {content.subheading && <Typography sx={{ color: alpha(text, 0.55), textAlign: "center", mb: 5, fontSize: "0.95rem" }}>{content.subheading}</Typography>}
            <Box sx={{ display: "flex", flexDirection: p.layout === "row" ? "row" : "column", gap: 2, flexWrap: "wrap" }}>
                {feats.map((f, i) => (
                    <Box key={i} sx={{ flex: p.layout === "row" ? "1 1 200px" : "unset", display: "flex", gap: 2, p: 2.5, borderRadius: "12px", border: `1px solid ${border}`, background: cardBg, "&:hover": { border: `1px solid ${alpha(accent, 0.3)}` }, transition: "all 0.2s" }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: "9px", flexShrink: 0, background: alpha(accent, 0.1), border: `1px solid ${alpha(accent, 0.25)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: accent }}>
                            {f.icon}
                        </Box>
                        <Box>
                            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: text, mb: 0.5 }}>{f.title}</Typography>
                            <Typography sx={{ fontSize: "0.83rem", color: alpha(text, 0.55), lineHeight: 1.7 }}>{f.description}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const PricingRenderer = ({ content = {}, pageTheme = {} }) => {
    const text   = t(pageTheme, "text",   COLORS.textPrimary);
    const accent = t(pageTheme, "accent", COLORS.cyan);
    const cardBg = t(pageTheme, "cardBg", COLORS.bgCard);
    const border = t(pageTheme, "border", COLORS.borderSubtle);
    const plans  = content.plans || [];
    return (
        <Box sx={{ py: 6, px: { xs: 3, md: 6 } }}>
            {content.heading    && <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: text, letterSpacing: "-1px", mb: 1, textAlign: "center" }}>{content.heading}</Typography>}
            {content.subheading && <Typography sx={{ color: alpha(text, 0.55), textAlign: "center", mb: 5, fontSize: "0.95rem" }}>{content.subheading}</Typography>}
            <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
                {plans.map((plan, i) => (
                    <Box key={i} sx={{ flex: "1 1 220px", borderRadius: "12px", background: cardBg, border: `1px solid ${plan.highlighted ? alpha(accent, 0.45) : border}`, boxShadow: plan.highlighted ? `0 0 40px ${alpha(accent, 0.1)}` : "none", transform: plan.highlighted ? "scale(1.02)" : "scale(1)", p: 2.5, position: "relative" }}>
                        {plan.highlighted && (
                            <Box sx={{ position: "absolute", top: 12, right: 12, px: 1.2, py: 0.3, borderRadius: "100px", background: alpha(accent, 0.15), border: `1px solid ${alpha(accent, 0.3)}` }}>
                                <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: accent }}>POPULAR</Typography>
                            </Box>
                        )}
                        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: alpha(text, 0.4), mb: 0.5 }}>{plan.name}</Typography>
                        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2rem", color: text, letterSpacing: "-1px", mb: 0.3 }}>
                            {plan.price}<Typography component="span" sx={{ fontSize: "0.8rem", fontWeight: 400, color: alpha(text, 0.35) }}>/mo</Typography>
                        </Typography>
                        <Typography sx={{ fontSize: "0.82rem", color: alpha(text, 0.5), mb: 2.5 }}>{plan.description}</Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
                            {(plan.features || []).map((f, j) => (
                                <Box key={j} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <CheckIcon sx={{ fontSize: 14, color: plan.highlighted ? accent : COLORS.green }} />
                                    <Typography sx={{ fontSize: "0.82rem", color: alpha(text, 0.6) }}>{f}</Typography>
                                </Box>
                            ))}
                        </Box>
                        <Button variant={plan.highlighted ? "contained" : "outlined"} fullWidth size="small"
                            sx={plan.highlighted ? { background: `linear-gradient(135deg, ${accent}, #7c4dff)`, color: "#fff" } : { borderColor: alpha(accent, 0.3), color: alpha(text, 0.7) }}
                        >Get started</Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

// ─────────────────────────────────────────────────────────────
// ✅ NEW: NavbarRenderer
// Renders a navigation bar with 2–5 links.
// On public site: clicking a link navigates to /:subdomain/:slug
// In editor mode: links are not clickable (just visual)
// ─────────────────────────────────────────────────────────────
const NavbarRenderer = ({ content = {}, props: p = {}, pageTheme = {}, editorMode = false }) => {
    const navigate            = useNavigate();
    const { subdomain }       = useParams();
    const [mobileOpen, setMobileOpen] = useState(false);

    const bg     = p.transparent ? "transparent" : (pageTheme.cardBg || "#0f1428");
    const text   = pageTheme.text   || "#e8f4fd";
    const accent = pageTheme.accent || "#4fc3f7";
    const border = pageTheme.border || "rgba(99,179,237,0.1)";

    // Enforce 2–5 items
    const items = (content.navItems || [
        { label: "Home",    slug: "/"        },
        { label: "About",   slug: "/about"   },
        { label: "Contact", slug: "/contact" },
    ]).slice(0, 5);

    const siteName = content.siteName || "My Website";
    const logoLetter = (content.logoText || siteName.charAt(0)).toUpperCase();

    const handleNav = (slug) => {
        setMobileOpen(false);
        if (editorMode) return; // no navigation in editor

        if (!subdomain) return;

        if (slug === "/" || slug === "") {
            navigate(`/${subdomain}`);
        } else {
            const clean = slug.startsWith("/") ? slug.slice(1) : slug;
            navigate(`/${subdomain}/${clean}`);
        }
    };

    const logoStyle = {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    };

    const logoBoxStyle = {
        width: 34, height: 34,
        borderRadius: "9px",
        background: `linear-gradient(135deg, ${accent}, #7c4dff)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: "15px", color: "#fff",
        flexShrink: 0,
    };

    const linkStyle = (hover = false) => ({
        px: 2, py: 0.75,
        borderRadius: "8px",
        cursor: editorMode ? "default" : "pointer",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.82rem",
        color: alpha(text, hover ? 1 : 0.6),
        background: hover ? alpha(accent, 0.08) : "transparent",
        transition: "all 0.15s",
        userSelect: "none",
    });

    return (
        <Box
            component="nav"
            sx={{
                position: p.sticky ? "sticky" : "relative",
                top: 0,
                zIndex: 100,
                background: bg,
                borderBottom: `1px solid ${border}`,
                backdropFilter: p.blur !== false ? "blur(14px)" : "none",
                px: { xs: 3, md: 6 },
                py: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
            }}
        >
            {/* Logo */}
            <Box sx={logoStyle} onClick={() => handleNav("/")}>
                {content.showLogo !== false && <Box sx={logoBoxStyle}>{logoLetter}</Box>}
                <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: text, letterSpacing: "-0.3px" }}>
                    {siteName}
                </Typography>
            </Box>

            {/* Desktop links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
                {items.map((item, i) => (
                    <Box
                        key={i}
                        onClick={() => handleNav(item.slug)}
                        sx={linkStyle()}
                        onMouseEnter={(e) => { if (!editorMode) { e.currentTarget.style.background = alpha(accent, 0.08); e.currentTarget.style.color = text; } }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = alpha(text, 0.6); }}
                    >
                        {item.label}
                    </Box>
                ))}

                {/* Optional CTA */}
                {content.ctaLabel && (
                    <Box
                        onClick={() => handleNav(content.ctaSlug || "/contact")}
                        sx={{
                            ml: 1, px: 2, py: 0.75,
                            borderRadius: "8px",
                            cursor: editorMode ? "default" : "pointer",
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700, fontSize: "0.82rem",
                            background: `linear-gradient(135deg, ${accent}, #7c4dff)`,
                            color: "#fff",
                            transition: "all 0.15s",
                            "&:hover": { opacity: editorMode ? 1 : 0.9 },
                        }}
                    >
                        {content.ctaLabel}
                    </Box>
                )}
            </Box>

            {/* Mobile hamburger */}
            <IconButton
                sx={{ display: { xs: "flex", md: "none" }, color: text }}
                onClick={() => !editorMode && setMobileOpen(true)}
                size="small"
            >
                <MenuIcon />
            </IconButton>

            {/* Mobile drawer */}
            {!editorMode && (
                <Drawer
                    anchor="right"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    PaperProps={{ sx: { width: 260, background: pageTheme.cardBg || "#0f1428", border: `1px solid ${border}` } }}
                >
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: text }}>{siteName}</Typography>
                            <IconButton size="small" onClick={() => setMobileOpen(false)} sx={{ color: text }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                            {items.map((item, i) => (
                                <Box key={i} onClick={() => handleNav(item.slug)}
                                    sx={{ px: 2, py: 1.25, borderRadius: "9px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: "0.88rem", color: alpha(text, 0.7), "&:hover": { background: alpha(accent, 0.08), color: text }, transition: "all 0.15s" }}
                                >
                                    {item.label}
                                </Box>
                            ))}
                            {content.ctaLabel && (
                                <Box onClick={() => handleNav(content.ctaSlug || "/contact")}
                                    sx={{ mt: 2, px: 2, py: 1.25, borderRadius: "9px", cursor: "pointer", textAlign: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem", background: `linear-gradient(135deg, ${accent}, #7c4dff)`, color: "#fff" }}
                                >
                                    {content.ctaLabel}
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

// ─────────────────────────────────────────────────────────────
// REGISTRY — added navbar
// ─────────────────────────────────────────────────────────────
const REGISTRY = {
    hero:        HeroRenderer,
    text:        TextRenderer,
    button:      ButtonRenderer,
    image:       ImageRenderer,
    card_grid:   CardGridRenderer,
    testimonial: TestimonialRenderer,
    faq:         FaqRenderer,
    divider:     DividerRenderer,
    feature:     FeatureRenderer,
    pricing:     PricingRenderer,
    navbar:      NavbarRenderer,   // ✅ NEW
};

// ─────────────────────────────────────────────────────────────
// Main ComponentRenderer — unchanged
// ─────────────────────────────────────────────────────────────
const ComponentRenderer = ({ component, pageTheme = {}, editorMode = false, selected = false, onSelect }) => {
    const Renderer = REGISTRY[component.type];

    if (!Renderer) {
        return (
            <Box sx={{ py: 3, px: 4, my: 1, border: `1px dashed ${alpha("#f87171", 0.3)}`, borderRadius: "10px", background: alpha("#f87171", 0.04) }}>
                <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: alpha("#f87171", 0.7) }}>
                    Unknown component: <strong>{component.type}</strong>
                </Typography>
            </Box>
        );
    }

    const styles = component.data?.styles || {};
    const wrapSx = {
        backgroundColor: styles.backgroundColor || "transparent",
        color:           styles.color           || pageTheme?.text || "inherit",
        textAlign:       styles.textAlign       || "unset",
        fontFamily:      pageTheme?.fontFamily  || undefined,
        ...(styles.paddingTop    != null ? { paddingTop:    `${styles.paddingTop}px`    } : {}),
        ...(styles.paddingBottom != null ? { paddingBottom: `${styles.paddingBottom}px` } : {}),
        ...(styles.borderRadius  != null ? { borderRadius:  `${styles.borderRadius}px`  } : {}),
        ...(styles.borderColor              ? { border: `1px solid ${styles.borderColor}` } : {}),
        ...(styles.maxWidth && styles.maxWidth !== "100%" ? { maxWidth: styles.maxWidth, mx: "auto" } : {}),
    };

    const rendered = (
        <Box sx={wrapSx}>
            <Renderer
                content={component.data?.content || {}}
                props={component.data?.props     || {}}
                styles={styles}
                pageTheme={pageTheme}
                editorMode={editorMode}
            />
        </Box>
    );

    if (!editorMode) return rendered;

    return (
        <Box
            onClick={() => onSelect?.(component)}
            sx={{
                position: "relative", cursor: "pointer",
                outline: selected ? `2px solid ${COLORS.cyan}` : `2px solid transparent`,
                outlineOffset: 2, borderRadius: "10px", transition: "outline 0.12s",
                "&:hover": { outline: `2px solid ${alpha(COLORS.cyan, 0.4)}` },
            }}
        >
            {selected && (
                <Box sx={{ position: "absolute", top: -22, left: 0, zIndex: 10, px: 1.2, py: 0.2, borderRadius: "5px", background: COLORS.cyan, color: "#060812", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", fontWeight: 600, pointerEvents: "none", whiteSpace: "nowrap" }}>
                    {component.type}
                </Box>
            )}
            {rendered}
        </Box>
    );
};

export default ComponentRenderer;