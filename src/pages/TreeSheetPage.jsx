// src/pages/TreeSheetPage.jsx

import React, { useCallback } from "react";
import treeSections from "@/data/treeSections";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import SheetPageLayout from "@/layout/SheetPageLayout";

function TreeSheetPage() {
  const [checked, setChecked] = useLocalStorageState("treeChecklistState", {});
  const [favorites, setFavorites] = useLocalStorageState("treeFavorites", {});

  const handleCheck = useCallback(
    (sectionIdx, problemIdx) => {
      const key = `${sectionIdx}-${problemIdx}`;
      setChecked((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    [setChecked]
  );

  const handleFavorite = useCallback(
    (sectionIdx, problemIdx, url) => {
      const key = `${sectionIdx}-${problemIdx}`;
      setFavorites((prev) => {
        if (prev[key]) {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        }
        return {
          ...prev,
          [key]: { sectionIdx, problemIdx, url },
        };
      });
    },
    [setFavorites]
  );

  return (
    <SheetPageLayout
      title="Tree Sheet"
      tagline="Branch Out Your Skills with Tree Mastery!"
      sections={treeSections}
      checked={checked}
      favorites={favorites}
      onCheck={handleCheck}
      onFavorite={handleFavorite}
    />
  );
}

export default TreeSheetPage;
