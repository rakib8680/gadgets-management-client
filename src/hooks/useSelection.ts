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
  getId: (item: TItem) => string,
  options?: {
    isSelectable?: (item: TItem) => boolean;
  }
): SelectionApi {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const isSelectable = options?.isSelectable ?? (() => true);

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
    const selectableItems = items.filter(isSelectable);
    if (selectableItems.length === 0) return false;
    const selectableIds = new Set(selectableItems.map(getId));
    const selectedSelectableCount = selectedIds.filter((id) =>
      selectableIds.has(id)
    ).length;
    return selectedSelectableCount === selectableItems.length;
  }, [items, selectedIds, getId, isSelectable]);

  const someSelected = useMemo(() => {
    const selectableIds = new Set(
      items.filter(isSelectable).map((item) => getId(item))
    );
    const selectedSelectableCount = selectedIds.filter((id) =>
      selectableIds.has(id)
    ).length;
    return selectedSelectableCount > 0 && !allSelected;
  }, [items, selectedIds, getId, isSelectable, allSelected]);

  const toggleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const selectable = items.filter(isSelectable).map(getId);
        setSelectedIds(selectable);
      } else {
        setSelectedIds([]);
      }
    },
    [items, getId, isSelectable]
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
