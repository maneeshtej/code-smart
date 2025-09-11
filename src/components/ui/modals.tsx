import { ReactNode } from "react";

interface SideModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  classname?: string;
  children: ReactNode;
}

const SideModal: React.FC<SideModalProps> = ({
  isOpen,
  setOpen,
  classname = "",
  children,
}) => {
  if (!isOpen) return null; // Only render when open

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-40"
        onClick={() => setOpen(false)}
      >
        {/* Stop click propagation to overlay */}
        <div
          className={`bg-background border-border border-1 flex min-h-1/4 min-w-1/4 rounded-md flex-col ${classname}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SideModal;
