import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const EventosDestaqueComponent = React.lazy(() => import("@/components/eventos/EventosDestaque"));

export default function EventosDestaque() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0F]">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Link to={createPageUrl("Home")}>
          <Button variant="ghost" className="text-white/70 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <React.Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A00000]" />
        </div>
      }>
        <EventosDestaqueComponent />
      </React.Suspense>
    </div>
  );
}