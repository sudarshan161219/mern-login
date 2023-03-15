import React from "react";
import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import {Username, Password, Register, Reset, Profile, Recovery, PageNotFound} from "./components/export"

const App = () => {
  // Root Routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Username />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/password",
      element: <Password />,
    },

    {
      path: "/profile",
      element: <Profile />,
    },

    {
      path: "/recovery",
      element: <Recovery />,
    },

    {
      path: "/reset",
      element: <Reset />,
    },

    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
