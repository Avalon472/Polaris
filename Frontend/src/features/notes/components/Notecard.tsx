import { PinIcon } from "lucide-react";

interface NotecardProps {
  isFavorite?: boolean;
}

const Notecard = ({ isFavorite = false }: NotecardProps) => {
  return (
    <div className="bg-bg2 border border-border rounded-2xl px-4 py-3 flex flex-col gap-1 text-text min-h-0 overflow-hidden h-42">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-success">FRAMEWORK</span>
        {isFavorite && <PinIcon className="w-3.5 h-3.5 text-subtle" />}
      </div>

      <div className="flex flex-col gap-1 flex-1 min-h-0">
        <h2 className="font-semibold text-base leading-tight">React</h2>
        <p className="text-sm text-muted leading-relaxed line-clamp-3 overflow-hidden">
          React is a Javascript framework for declarative, composeable UI that
          is capable of dynamic state changes
        </p>
      </div>

      <p className="border-t border-border pt-2 mt-auto text-xs text-subtle shrink-0">
        Edited X days ago
      </p>
    </div>
  );
};

export default Notecard;
