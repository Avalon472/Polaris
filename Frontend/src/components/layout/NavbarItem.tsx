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
      className={`flex gap-4 w-full rounded-md p-2 ${
        isActive ? "bg-bg3 text-accent" : "text-subtle hover:bg-bg3"
      }`}
      onClick={onClick}
    >
      {icon}
      {isCollapsed ? null : <p>{label}</p>}
    </button>
  );
};

export default NavbarItem;
