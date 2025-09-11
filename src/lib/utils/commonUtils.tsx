interface LoadingScreenFunction {
  isLoading: boolean;
}

export const LoadingScreen = ({ isLoading }: LoadingScreenFunction) => {
  if (!isLoading) return null; // don’t render at all if not loading

  return (
    <div
      className={`fixed h-screen w-screen inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-[9999] ${
        isLoading ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-200`}
    >
      <h1 className="animate-pulse text-white text-2xl">Loading</h1>
    </div>
  );
};
