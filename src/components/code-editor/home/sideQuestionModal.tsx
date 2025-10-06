"use client";

import { ReactNode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

type ModalButton = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger" | "secondary";
  closeOnClick?: boolean;
};

interface SideModalProps {
  title: string;
  content: ReactNode;
  buttons?: ModalButton[];
  width?: number;
}

export const showSideModal = ({
  title,
  content,
  buttons = [],
  width = 520,
}: SideModalProps) => {
  const container = document.createElement("div");
  document.body.append(container);

  const root = createRoot(container);

  const ModalContent = () => {
    const [visible, setVisible] = useState(false);

    const handleClose = () => {
      setVisible(false); // trigger slide-out
    };

    useEffect(() => {
      // open animation
      setVisible(true);

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };
      window.addEventListener("keydown", onKeyDown);

      return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    // remove portal after animation
    useEffect(() => {
      if (!visible) {
        const timer = setTimeout(() => {
          root.unmount();
          container.remove();
        }, 300); // match animation duration
        return () => clearTimeout(timer);
      }
    }, [visible]);

    return (
      <div
        className={`fixed inset-0 z-[9999] flex justify-end bg-background-dark/50 backdrop-blur-sm text-text transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      >
        <div
          className={`relative h-full border-l border-border bg-background-dark shadow-2xl flex flex-col transform transition-transform duration-300 ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ width }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-border">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={handleClose}
              className="text-text-light hover:text-text transition"
            >
              ✕
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">{content}</div>

          {/* Fixed Bottom Buttons */}
          {buttons.length > 0 && (
            <div className="flex justify-end gap-3 border-t border-border p-4 bg-background-dark sticky bottom-0">
              {buttons.map((btn, idx) => {
                const base =
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer";
                const variants = {
                  primary:
                    "bg-green-600 hover:bg-green-700 text-white border border-green-600",
                  danger:
                    "bg-red-600 hover:bg-red-700 text-white border border-red-600",
                  secondary:
                    "border border-border hover:bg-muted text-text-light",
                };
                const classes = `${base} ${
                  variants[btn.variant || "secondary"]
                }`;

                return (
                  <button
                    key={idx}
                    className={classes}
                    onClick={() => {
                      btn.onClick?.();
                      if (btn.closeOnClick) handleClose();
                    }}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  root.render(<ModalContent />);
};
