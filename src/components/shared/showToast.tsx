"use client";

import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

type ToastOptions = {
  message: string;
  duration?: number; // milliseconds
  type?: "success" | "error" | "info" | "warning";
};

export const showToast = ({
  message,
  duration = 3000,
  type = "info",
}: ToastOptions) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  const Toast = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      // start slide-in
      setVisible(true);

      // auto close
      const timer = setTimeout(() => setVisible(false), duration);

      // remove from DOM after animation
      const removeTimer = setTimeout(() => {
        root.unmount();
        container.remove();
      }, duration + 300); // match animation duration

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }, []);

    const colors = {
      success: "bg-green-600 text-white",
      error: "bg-red-600 text-white",
      info: "bg-blue-600 text-white",
      warning: "bg-yellow-500 text-black",
    };

    return (
      <div
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div
          className={`px-5 py-3 rounded-md shadow-lg max-w-lg text-center ${colors[type]}`}
        >
          {message}
        </div>
      </div>
    );
  };

  root.render(<Toast />);
};
