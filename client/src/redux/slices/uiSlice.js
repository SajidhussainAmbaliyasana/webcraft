import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },

  sidebarCollapsed: false,
  sidebarMobileOpen: false,
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || "info",
      };
    },

    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },

    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },

    setSidebarMobileOpen: (state, action) => {
      state.sidebarMobileOpen = action.payload;
    },
  },
});

export const {
  showSnackbar,
  hideSnackbar,
  toggleSidebar,
  setSidebarCollapsed,
  setSidebarMobileOpen,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors

export const selectSnackbar = (state) => state.ui.snackbar;

export const selectSidebarCollapsed = (state) =>
  state.ui.sidebarCollapsed;

export const selectSidebarMobileOpen = (state) =>
  state.ui.sidebarMobileOpen;