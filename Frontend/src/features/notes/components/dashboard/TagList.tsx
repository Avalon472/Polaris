import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";

interface TagListProps {
  tags: string[];
}

const TagList = ({ tags }: TagListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const children = Array.from(
      container.querySelectorAll("[data-tag]"),
    ) as HTMLElement[];
    const BADGE_WIDTH = 30;

    let usedWidth = 0;
    let visible = 0;

    for (let i = 0; i < children.length; i++) {
      const childWidth = children[i].offsetWidth + 2;
      const isLast = i === tags.length - 1;
      const available = isLast ? containerWidth : containerWidth - BADGE_WIDTH;

      if (usedWidth + childWidth <= available) {
        usedWidth += childWidth;
        visible++;
      } else break;
    }

    setVisibleCount(visible);
  }, [tags]);

  const hiddenCount = tags.length - visibleCount;

  const tagCoreClasses =
    "text-xs border px-1.5 py-0.5 rounded-xl transition-color duration-250 ease-in-out shrink-0 w-fit max-w-30 truncate";

  const tagCellClasses =
    "text-subtle hover:text-accent border-subtle hover:border-accent";
  return (
    <div ref={containerRef} className="flex w-full overflow-hidden gap-1">
      {tags.slice(0, visibleCount).map((tag) => (
        <p
          key={tag}
          data-tag
          className={`${tagCoreClasses} ${tagCellClasses} cursor-default`}
        >
          {tag}
        </p>
      ))}
      {hiddenCount > 0 && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            className={` ${tagCoreClasses} cursor-pointer
                ${isOpen ? "hover:text-subtle text-accent border-accent hover:border-subtle" : tagCellClasses}`}
          >
            +{hiddenCount}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {tags.slice(visibleCount, tags.length).map((tag) => (
              <p
                className={`${tagCoreClasses} ${tagCellClasses} cursor-default`}
              >
                {tag}
              </p>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default TagList;
