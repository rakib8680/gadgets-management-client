import { useCallback, useEffect, useMemo, useState } from "react";

type SelectionApi = {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  allSelected: boolean;
  someSelected: boolean;
  toggleSelectAll: (checked: boolean) => void;
  toggleRow: (id: string, checked: boolean) => void;
  resetSelection: () => void;
};

export function useSelection<TItem>(
  items: TItem[],
  getId: (item: TItem) => string
): SelectionApi {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // When the item list changes, prune any selected ids that are no longer present
  useEffect(() => {
    const currentIds = new Set(items.map(getId));
    setSelectedIds((prev) => {
      const filtered = prev.filter((id) => currentIds.has(id));
      // Avoid unnecessary state updates to prevent render loops
      if (
        filtered.length === prev.length &&
        filtered.every((id, index) => id === prev[index])
      ) {
        return prev;
      }
      return filtered;
    });
  }, [items, getId]);

  const allSelected = useMemo(() => {
    if (items.length === 0) return false;
    if (selectedIds.length !== items.length) return false;
    const currentIds = new Set(items.map(getId));
    return selectedIds.every((id) => currentIds.has(id));
  }, [items, selectedIds, getId]);

  const someSelected = useMemo(() => {
    return selectedIds.length > 0 && !allSelected;
  }, [selectedIds.length, allSelected]);

  const toggleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedIds(items.map(getId));
      } else {
        setSelectedIds([]);
      }
    },
    [items, getId]
  );

  const toggleRow = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      if (checked) {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      }
      return prev.filter((x) => x !== id);
    });
  }, []);

  const resetSelection = useCallback(() => setSelectedIds([]), []);

  return {
    selectedIds,
    setSelectedIds,
    allSelected,
    someSelected,
    toggleSelectAll,
    toggleRow,
    resetSelection,
  };
}
