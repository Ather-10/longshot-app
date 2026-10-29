import { StrictMode, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles.css";
import { Route } from "../src/routes/index";

// Reuse the existing game page as-is, without TanStack Start / server.
const Home = Route.options.component as ComponentType;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
