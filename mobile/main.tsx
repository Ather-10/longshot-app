import { Component, StrictMode, type ComponentType, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles.css";

declare global {
  interface Window {
    __showErr?: (msg: string) => void;
  }
}

function report(msg: string) {
  if (window.__showErr) window.__showErr(msg);
  else document.body.textContent = msg;
}

class Boundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) {
    return { err };
  }
  componentDidCatch(err: Error) {
    report("REACT ERROR: " + (err.stack || err.message));
  }
  render() {
    return this.state.err ? null : this.props.children;
  }
}

async function start() {
  try {
    const mod = await import("../src/routes/index");
    const opts = (mod.Route as unknown as { options: { component?: ComponentType } }).options;
    const Home = opts.component;
    if (!Home) {
      throw new Error("Route.options.component missing. keys: " + Object.keys(opts).join(", "));
    }
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <Boundary>
          <Home />
        </Boundary>
      </StrictMode>,
    );
  } catch (e) {
    const err = e as Error;
    report("START ERROR: " + (err.stack || err.message || String(e)));
  }
}

start();
