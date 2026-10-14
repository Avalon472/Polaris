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

const EditFilterTabMenu = ({
  handleChange,
  existingFilter,
}: EditFilterTabMenuProps) => {
  const [editedFilter, setEditedFilter] = useState(existingFilter);

  useEffect(() => {
    handleChange(editedFilter);
  }, [editedFilter]);

  const checkboxStyle =
    "appearance-none size-4 bg-surface rounded-xs border border-border checked:bg-accent cursor-pointer hover:border-white/60 transition-all duration-200";
  return (
    <div className="flex flex-col w-full p-1 pb-0 gap-2 justify-center">
      <p className="border-b border-surface text-center w-full">
        Filter Options
      </p>
      <Accordion type="multiple" defaultValue={["tags", "type"]}>
        <AccordionItem value={"tags"}>
          <AccordionTrigger className="hover:no-underline">
            Tags
          </AccordionTrigger>
          <AccordionContent>
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
          <AccordionContent className="pb-0">
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
      <div className="flex gap-4 p-1 border-t border-border items-center pt-2">
        <input
          type="checkbox"
          id="pinnedCheckbox"
          className={checkboxStyle}
          checked={editedFilter.pinned}
          onChange={(e) => {
            setEditedFilter((prev) => ({
              ...prev,
              pinned: e.target.checked,
            }));
          }}
        />
        <label
          htmlFor="pinnedCheckbox"
          className="text-text text-sm cursor-pointer"
        >
          Pinned
        </label>
      </div>

      <div className="flex gap-4 p-1 border-t border-border items-center pt-2">
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
