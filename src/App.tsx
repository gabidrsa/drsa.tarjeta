import React, { useState } from 'react';
import { ViewMode, DEFAULT_CONTACT_DATA, DRContactData } from './types';
import { ControlToolbar } from './components/ControlToolbar';
import { PhoneContainer } from './components/PhoneContainer';
import { ScreenQR } from './components/ScreenQR';
import { ScreenDigitalCard } from './components/ScreenDigitalCard';
import { VercelGuideModal } from './components/VercelGuideModal';
import {
  QrCode,
  CreditCard,
  Smartphone,
  Minimize2,
  Sparkles,
  Download,
  Github,
  CheckCircle,
  ExternalLink,
  MapPin,
  Layers
} from 'lucide-react';

export default function App() {
  const [contact, setContact] = useState<DRContactData>(DEFAULT_CONTACT_DATA);
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [showRealQr, setShowRealQr] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isVercelGuideOpen, setIsVercelGuideOpen] = useState<boolean>(false);

  // If in pure mobile presentation mode (fullscreen on phone)
  if (isFullscreen) {
    return (
      <main className="fixed inset-0 z-50 bg-[#0a1d88] w-full h-full flex flex-col items-center justify-center overflow-hidden select-none">
        {/* Floating exit presentation mode button */}
        <button
          onClick={() => setIsFullscreen(false)}
          className="fixed top-3 right-3 z-50 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition-all shadow-xl"
          title="Salir del modo presentación"
        >
          <Minimize2 className="w-5 h-5" />
        </button>

        {/* 1080x1920 or full screen container */}
        <div className="w-full h-full max-w-[480px] aspect-[9/16] relative shadow-2xl overflow-hidden">
          {viewMode === 'qr' ? (
            <ScreenQR contact={contact} showRealQr={showRealQr} />
          ) : (
            <ScreenDigitalCard contact={contact} />
          )}
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#e5720b] selection:text-white">
      {/* Top Application Toolbar */}
      <ControlToolbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        showRealQr={showRealQr}
        setShowRealQr={setShowRealQr}
        contact={contact}
        setContact={setContact}
        onOpenVercelGuide={() => setIsVercelGuideOpen(true)}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />

      {/* Main Presentation Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col items-center justify-start">
        
        {/* Top Executive Context Banner */}
        <div className="w-full max-w-4xl bg-gradient-to-r from-slate-900 via-[#0a1d88]/40 to-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl mb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#e5720b] text-white flex items-center justify-center font-bold shadow-lg shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="font-montserrat font-extrabold text-white text-base">
                  D.R SA — Credenciales Digitales
                </h2>
                <span className="bg-[#fcd412] text-[#0a1d88] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  OFICIAL
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Formatos verticales 9:16 (1080×1920 px / 375×850 px) para presentación en teléfono celular.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsFullscreen(true)}
              className="px-4 py-2 bg-[#e5720b] hover:bg-[#c96005] text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95"
            >
              <Smartphone className="w-4 h-4 text-[#fcd412]" />
              <span>Probar en Celular</span>
            </button>
          </div>
        </div>

        {/* Display Screens Canvas */}
        <div className="w-full flex justify-center items-center py-4">
          {viewMode === 'both' ? (
            /* DUAL SCREEN COMPARISON MODE */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 w-full max-w-5xl justify-items-center">
              <PhoneContainer
                title="DISEÑO 1: Pantalla QR"
                subTitle="Espacio 55-65% despejado para escaneo"
              >
                <ScreenQR contact={contact} showRealQr={showRealQr} />
              </PhoneContainer>

              <PhoneContainer
                title="DISEÑO 2: Tarjeta Digital"
                subTitle="Tarjeta de presentación interactiva"
              >
                <ScreenDigitalCard contact={contact} />
              </PhoneContainer>
            </div>
          ) : viewMode === 'qr' ? (
            /* SINGLE SCREEN 1: PANTALLA QR */
            <PhoneContainer
              title="DISEÑO 1 — PANTALLA QR"
              subTitle="Optimizado para escaneo desde otro teléfono celular"
            >
              <ScreenQR contact={contact} showRealQr={showRealQr} />
            </PhoneContainer>
          ) : (
            /* SINGLE SCREEN 2: TARJETA DIGITAL */
            <PhoneContainer
              title="DISEÑO 2 — TARJETA DIGITAL"
              subTitle="Tarjeta corporativa interactiva para Dario Lucarelli"
            >
              <ScreenDigitalCard contact={contact} />
            </PhoneContainer>
          )}
        </div>

        {/* Bottom Executive Specs Summary */}
        <div className="w-full max-w-4xl mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <span className="font-bold text-[#fcd412] uppercase tracking-wider block mb-1">
              🎨 Paleta Corporativa D.R SA
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded bg-[#0a1d88] border border-white/20" />
                <span className="font-mono text-[10px]">#0a1d88</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded bg-[#e5720b]" />
                <span className="font-mono text-[10px]">#e5720b</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded bg-[#fcd412]" />
                <span className="font-mono text-[10px]">#fcd412</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <span className="font-bold text-[#fcd412] uppercase tracking-wider block mb-1">
              📐 Especificaciones Técnicas
            </span>
            <p className="text-slate-300">
              Relación de aspecto <strong className="text-white">9:16</strong> (1080×1920 px / 375×850 px).
              Ajuste responsivo para cualquier smartphone moderno.
            </p>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <span className="font-bold text-[#fcd412] uppercase tracking-wider block mb-1">
              🚀 Alojamiento en Vercel
            </span>
            <p className="text-slate-300 mb-1">
              Listo para sincronizar con tu repositorio de GitHub y publicar en Vercel.
            </p>
            <button
              onClick={() => setIsVercelGuideOpen(true)}
              className="text-[#e5720b] hover:underline font-bold text-xs flex items-center gap-1 mt-1"
            >
              <span>Ver pasos de publicación</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 D.R SA — Distribuidora de Telas y Textiles. Rosario, Argentina.</p>
          <p className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#e5720b]" />
            <span>Riobamba 3334, Rosario, Santa Fe, Argentina</span>
          </p>
        </div>
      </footer>

      {/* Vercel & GitHub Deployment Guide Modal */}
      <VercelGuideModal
        isOpen={isVercelGuideOpen}
        onClose={() => setIsVercelGuideOpen(false)}
      />
    </div>
  );
}
