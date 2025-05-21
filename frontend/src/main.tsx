//@ts-ignore
import process from "process";
//@ts-ignore
(window as any).process = process;
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
