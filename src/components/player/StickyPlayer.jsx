import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, X, Music2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700 shadow-2xl"
      >
        {/* Mini Player */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                <Music2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Toca Experience Set</p>
                <p className="text-gray-400 text-xs">Tony Monteiro & Enzo Furtado</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:bg-gray-700"
              >
                {isExpanded ? "Minimizar" : "Expandir"}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Expanded Player with SoundCloud Embed */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-4"
              >
                <div className="bg-gray-800 rounded-lg p-4">
                  <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/tonyismusic&color=%23333333&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
                    className="rounded-lg"
                  />
                  <div className="flex gap-3 mt-4">
                    <a 
                      href="https://open.spotify.com/artist/2r4S2RPdfnx7UPL73jJWlQ" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Spotify
                    </a>
                    <a 
                      href="https://soundcloud.com/tonyismusic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      SoundCloud
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}