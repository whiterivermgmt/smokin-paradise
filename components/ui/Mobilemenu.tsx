"use client";
import React, { useState } from "react";
import { AlignLeft } from "lucide-react";
import Sidemenu from "./Sidemenu";

const Mobilemenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center gap-2">
      {/* Hamburger button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="hover:text-orange-500 hover:cursor-pointer transition-colors duration-200"
      >
        <AlignLeft className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar */}
      <Sidemenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export default Mobilemenu;
