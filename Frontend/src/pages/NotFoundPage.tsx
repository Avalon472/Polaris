import { Button } from "@base-ui/react";
import { ArrowBigLeftDash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex size-full justify-center items-center">
      <div className="flex flex-col size-80 md:size-120 justify-center items-center gap-4 md:gap-8 bg-bg2 border border-bg3 rounded-2xl">
        <img
          src="/favicon.svg"
          className="w-1/2 aspect-square rounded-xl"
          alt="Polaris Logo"
        />
        <p className="text-2xl">404: Content Not Found</p>
        <Button
          className="buttoncore border border-border hover:border-accent bg-accent hover:bg-surface rounded-xl transition-all duration-200 p-2 cursor-pointer"
          onClick={() => {
            // Try to get valid route from local storage, fall back to home page otherwise
            const lastRoute = sessionStorage.getItem("lastValidRoute");

            navigate(lastRoute || "/", { replace: true });
          }}
        >
          <div className="flex gap-4">
            <ArrowBigLeftDash />
            <p>Take me back</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
