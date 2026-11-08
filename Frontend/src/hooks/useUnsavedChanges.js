import { useContext, useEffect, useId, useRef } from "react";
import { UnsavedChangesContext } from "../contexts/UnsavedChangesContext";

export function useUnsavedChanges(check, message) {
  const registry = useContext(UnsavedChangesContext);
  if (!registry)
    throw new Error(
      "useUnsavedChanges must be used within UnsavedChangesProvider",
    );

  const id = useId();
  const checkRef = useRef(check);
  const messageRef = useRef(message);

  // Keep refs current, utilize a useEffect to avoid doing it on render
  useEffect(() => {
    checkRef.current = check;
    messageRef.current = message;
  });

  // Register blocker info on component load, unregister on unmount
  useEffect(() => {
    registry.current.set(id, {
      isDirty: () => checkRef.current(),
      getMessage: () => messageRef.current,
    });
    return () => {
      registry.current.delete(id);
    };
  }, [registry, id]);
}
