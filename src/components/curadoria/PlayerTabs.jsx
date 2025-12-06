import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Headphones } from "lucide-react";
import LazyEmbed from "@/components/embeds/LazyEmbed";

const TABS = [
  { 
    id: "spotify", 
    label: "Spotify", 
    icon: Music2,
    src: "https://open.spotify.com/embed/artist/2r4S2RPdfnx7UPL73jJWlQ?utm_source=generator&theme=0",
    title: "Tony Monteiro no Spotify",
    subtitle: "Mais de 500 mil streams"
  },
  { 
    id: "soundcloud", 
    label: "SoundCloud", 
    icon: Headphones,
    src: "https://soundcloud.com/tonyismusic",
    title: "Toca Experience no SoundCloud",
    subtitle: "Sets completos e exclusivos"
  }
];

export default function PlayerTabs() {
  const [activeTab, setActiveTab] = useState("spotify");

  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Music2 className="w-6 h-6 text-[#FFD700]" />
        <span className="bg-gradient-to-r from-[#FFD700] to-[#40E0D0] bg-clip-text text-transparent">
          Ouça Agora
        </span>
      </h2>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#FFD700] to-[#40E0D0] text-black"
                : "bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700 hover:border-[#FFD700]/50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <LazyEmbed
              type={currentTab.id}
              src={currentTab.src}
              title={currentTab.title}
              height={currentTab.id === "spotify" ? 352 : 300}
            />
            <div className="p-4 border-t border-gray-800">
              <h3 className="font-bold text-white">{currentTab.title}</h3>
              <p className="text-gray-500 text-sm">{currentTab.subtitle}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}