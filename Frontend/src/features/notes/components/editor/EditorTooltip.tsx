import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";

interface TooltipItemProps {
  syntax: string;
  name: string;
  description?: string;
}

const TooltipItem = ({ syntax, name, description = "" }: TooltipItemProps) => (
  <div
    className="flex flex-col text-sm text-subtle gap-1 bg-bg3 p-1 rounded-sm border 
  border-border hover:border-border-hover transition-colors duration-300"
  >
    <div>
      <p className="text-md font-bold">{name}</p>
      {description && <p className="text-sm italic">{description}</p>}
    </div>

    <code className="bg-code-bg text-code px-1">{syntax}</code>
  </div>
);

const EditorTooltip = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          onMouseDown={(e) => e.preventDefault()}
          className="py-1 text-xs mr-4"
        >
          <InfoIcon
            size={24}
            className="text-subtle hover:text-text transition-colors"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-82 bg-bg2-solid border border-border p-4 -mt-8 mr-8 "
        side="bottom"
        align="end"
      >
        <div className="border-b border-border w-full text-lg">
          Syntax Guide
        </div>
        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-scroll scrollbar-thin bg-bg3 rounded-lg p-2">
          <div className="text-md italic">Standard Syntax</div>

          <TooltipItem syntax="**text**" name="Bold" />
          <TooltipItem syntax="_text_" name="Italic" />
          <TooltipItem syntax="`code`" name="Inline code" />
          <TooltipItem syntax="```" name="Code block" />
          <TooltipItem
            syntax="# Heading"
            name="Heading"
            description="H1 - H3 with #, ##, ###"
          />
          <TooltipItem syntax="- item" name="Bullet list" />
          <TooltipItem syntax="1. item" name="Numbered list" />
          <TooltipItem syntax="> text" name="Blockquote" />
          <TooltipItem syntax="---" name="Divider" />

          <div className="text-md italic">Custom Syntax</div>

          <TooltipItem
            syntax="[text](url)"
            name="External link"
            description="Press Space to convert"
          />
          <TooltipItem
            syntax="[[note-slug]]"
            name="Wikilink"
            description="Use note slug to link internally"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditorTooltip;
