import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Instagram, X, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";

export default function EventStoryGenerator({ evento, isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [generating, setGenerating] = useState(false);

  // Parse date correctly to avoid timezone issues
  const [year, month, day] = evento.data.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const dayOfMonth = format(eventDate, "dd");
  const monthName = format(eventDate, "MMMM", { locale: ptBR });
  const yearNum = format(eventDate, "yyyy");

  const generateImage = async () => {
    setGenerating(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Story dimensions (9:16)
    canvas.width = 1080;
    canvas.height = 1920;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a0a1f');
    gradient.addColorStop(0.5, '#0d0d1a');
    gradient.addColorStop(1, '#050510');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative circles
    ctx.beginPath();
    ctx.arc(200, 300, 150, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 159, 64, 0.1)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(880, 600, 200, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(247, 37, 133, 0.1)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(300, 1400, 180, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
    ctx.fill();

    // Header badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    roundRect(ctx, 340, 200, 400, 50, 25);
    ctx.fill();
    
    ctx.font = '500 24px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Réveillon 2025/2026', 540, 233);

    // Date box
    const dateGradient = ctx.createLinearGradient(390, 320, 690, 520);
    dateGradient.addColorStop(0, 'rgba(255, 159, 64, 0.3)');
    dateGradient.addColorStop(1, 'rgba(247, 37, 133, 0.3)');
    ctx.fillStyle = dateGradient;
    roundRect(ctx, 390, 320, 300, 200, 20);
    ctx.fill();

    ctx.font = 'bold 120px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(dayOfMonth, 540, 440);

    ctx.font = '600 36px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(monthName.toUpperCase(), 540, 490);

    // Event name
    ctx.font = 'bold 64px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    
    const words = evento.nome.split(' ');
    let lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 900 && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine);

    let yPos = 680;
    lines.forEach(line => {
      ctx.fillText(line, 540, yPos);
      yPos += 80;
    });

    // Location
    ctx.font = '600 42px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 159, 64, 1)';
    ctx.fillText(`📍 ${evento.localidade}`, 540, yPos + 60);

    ctx.font = '400 36px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(evento.local, 540, yPos + 120);

    // Details if exists
    if (evento.detalhes) {
      ctx.font = '400 32px system-ui, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      
      const detailWords = evento.detalhes.split(' ');
      let detailLines = [];
      let detailLine = '';
      
      detailWords.forEach(word => {
        const testLine = detailLine + (detailLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 800 && detailLine) {
          detailLines.push(detailLine);
          detailLine = word;
        } else {
          detailLine = testLine;
        }
      });
      detailLines.push(detailLine);

      let detailY = yPos + 200;
      detailLines.slice(0, 3).forEach(line => {
        ctx.fillText(line, 540, detailY);
        detailY += 45;
      });
    }

    // Tags
    if (evento.tags?.length > 0) {
      ctx.font = '500 28px system-ui, sans-serif';
      let tagX = 540 - (evento.tags.slice(0, 3).join('  •  ').length * 7);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
      ctx.textAlign = 'center';
      ctx.fillText(evento.tags.slice(0, 3).join('  •  '), 540, 1500);
    }

    // Footer
    ctx.font = '600 36px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.textAlign = 'center';
    ctx.fillText('TOCA EXPERIENCE', 540, 1750);

    // Bottom gradient line
    const lineGradient = ctx.createLinearGradient(200, 1800, 880, 1800);
    lineGradient.addColorStop(0, '#FF9F40');
    lineGradient.addColorStop(1, '#F72585');
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(200, 1800);
    ctx.lineTo(880, 1800);
    ctx.stroke();

    setGenerating(false);
  };

  const downloadImage = async () => {
    await generateImage();
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${evento.nome.replace(/\s+/g, '-')}-story.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shareToInstagram = async () => {
    await generateImage();
    const canvas = canvasRef.current;
    
    try {
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        const file = new File([blob], `${evento.nome.replace(/\s+/g, '-')}-story.png`, { type: 'image/png' });
        
        // Check if Web Share API is available
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: evento.nome,
              text: `${evento.nome} - ${dayOfMonth} de ${monthName} de ${yearNum} 🎉`
            });
          } catch (error) {
            if (error.name !== 'AbortError') {
              // Fallback: download image
              downloadImage();
            }
          }
        } else {
          // Fallback: download and open Instagram
          downloadImage();
          setTimeout(() => {
            window.open('https://www.instagram.com/', '_blank');
          }, 500);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Share error:', error);
      // Final fallback: just download
      downloadImage();
    }
  };

  // Helper function for rounded rectangles
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  React.useEffect(() => {
    if (isOpen) {
      generateImage();
    }
  }, [isOpen, evento]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#0A0A0F] rounded-2xl p-4 max-w-sm w-full border border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Compartilhar nos Stories</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Canvas Preview */}
          <div className="relative aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden mb-4">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
            />
            {generating && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={downloadImage}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Imagem
            </Button>
            <Button
              onClick={shareToInstagram}
              variant="outline"
              className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white hover:opacity-90"
            >
              <Instagram className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-gray-500 text-xs text-center mt-3">
            Baixe a imagem e poste nos seus Stories!
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}