import React, { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BarChart3, TrendingUp, Users, Mail, MessageCircle, TestTube, PlayCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

// Lazy load componentes pesados para reduzir bundle inicial
const QuickStats = React.lazy(() => import("@/components/admin/QuickStats"));
const QuickGuide = React.lazy(() => import("@/components/admin/QuickGuide"));
const ExportCSV = React.lazy(() => import("@/components/admin/ExportCSV"));
const LeadsDashboard = React.lazy(() => import("@/components/analytics/LeadsDashboard"));
const ConversionFunnel = React.lazy(() => import("@/components/analytics/ConversionFunnel"));
const RevenueChart = React.lazy(() => import("@/components/analytics/RevenueChart"));
const ABTestManager = React.lazy(() => import("@/components/analytics/ABTestManager"));
const LeadManager = React.lazy(() => import("@/components/admin/LeadManager"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
  </div>
);

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-8 shadow-lg">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Site
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4">
              <BarChart3 className="w-4 h-4" />
              Painel Administrativo
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Dashboard Admin
            </h1>
            <p className="text-purple-100 text-lg">
              Controle total de leads, conversões e automações
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <Suspense fallback={<LoadingFallback />}>
          <QuickStats />
        </Suspense>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 gap-2 bg-white p-2 rounded-lg shadow">
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Leads</span>
              <span className="md:hidden">Leads</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Geral</span>
              <span className="md:hidden">Geral</span>
            </TabsTrigger>
            <TabsTrigger value="funnel" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden md:inline">Funil</span>
              <span className="md:hidden">Funil</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Receita</span>
              <span className="md:hidden">$</span>
            </TabsTrigger>
            <TabsTrigger value="abtests" className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              <span className="hidden md:inline">A/B</span>
              <span className="md:hidden">A/B</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Suspense fallback={<LoadingFallback />}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <LeadManager />
              </motion.div>
            </Suspense>
          </TabsContent>

          <TabsContent value="overview">
            <Suspense fallback={<LoadingFallback />}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <LeadsDashboard />
              </motion.div>
            </Suspense>
          </TabsContent>

          <TabsContent value="funnel">
            <Suspense fallback={<LoadingFallback />}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ConversionFunnel />
              </motion.div>
            </Suspense>
          </TabsContent>

          <TabsContent value="revenue">
            <Suspense fallback={<LoadingFallback />}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <RevenueChart />
              </motion.div>
            </Suspense>
          </TabsContent>

          <TabsContent value="abtests">
            <Suspense fallback={<LoadingFallback />}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ABTestManager />
              </motion.div>
            </Suspense>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <Link to={createPageUrl("PreLaunchChecklist")}>
            <Button className="w-full bg-gradient-to-r from-orange-600 to-red-700 text-white py-6">
              <TestTube className="w-5 h-5 mr-2" />
              Checklist Pré-Lançamento
            </Button>
          </Link>
          <Link to={createPageUrl("GettingStarted")}>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-6">
              <PlayCircle className="w-5 h-5 mr-2" />
              Primeiros Passos
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6">
            <Mail className="w-5 h-5 mr-2" />
            Email Marketing
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Massivo
          </Button>
          <Suspense fallback={<Button className="bg-gray-400 text-white py-6" disabled>Carregando...</Button>}>
            <ExportCSV />
          </Suspense>
        </motion.div>

        {/* Quick Guide */}
        <Suspense fallback={<LoadingFallback />}>
          <QuickGuide />
        </Suspense>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}