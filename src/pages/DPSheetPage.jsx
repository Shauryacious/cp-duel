// src/pages/DPSheetPage.jsx

import React, { useCallback } from "react";
import dpSections from "@/data/dpSections";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import SheetPageLayout from "@/layout/SheetPageLayout";

function DPSheetPage() {
  const [checked, setChecked] = useLocalStorageState("dpChecklistState", {});
  const [favorites, setFavorites] = useLocalStorageState("dpFavorites", {});

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
      title="DP Sheet"
      tagline="Isko Laga Dala To DP Jhingalala!"
      sections={dpSections}
      checked={checked}
      favorites={favorites}
      onCheck={handleCheck}
      onFavorite={handleFavorite}
    />
  );
}

export default DPSheetPage;
