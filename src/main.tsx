import React from "react";
import ReactDOM from "react-dom/client";

import theme from "./theme.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root.tsx";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
