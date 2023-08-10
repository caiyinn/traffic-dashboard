import React from "react";
import { Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import Overview from "./Overview";
import UploadImage from "./UploadImage";
import NotFound from "./NotFound";

function NavigationRoute() {
  return (
    <main style={{backgroundColor:"rgb(247, 247, 247)"}}>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/upload-image" element={<UploadImage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </main>
  )
}

export default NavigationRoute