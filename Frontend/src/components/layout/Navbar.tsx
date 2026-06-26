import { useLogout } from "@/features/auth/api/AuthMutations";
import { useAuthUser } from "@/features/auth/api/AuthQueries";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  PanelLeftCloseIcon,
  PanelRightCloseIcon,
  Search,
} from "lucide-react";
import { useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
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
    {
      label: "Dashboard",
      icon: <LayoutDashboard />,
      path: "/",
      activeFor: ["/"],
    },
    {
      label: "Notes / Wiki",
      icon: <FileText />,
      path: "/notes",
      activeFor: ["/notes", "/notes/:id"],
    },
    // { label: "Projects", icon: <FolderKanban size={16} />, path: "/projects" },
    // { label: "Calendar", icon: <Calendar size={16} />, path: "/calendar" },
    // { label: "AI Assistant", icon: <Bot size={16} />, path: "/ai" },
  ];

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { mutate: logoutUser } = useLogout();

  const { data: authUser } = useAuthUser();

  return (
    <div
      className={`flex flex-col shrink-0 bg-bg2 h-screen border-r-2 border-border items-center transition-all duration-200 ${collapsed ? "w-16" : "w-56"}`}
    >
      {/* Top of navbar */}
      <div className="flex flex-col items-center justify-center text-text p-3 border-b-2 gap-1 w-full">
        <div className="flex justify-center w-full">
          <h1
            className={`text-left overflow-hidden whitespace-nowrap transition-all duration-200 ${collapsed ? "invisible w-0" : "w-full"}`}
          >
            Project Name
          </h1>
          <div className="relative w-6 h-6 shrink-0">
            <PanelLeftCloseIcon
              onClick={() => setCollapsed(!collapsed)}
              className={`absolute transition-opacity duration-300 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            />
            <PanelRightCloseIcon
              onClick={() => setCollapsed(!collapsed)}
              className={`absolute transition-opacity duration-300 ${collapsed ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />
          </div>
        </div>
        <InputGroup className={`bg-bg2 w-full ${collapsed ? "invisible" : ""}`}>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Body of navbar */}
      <div
        className={`flex flex-col size-full text-text ${collapsed ? "p-1" : "p-3"}`}
      >
        <div className="flex flex-col items-start gap-2">
          <p className={`text-muted ${collapsed ? "invisible" : ""}`}>
            Workspace
          </p>
          {navItems.map((item) => (
            <NavbarItem
              key={item.path}
              label={item.label}
              icon={item.icon}
              isActive={item.activeFor.some((pattern) =>
                matchPath(pattern, location.pathname),
              )}
              onClick={() => navigate(item.path)}
              isCollapsed={collapsed}
            />
          ))}
        </div>
        <div className="mt-auto justify-between flex py-2 border-t-2 border-border">
          <LogOut
            className="text-destructive"
            onClick={() => {
              logoutUser();
            }}
          />
          <div className="text-subtle">{authUser!.username}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
