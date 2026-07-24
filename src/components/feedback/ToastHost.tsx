"use client";

import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

/**
 * Client-only host for react-toastify. The container (and the toastify runtime)
 * is code-split via next/dynamic so its JS is not shipped in the shared server
 * layout bundle on every route — it loads on the client after hydration, well
 * before any toast is triggered (contact form feedback). Keeps toasts working
 * everywhere while removing toastify from the critical path of static pages.
 */
const ToastContainer = dynamic(
  () => import("react-toastify").then((m) => m.ToastContainer),
  { ssr: false },
);

export function ToastHost() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

export default ToastHost;
