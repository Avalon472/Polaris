"use client";

import * as React from "react";

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
import { LoaderIcon } from "lucide-react";
import { useGetTags } from "../../api/NotesQueries";
interface TagEditorProps {
  selectedTags: string[];
  onSelect: (tags: string[]) => void;
}

const TagEditor = ({ selectedTags, onSelect }: TagEditorProps) => {
  const anchor = useComboboxAnchor();
  const { data: tags, isLoading, refetch } = useGetTags();

  //TODO: Add keyboard intercept for enter to add in a new tag
  return (
    <Combobox
      multiple
      autoHighlight
      items={tags}
      value={selectedTags}
      onValueChange={onSelect}
      onOpenChange={(open) => {
        if (open) refetch;
      }}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoaderIcon className="animate-spin" />
            </div>
          ) : (
            (item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default TagEditor;
