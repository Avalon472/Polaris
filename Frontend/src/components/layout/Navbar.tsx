import {
  FileText,
  LayoutDashboard,
  PanelLeftCloseIcon,
  PanelRightCloseIcon,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/" },
    { label: "Notes / Wiki", icon: <FileText />, path: "/notes" },
    // { label: "Projects", icon: <FolderKanban size={16} />, path: "/projects" },
    // { label: "Calendar", icon: <Calendar size={16} />, path: "/calendar" },
    // { label: "AI Assistant", icon: <Bot size={16} />, path: "/ai" },
  ];
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div
      className={`flex flex-col shrink-0 bg-bg2 h-screen border-r-2 border-border items-center ${collapsed ? "w-16" : "w-56"}`}
    >
      {/* Top of navbar */}
      <div className="flex flex-col items-center justify-center text-text p-3 border-b-2 gap-1">
        {collapsed ? (
          <PanelRightCloseIcon
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        ) : (
          <>
            <div className="flex justify-between w-full">
              <h1 className="text-left w-full">Project Name</h1>
              <PanelLeftCloseIcon
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              />
            </div>
            <InputGroup className="bg-bg2">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </>
        )}
      </div>
      {/* Body of navbar */}
      <div
        className={`flex flex-col w-full text-text ${collapsed ? "p-1" : "p-3"}`}
      >
        <div className="flex flex-col items-start gap-2">
          {collapsed ? null : <p className="color-muted">Workspace</p>}
          {navItems.map((item) => (
            <NavbarItem
              key={item.path}
              label={item.label}
              icon={item.icon}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              isCollapsed={collapsed}
            />
          ))}
        </div>
        {/* Add other section here when ready */}
      </div>
    </div>
  );
};

export default Navbar;
