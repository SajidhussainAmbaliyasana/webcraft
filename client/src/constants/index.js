// src/constants/index.js

export const APP_NAME = "Webcraft";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/signup",
  DASHBOARD: "/dashboard",
  WEBSITES: "/dashboard/websites",
  SETTINGS: "/dashboard/settings",
  // Dynamic routes — use string templates at call site:
  // /dashboard/websites/:websiteId/pages
  // /dashboard/websites/:websiteId/pages/:pageId/editor
};

// export const API_BASE_URL =
//   process.env.REACT_APP_API_URL || "http://localhost:5000";

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 72;
export const COLORS_MAP = {
  bgSurface: "#0c1022",
  bgCard: "#0f1428",
  bgCardHover: "#141830",
};

export const SUBSCRIPTION_PLANS = {
    free: {
        name: "Free",
        price: 0,
        websiteLimit: 2,
    },
    pro: {
        name: "Pro",
        price: 29,
        websiteLimit: 10,
    },
    business: {
        name: "Business",
        price: 89,
        websiteLimit: 20,
    },
};