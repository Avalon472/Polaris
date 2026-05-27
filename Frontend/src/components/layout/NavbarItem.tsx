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
      className={`flex gap-4 w-full rounded-md ${
        isActive ? "bg-bg2 text-accent" : "text-muted hover:bg-bg2"
      }`}
      onClick={onClick}
    >
      {icon}
      {isCollapsed ? null : <p>{label}</p>}
    </button>
  );
};

export default NavbarItem;
