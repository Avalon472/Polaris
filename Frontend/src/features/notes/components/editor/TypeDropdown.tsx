import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { NoteType } from "@/types/notes";

interface TypeDropdownProps {
  selectedType: NoteType;
  onSelect: (type: NoteType | null) => void;
  editing: boolean;
}

const TypeDropdown = ({
  selectedType,
  onSelect,
  editing = false,
}: TypeDropdownProps) => {
  const noteTypes = Object.values(NoteType);
  // TODO: Add onValueChange by passing in state prop,
  // get different colors for the different types
  return (
    <Combobox
      items={noteTypes}
      disabled={!editing}
      autoHighlight
      value={selectedType}
      onValueChange={onSelect}
    >
      <ComboboxInput
        showTrigger={editing}
        placeholder="Select a framework"
        className={`text-text w-full  ${editing ? "bg-bg3 border border-border outline-none" : "pointer-events-none border border-transparent bg-surface"} `}
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default TypeDropdown;
