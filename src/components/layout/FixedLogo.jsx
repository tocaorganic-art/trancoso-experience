import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function FixedLogo() {
  return (
    <Link 
      to={createPageUrl("Home")}
      className="fixed top-14 left-3 z-40 hover:opacity-80 transition-opacity max-w-[80px] md:max-w-[100px]"
    >
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/e442a09d3_LOGO_HORIZ_COLOR_POSIT.png" 
        alt="Toca Experience" 
        className="w-full h-auto object-contain"
      />
    </Link>
  );
}