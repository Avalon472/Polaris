import { LoaderIcon } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
