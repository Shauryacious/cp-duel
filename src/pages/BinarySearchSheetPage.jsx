// src/pages/BinarySearchSheetPage.jsx

import React, { useCallback } from "react";
import binarySearchSections from "@/data/binarySearchSections";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import SheetPageLayout from "@/layout/SheetPageLayout";

function BinarySearchSheetPage() {
  const [checked, setChecked] = useLocalStorageState("binarySearchChecklistState", {});
  const [favorites, setFavorites] = useLocalStorageState("binarySearchFavorites", {});

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
      title="Binary Search Sheet"
      tagline="Search Smart, Not Hard - Master Binary Search!"
      sections={binarySearchSections}
      checked={checked}
      favorites={favorites}
      onCheck={handleCheck}
      onFavorite={handleFavorite}
    />
  );
}

export default BinarySearchSheetPage;

