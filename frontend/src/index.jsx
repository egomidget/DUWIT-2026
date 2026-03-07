import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import App from "./App";
import StudySpaceDetail from "./pages/StudySpaceDetail";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/space/:id",
    element: <StudySpaceDetail />
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
