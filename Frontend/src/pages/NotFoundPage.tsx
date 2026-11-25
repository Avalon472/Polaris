import { Button } from "@base-ui/react";
import { ArrowBigLeftDash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex size-full justify-center items-center">
      <div className="flex flex-col size-1/2 justify-center items-center gap-8 bg-bg2 border border-bg3 rounded-2xl">
        <img src="../../favicon.svg" className="size-1/3 rounded-xl" />
        <p className="text-2xl">404: Content Not Found</p>
        <Button
          className="buttoncore border border-border hover:border-accent bg-accent hover:bg-surface rounded-xl transition-all duration-200 p-2 cursor-pointer"
          onClick={() => navigate(-1)}
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
