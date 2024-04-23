import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Form from "./Form.jsx";

import "./index.css";

console.log("main.jsx");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "attributes",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <h1>POC local storage EventListener</h1>
    <RouterProvider router={router} />
  </React.StrictMode>
);
