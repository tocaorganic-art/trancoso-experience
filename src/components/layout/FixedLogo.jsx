import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function FixedLogo() {
  return (
    <Link 
      to={createPageUrl("Home")}
      className="fixed top-4 left-4 z-[1000] hover:opacity-80 transition-opacity"
    >
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/8c9bc9739_logo_da_toca_experience_com_cone_branco2.jpg" 
        alt="Toca Experience" 
        className="h-10 md:h-12 rounded-lg shadow-lg"
      />
    </Link>
  );
}