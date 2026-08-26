import React, { useState } from 'react';
import { ViewMode, DRContactData } from '../types';
import { exportElementAsPng } from '../utils/exportImage';
import { downloadVCard } from '../utils/vcard';
import {
  QrCode,
  CreditCard,
  Columns,
  Download,
  Share2,
  Github,
  Check,
  Maximize2,
  Sparkles,
  ExternalLink,
  Settings,
  HelpCircle,
  FileImage,
  RefreshCw
} from 'lucide-react';

interface ControlToolbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  showRealQr: boolean;
  setShowRealQr: (show: boolean) => void;
  contact: DRContactData;
  setContact: React.Dispatch<React.SetStateAction<DRContactData>>;
  onOpenVercelGuide: () => void;
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
}

export const ControlToolbar: React.FC<ControlToolbarProps> = ({
  viewMode,
  setViewMode,
  showRealQr,
  setShowRealQr,
  contact,
  setContact,
  onOpenVercelGuide,
  isFullscreen,
  setIsFullscreen,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showQrConfig, setShowQrConfig] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(contact.websiteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadImage = async () => {
    setIsExporting(true);
    const targetId = viewMode === 'card' ? 'screen-card' : 'screen-qr';
    const filename = viewMode === 'card' ? 'DR_SA_Tarjeta_Digital_1080x1920' : 'DR_SA_Pantalla_QR_1080x1920';
    await exportElementAsPng(targetId, filename);
    setIsExporting(false);
  };

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-3 text-slate-100 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand Header & Tag */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0a1d88] border border-[#e5720b] flex items-center justify-center shadow-md p-1">
              <span className="font-montserrat font-black text-white text-[11px] tracking-tighter">DR</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-montserrat font-extrabold text-sm text-white tracking-wide">
                  D.R SA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#e5720b]/20 border border-[#e5720b]/40 text-[#fcd412] text-[10px] font-bold">
                  OFICIAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Credenciales Digitales 9:16 (1080×1920 px)
              </p>
            </div>
          </div>

          {/* Mobile Fullscreen trigger */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            title="Modo Presentación Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* SCREEN SELECTOR SWITCHER */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 shadow-inner w-full md:w-auto justify-center">
          <button
            onClick={() => setViewMode('qr')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'qr'
                ? 'bg-[#0a1d88] text-white shadow-md border border-[#e5720b]/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-[#fcd412]" />
            <span>DISEÑO 1: Pantalla QR</span>
          </button>

          <button
            onClick={() => setViewMode('card')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'card'
                ? 'bg-[#0a1d88] text-white shadow-md border border-[#e5720b]/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-[#e5720b]" />
            <span>DISEÑO 2: Tarjeta Digital</span>
          </button>

          <button
            onClick={() => setViewMode('both')}
            className={`hidden lg:flex px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all items-center justify-center gap-1.5 ${
              viewMode === 'both'
                ? 'bg-[#0a1d88] text-white shadow-md border border-[#e5720b]/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5 text-slate-300" />
            <span>Ver Ambos</span>
          </button>
        </div>

        {/* ACTION UTILITIES */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          {/* QR Mode Toggle button */}
          <button
            onClick={() => setShowQrConfig(!showQrConfig)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 shrink-0 ${
              showQrConfig
                ? 'bg-[#e5720b] text-white border-[#e5720b]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
            }`}
            title="Configurar Código QR Real o Espacio Libre"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Ajustes QR</span>
          </button>

          {/* Download PNG Image Button */}
          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 active:scale-95 disabled:opacity-50"
            title="Exportar imagen en alta resolución 1080x1920"
          >
            <FileImage className="w-3.5 h-3.5 text-[#fcd412]" />
            <span>{isExporting ? 'Generando...' : 'Descargar HD PNG'}</span>
          </button>

          {/* Download vCard Button */}
          <button
            onClick={() => downloadVCard(contact)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 active:scale-95"
            title="Guardar contacto Dario Lucarelli en teléfono"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>.VCF Contacto</span>
          </button>

          {/* GitHub / Vercel Deploy Guide */}
          <button
            onClick={onOpenVercelGuide}
            className="px-3 py-1.5 bg-[#0a1d88] hover:bg-[#152bb5] text-white border border-[#e5720b]/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <Github className="w-3.5 h-3.5 text-[#fcd412]" />
            <span className="hidden sm:inline">Subir a</span> Vercel
          </button>
        </div>
      </div>

      {/* Slide-down QR Configurator Bar */}
      {showQrConfig && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 items-center bg-slate-950/60 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">Modo de Pantalla 1:</span>
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={() => setShowRealQr(false)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                  !showRealQr ? 'bg-[#e5720b] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Espacio Libre
              </button>
              <button
                onClick={() => setShowRealQr(true)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                  showRealQr ? 'bg-[#e5720b] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                QR Real Generado
              </button>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 shrink-0">URL destino del QR:</span>
            <input
              type="url"
              value={contact.qrTargetUrl}
              onChange={(e) => setContact({ ...contact, qrTargetUrl: e.target.value })}
              placeholder="https://drsa-tarjeta.vercel.app"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#e5720b]"
            />
            {!showRealQr && (
              <span className="text-[10px] text-amber-400/90 font-medium shrink-0">
                (Activa "QR Real" para visualizar)
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
