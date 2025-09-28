import { ReactNode, useEffect } from "react";
import { createRoot } from "react-dom/client";

type ConfirmActionProps = {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  content?: ReactNode;
};

export async function confirmAction({
  title,
  message = "Are you sure?",
  confirmText = "Proceed",
  cancelText = "Cancel",
  content,
}: ConfirmActionProps): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = createRoot(container);

    const handleClose = (result: boolean) => {
      resolve(result);
      setTimeout(() => {
        root.unmount();
        container.remove();
      }, 0);
    };

    const Modal = () => {
      useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape") handleClose(false);
          if (e.key === "Enter") handleClose(true);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
      }, []);

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background-dark border-1 border-borderc rounded-2xl shadow-lg p-6 max-w-md w-full text-text">
            <h1 className="text-lg font-bold mb-2">{title}</h1>
            {content ?? <p className="mb-4">{message}</p>}
            <div className="flex justify-center gap-4">
              <button
                className="border-1 border-borderc p-2 hover:bg-background px-4 py-2 rounded-md 
              transition-colors duration-200 ease-in-out cursor-pointer"
                onClick={() => handleClose(false)}
              >
                {cancelText}
              </button>
              <button
                className="border-1 border-borderc p-2 px-4 py-2 rounded-md 
              transition-colors duration-200 ease-in-out hover:bg-[rgba(0,200,0,1)] cursor-pointer"
                onClick={() => handleClose(true)}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      );
    };

    root.render(<Modal />);
  });
}
