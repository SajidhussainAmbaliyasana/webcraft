import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, alpha } from "@mui/material";

import {
    useGetPublicSiteQuery,
    useGetPublicPageQuery
} from "../redux/api/websiteApi";

import ComponentRenderer from "../components/editor/ComponentRenderer";

// Loading Screen
const FullPageLoader = () => (
    <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <CircularProgress />
    </Box>
);

// Website Not Found
const SiteNotFound = ({ subdomain }) => (
    <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2
        }}
    >
        <Typography variant="h2">404</Typography>

        <Typography>
            Website "{subdomain}" not found
        </Typography>
    </Box>
);

// Page Not Found
// const PageNotFound = ({ subdomain, pageSlug }) => (
//     <Box
//         sx={{
//             minHeight: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//             gap: 2
//         }}
//     >
//         <Typography variant="h2">404</Typography>

//         <Typography>
//             Page "{pageSlug}" not found
//         </Typography>

//         <Typography>
//             Website: {subdomain}
//         </Typography>
//     </Box>
// );

const PageNotFound = ({ subdomain, slug, theme = {} }) => (
    <Box sx={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: theme.bg || "#ffffff", gap: 2, px: 3, textAlign: "center",
    }}>
        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(60px,12vw,120px)", letterSpacing: "-4px", color: theme.text || "#0f172a", opacity: 0.15, lineHeight: 1 }}>
            404
        </Typography>
        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: theme.text || "#0f172a" }}>
            Page not found
        </Typography>
        <Typography sx={{ color: alpha(theme.text || "#0f172a", 0.5), fontFamily: "'DM Mono', monospace", fontSize: "0.85rem" }}>
            /{slug} doesn't exist on this site.
        </Typography>
        <Box
            component="a"
            href={`/${subdomain}`}
            sx={{ mt: 1, px: 2, py: 1, borderRadius: "8px", background: theme.accent || "#3b82f6", color: "#fff", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
        >
            Go to home page
        </Box>
    </Box>
);

const SiteRenderer = () => {
    const { subdomain, pageSlug } = useParams();

    const homeQuery = useGetPublicSiteQuery(subdomain, {
        skip: !!pageSlug,
    });

    const pageQuery = useGetPublicPageQuery(
        {
            subdomain,
            pageSlug,
        },
        {
            skip: !pageSlug,
        }
    );

    const data = pageSlug
        ? pageQuery.data
        : homeQuery.data;

    const isLoading = pageSlug
        ? pageQuery.isLoading
        : homeQuery.isLoading;

    const isError = pageSlug
        ? pageQuery.isError
        : homeQuery.isError;

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (isError || !data?.success) {

        if (pageSlug) {
            return (
                <PageNotFound
                    subdomain={subdomain}
                    slug={pageSlug}
                />
            );
        }

        return (
            <SiteNotFound
                subdomain={subdomain}
            />
        );
    }

    const {
        website,
        page,
        components = []
    } = data;

    document.title = page?.title
        ? `${page.title} | ${website?.name}`
        : website?.name || "WebCraft";

    const sortedComponents = [...components].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );

    return (
        <Box
            sx={{
                minHeight: "100vh"
            }}
        >
            {sortedComponents.length === 0 ? (
                <Box
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography>
                        This page has no content yet.
                    </Typography>
                </Box>
            ) : (
                sortedComponents.map((component, index) => (
                    <ComponentRenderer
                        key={component._id || index}
                        component={component}
                        editorMode={false}
                    />
                ))
            )}
        </Box>
    );
};

export default SiteRenderer;