// components/FieldLabel.tsx
import type { LucideIcon } from "lucide-react";

interface FieldLabelProps {
  icon?: LucideIcon;
  label: string;
  id: string;
  vertical?: boolean;
  width?: number;
  children: React.ReactNode;
}

const FieldLabel = ({
  icon: Icon,
  label,
  id,
  vertical = false,
  width = 50,
  children,
}: FieldLabelProps) => {
  return (
    <div
      className={`flex gap-0.5 ${vertical ? "flex-col" : "flex-row items-center"}`}
      style={{ width: `${width}%` }}
    >
      <div
        id={id}
        className="flex items-center gap-1 text-sm uppercase text-subtle shrink-0 ml-2"
      >
        {Icon && <Icon size={12} />}
        {label}
      </div>
      <div aria-labelledby={id}>{children}</div>
    </div>
  );
};

export default FieldLabel;
