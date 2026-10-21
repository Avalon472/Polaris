"use client";

import * as React from "react";

import LoadingSpinner from "@/components/layout/LoadingSpinner";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { useGetTags } from "../../api/NotesQueries";

interface TagEditorProps {
  selectedTags: string[];
  onSelect: (tags: string[]) => void;
  editing: boolean;
  editable?: boolean;
}

const TagEditor = ({
  selectedTags,
  onSelect,
  editing = false,
  editable = true,
}: TagEditorProps) => {
  const anchor = useComboboxAnchor();
  const { data: tags, isLoading } = useGetTags();
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && inputValue.trim() && editable) {
      const newTag = inputValue.trim().toLowerCase();
      if (!selectedTags.includes(newTag)) {
        onSelect([...selectedTags, newTag]);
      }
      setInputValue("");
      e.preventDefault();
    } else if (e.key == "Enter") {
      setInputValue("");
      e.preventDefault();
    }
  };

  return (
    <Combobox
      multiple
      autoHighlight
      items={tags}
      value={selectedTags}
      onValueChange={onSelect}
      disabled={!editing}
    >
      <ComboboxChips
        ref={anchor}
        className={`w-full  ${editing ? "bg-bg3 border border-border outline-none" : "bg-surface border border-transparent"}`}
      >
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip
                  key={value}
                  showRemove={editing}
                  className={`buttonCore text-accent border-accent bg-transparent relative overflow-visible
              ${editing ? "text-text bg-accent" : ""}`}
                >
                  <span className="w-full truncate">{value}</span>
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={25}
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor} className={"z-999"}>
        {editable && (
          <ComboboxEmpty>
            {inputValue.trim()
              ? `Press Space to add "${inputValue.trim()}"`
              : "No tags found."}
          </ComboboxEmpty>
        )}

        <ComboboxList>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            (item) => (
              <ComboboxItem key={item} value={item}>
                <span className="w-full truncate">{item}</span>
              </ComboboxItem>
            )
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default TagEditor;
