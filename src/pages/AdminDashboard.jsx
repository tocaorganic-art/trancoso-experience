import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BarChart3, TrendingUp, Users, Mail, MessageCircle, TestTube, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import QuickStats from "@/components/admin/QuickStats";
import QuickGuide from "@/components/admin/QuickGuide";
import ExportCSV from "@/components/admin/ExportCSV";
import LeadsDashboard from "@/components/analytics/LeadsDashboard";
import ConversionFunnel from "@/components/analytics/ConversionFunnel";
import RevenueChart from "@/components/analytics/RevenueChart";
import ABTestManager from "@/components/analytics/ABTestManager";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const isAdmin = localStorage.getItem("toca_admin");
    if (!isAdmin) {
      toast.error("Acesso não autorizado");
      navigate(createPageUrl("AdminLogin"));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("toca_admin");
    toast.success("Logout realizado");
    navigate(createPageUrl("Home"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-8 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <Link to={createPageUrl("Home")}>
              <Button variant="ghost" className="text-white/70 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Site
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
          
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
        <QuickStats />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-white p-2 rounded-lg shadow">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Visão Geral</span>
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
              <span className="md:hidden">Receita</span>
            </TabsTrigger>
            <TabsTrigger value="abtests" className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              <span className="hidden md:inline">Testes A/B</span>
              <span className="md:hidden">A/B</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LeadsDashboard />
            </motion.div>
          </TabsContent>

          <TabsContent value="funnel">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ConversionFunnel />
            </motion.div>
          </TabsContent>

          <TabsContent value="revenue">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <RevenueChart />
            </motion.div>
          </TabsContent>

          <TabsContent value="abtests">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ABTestManager />
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <Button className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6">
            <Mail className="w-5 h-5 mr-2" />
            Enviar Email Marketing
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
            <MessageCircle className="w-5 h-5 mr-2" />
            Enviar WhatsApp Massivo
          </Button>
          <ExportCSV />
        </motion.div>

        {/* Quick Guide */}
        <QuickGuide />
      </div>
    </div>
  );
}