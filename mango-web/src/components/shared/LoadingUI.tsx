import { PulseLoader } from "react-spinners";

interface LoadingUIProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingUI = ({
  message = "Se încarcă...",
  fullScreen = true,
}: LoadingUIProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 p-6 ${
        fullScreen ? "min-h-screen w-full" : "h-full w-full py-12"
      }`}
    >
      <PulseLoader color="#7CA35A" size={12} speedMultiplier={0.8} />
      
      {message && (
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingUI;