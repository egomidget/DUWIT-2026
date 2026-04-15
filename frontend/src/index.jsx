import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import App from "./App";
import StudySpaceDetail from "./pages/StudySpaceDetail";
import AddStudySpace from "./pages/AddStudySpace";
import Search from "./pages/Search";
import SpinnerPage from "./pages/SpinnerPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/space/:id",
    element: <StudySpaceDetail />
  },
  {
    path: "/space/add",
    element: <AddStudySpace />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/spinner",
    element: <SpinnerPage />
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
