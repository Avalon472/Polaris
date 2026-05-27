import {
  LucideMenuSquare,
  PanelLeftCloseIcon,
  PanelsLeftBottomIcon,
  Search,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

const Navbar = () => {
  return (
    <div className="flex flex-col w-12 bg-bg3 h-screen border-r-2 border-border md:w-64 items-center">
      {/* Top of navbar */}
      <div className="flex flex-col items-center justify-center text-text p-3 border-b-2 gap-1">
        <div className="flex justify-between w-full">
          <h1 className="text-left w-full">Project Name</h1>
          <PanelLeftCloseIcon />
        </div>
        <InputGroup className="bg-bg2">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      {/* Body of navbar */}
      <div className="flex flex-col w-full p-3 text-text">
        {/* Workspace section */}
        <div className="flex flex-col items-start gap-4">
          <p className="color-muted">Workspace</p>
          <button className="flex gap-4 w-full hover:outline-2 p-2 rounded-md hover:bg-bg2">
            <PanelsLeftBottomIcon />
            <p>Dashboard</p>
          </button>
          <button className="flex gap-4 w-full hover:outline-2 p-2 rounded-md hover:bg-bg2">
            <LucideMenuSquare />
            <p>Documents</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
