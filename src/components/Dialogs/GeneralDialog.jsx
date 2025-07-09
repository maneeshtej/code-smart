const GeneralDialog = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-bg rounded-xl p-6 w-[90%] max-w-md z-60"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};

export default GeneralDialog;
