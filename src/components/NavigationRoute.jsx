import React from "react";
import { Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import Overview from "./Overview";
import UploadImage from "./UploadImage";

// #F3F6FA
function NavigationRoute() {
  return (
    <main style={{backgroundColor:"rgb(247, 247, 247)"}}>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/upload-image" element={<UploadImage />} />
        </Routes>
    </main>
  )
}

export default NavigationRoute