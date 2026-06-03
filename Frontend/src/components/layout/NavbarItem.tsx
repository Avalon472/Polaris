interface NavbarItemProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isCollapsed: boolean;
  isActive?: boolean;
}

const NavbarItem = ({
  label,
  icon,
  onClick,
  isCollapsed,
  isActive = false,
}: NavbarItemProps) => {
  return (
    <button
      className={`flex shrink-0 gap-4 w-full rounded-md ${
        isActive ? "bg-bg3 text-accent" : "text-subtle hover:bg-bg3"
      } ${isCollapsed ? "justify-center py-2" : "p-2"}`}
      onClick={onClick}
    >
      {icon}
      {isCollapsed ? null : (
        <p className="whitespace-nowrap overflow-hidden">{label}</p>
      )}
    </button>
  );
};

export default NavbarItem;
