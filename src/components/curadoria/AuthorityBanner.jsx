import React from "react";
import { motion } from "framer-motion";
import { Music, Disc3, Headphones, TrendingUp } from "lucide-react";

const STATS = [
  { icon: TrendingUp, value: "500K+", label: "Streams" },
  { icon: Disc3, value: "50+", label: "Sets Exclusivos" },
  { icon: Headphones, value: "Semanal", label: "Curadoria" },
  { icon: Music, value: "Global", label: "Alcance" }
];

export default function AuthorityBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
    >
      {STATS.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + idx * 0.1 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-[#FFD700]/20 rounded-xl p-4 md:p-6 text-center hover:border-[#FFD700]/50 transition-all group"
        >
          <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#FFD700] group-hover:scale-110 transition-transform" />
          <p className="text-xl md:text-2xl font-bold text-[#FFD700]">{stat.value}</p>
          <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}