import UnsavedChangesModal from "@/features/notes/components/UnsavedChangesModal";
import { createContext, useEffect, useRef } from "react";
import { useBlocker } from "react-router-dom";

export const UnsavedChangesContext = createContext(null);

const getDirty = (map) => [...map.values()].filter((e) => e.isDirty());

export function UnsavedChangesProvider({ children }) {
  const registry = useRef(new Map());

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname &&
      getDirty(registry.current).length > 0,
  );

  // Grab blocker message from component
  const message =
    blocker.state === "blocked"
      ? getDirty(registry.current)
          .map((e) => e.getMessage())
          .join("\n\n")
      : "";

  // Central beforeunload to work alongside the blocker
  useEffect(() => {
    const handler = (e) => {
      if (getDirty(registry.current).length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  return (
    <UnsavedChangesContext.Provider value={registry}>
      {children}
      {blocker.state === "blocked" && (
        <UnsavedChangesModal
          displayText={message}
          onCancel={() => blocker.reset()}
          onConfirm={() => blocker.proceed()}
        />
      )}
    </UnsavedChangesContext.Provider>
  );
}
