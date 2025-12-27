// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import CPPage from "./pages/CPPage";
import DPSheetPage from "./pages/DPSheetPage";
import GraphSheetPage from "./pages/GraphSheetPage";
import TreeSheetPage from "./pages/TreeSheetPage";
import RangeQuerySheetPage from "./pages/RangeQuerySheetPage";
import BinarySearchSheetPage from "./pages/BinarySearchSheetPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cp" element={<CPPage />} />
        <Route path="/sheets/dp" element={<DPSheetPage />} />
        <Route path="/sheets/graph" element={<GraphSheetPage />} />
        <Route path="/sheets/tree" element={<TreeSheetPage />} />
        <Route path="/sheets/range-query" element={<RangeQuerySheetPage />} />
        <Route path="/sheets/binary-search" element={<BinarySearchSheetPage />} />
        {/* Add additional routes here as new sheets/pages are developed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
