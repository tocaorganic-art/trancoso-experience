import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ProductionGuide from "@/components/production/ProductionGuide";

export default function ProductionSetup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 py-8">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("ProductionChecklist")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Checklist
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4">
              <Rocket className="w-4 h-4" />
              Preparação para Produção
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Deploy em Produção
            </h1>
            <p className="text-green-100 text-lg">
              Guia completo para lançamento seguro do sistema Toca Experience
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <ProductionGuide />
      </div>
    </div>
  );
}