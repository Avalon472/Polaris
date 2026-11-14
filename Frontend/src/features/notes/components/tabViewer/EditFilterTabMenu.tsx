import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NoteType, type NoteFilter } from "@/types/notes";
import { useEffect, useState } from "react";
import TagEditor from "../editor/TagsEditor";

interface EditFilterTabMenuProps {
  handleChange: (filterOptions: NoteFilter) => void;
  existingFilter: NoteFilter;
}

const Spacer = () => {
  return <div className="h-0.5 border-t border-border" />;
};

const EditFilterTabMenu = ({
  handleChange,
  existingFilter,
}: EditFilterTabMenuProps) => {
  const [editedFilter, setEditedFilter] = useState(existingFilter);

  useEffect(() => {
    handleChange(editedFilter);
  }, [editedFilter]);

  const checkboxStyle =
    "appearance-none size-4 bg-surface rounded-xs border border-border checked:bg-accent cursor-pointer hover:border-white/60 transition-all duration-200 shrink-0 disabled:pointer-events-none disabled:bg-accent/60";
  return (
    <div className="flex flex-col w-full p-2 gap-2 justify-center">
      <Accordion type="multiple" defaultValue={["tags", "type"]}>
        <AccordionItem value={"tags"}>
          <AccordionTrigger className="hover:no-underline">
            Tags
          </AccordionTrigger>
          <AccordionContent key={editedFilter.tags.length}>
            <TagEditor
              selectedTags={editedFilter.tags ?? []}
              onSelect={(tags) => {
                setEditedFilter((prev) => ({
                  ...prev,
                  tags: tags,
                }));
              }}
              editing={true}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"type"}>
          <AccordionTrigger className="hover:no-underline">
            Type
          </AccordionTrigger>
          <AccordionContent className="pb-0 h-fit">
            {Object.values(NoteType).map((type) => (
              <div className="flex gap-4 p-1 items-center" key={type}>
                <input
                  type="checkbox"
                  id={`${type}Checkbox`}
                  className={checkboxStyle}
                  checked={editedFilter.types.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEditedFilter((prev) => ({
                        ...prev,
                        types: [...prev.types, type],
                      }));
                    } else {
                      setEditedFilter((prev) => ({
                        ...prev,
                        types: editedFilter.types.filter((x) => x !== type),
                      }));
                    }
                  }}
                />
                <label
                  htmlFor={`${type}Checkbox`}
                  className="text-text text-sm cursor-pointer w-full"
                >
                  {type[0].toUpperCase() + type.slice(1)}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Spacer />

      <div className="flex gap-4 p-1 items-center">
        <input
          type="checkbox"
          id="pinnedCheckbox"
          className={`${checkboxStyle} `}
          checked={editedFilter.pinned}
          onChange={(e) => {
            setEditedFilter((prev) => ({
              ...prev,
              pinned: e.target.checked,
            }));
          }}
          disabled={!editedFilter.unpinned}
        />
        <label
          htmlFor="pinnedCheckbox"
          className={`text-sm  ${!editedFilter.unpinned ? "pointer-events-none text-subtle" : "text-text cursor-pointer"}`}
        >
          Pinned
        </label>
      </div>

      <div className="flex gap-4 p-1 items-center">
        <input
          type="checkbox"
          id="unpinnedCheckbox"
          className={checkboxStyle}
          checked={editedFilter.unpinned}
          onChange={(e) => {
            setEditedFilter((prev) => ({
              ...prev,
              unpinned: e.target.checked,
            }));
          }}
          disabled={!editedFilter.pinned}
        />
        <label
          htmlFor="unpinnedCheckbox"
          className={`text-sm  ${!editedFilter.pinned ? "pointer-events-none text-subtle" : "text-text cursor-pointer"}`}
        >
          Unpinned
        </label>
      </div>

      <Spacer />

      <div className="flex gap-4 p-1 items-center">
        <input
          type="checkbox"
          id="newestFirstCheckbox"
          className={checkboxStyle}
          checked={editedFilter.newestFirst}
          onChange={(e) => {
            setEditedFilter((prev) => ({
              ...prev,
              newestFirst: e.target.checked,
            }));
          }}
        />
        <label
          htmlFor="newestFirstCheckbox"
          className="text-text text-sm cursor-pointer"
        >
          Newest First
        </label>
      </div>
    </div>
  );
};

// pinned?: boolean;
// updatedWithinDays?: number;
// tags?: string[];
// type?: string;
// newestFirst: boolean;

export default EditFilterTabMenu;
