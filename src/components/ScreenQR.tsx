import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { DRContactData } from '../types';
import { LogoDR } from './LogoDR';
import { QrCode, Smartphone, Sparkles } from 'lucide-react';

interface ScreenQRProps {
  contact: DRContactData;
  showRealQr: boolean;
  elementId?: string;
}

export const ScreenQR: React.FC<ScreenQRProps> = ({ contact, showRealQr, elementId = 'screen-qr' }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (showRealQr && contact.qrTargetUrl) {
      QRCode.toDataURL(contact.qrTargetUrl, {
        width: 600,
        margin: 2,
        color: {
          dark: '#0a1d88',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [showRealQr, contact.qrTargetUrl]);

  return (
    <div
      id={elementId}
      className="relative w-full h-full bg-[#0a1d88] text-white flex flex-col justify-between items-center p-6 sm:p-8 select-none overflow-hidden bg-textile-pattern font-['Plus_Jakarta_Sans',sans-serif]"
      style={{
        // Strict 9:16 aspect ratio framing layout
        minHeight: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle Background Glow Decorative Elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#e5720b] opacity-15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#fcd412] opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#152bb5] opacity-20 rounded-full blur-3xl pointer-events-none" />

      {/* TOP SECTION: Header Branding & Title */}
      <div className="w-full flex flex-col items-center text-center pt-2 sm:pt-4 z-10 shrink-0">
        {/* D.R SA Official Header */}
        <div className="flex items-center gap-2 mb-2">
          <LogoDR variant="icon" size="md" />
          <h1 className="font-montserrat font-black text-2xl sm:text-3xl tracking-tight text-white drop-shadow-sm">
            D.R SA
          </h1>
        </div>

        {/* Featured Title: "D.R SA QR" */}
        <div className="mt-1 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5720b]/20 border border-[#e5720b]/40 text-[#fcd412] text-xs font-bold tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#e5720b]" />
            DISTRIBUCIÓN DE TELAS & TEXTILES
          </span>
          <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-[#ffffff] tracking-wider uppercase drop-shadow-md">
            D.R SA QR
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#e5720b] via-[#fcd412] to-[#e5720b] rounded-full mt-1.5" />
        </div>
      </div>

      {/* CENTRAL SECTION: HUGE QR ZONE (Occupies ~55%–65% of screen height) */}
      <div className="w-full my-auto py-2 flex flex-col items-center justify-center z-10">
        <div className="relative w-[82%] max-w-[320px] aspect-square flex items-center justify-center p-3 rounded-2xl bg-white/95 shadow-2xl backdrop-blur-md border-2 border-white/20 animate-pulse-subtle">
          
          {/* Executive Corner Target Marks */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-[#e5720b] rounded-tl-lg pointer-events-none" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-[#e5720b] rounded-tr-lg pointer-events-none" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-[#fcd412] rounded-bl-lg pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-[#fcd412] rounded-br-lg pointer-events-none" />

          {/* QR Content Container */}
          <div className="w-full h-full rounded-xl bg-white flex flex-col items-center justify-center p-2 relative overflow-hidden border border-slate-100">
            {showRealQr && qrDataUrl ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <img
                  src={qrDataUrl}
                  alt="Código QR D.R SA"
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute bottom-2 bg-[#0a1d88] text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider border border-[#e5720b]/50 flex items-center gap-1 shadow-md">
                  <Smartphone className="w-3 h-3 text-[#fcd412]" />
                  D.R SA OFICIAL
                </div>
              </div>
            ) : (
              /* PURE PLACEHOLDER FRAME (Clean space for future QR placement as explicitly requested) */
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50/50 relative">
                
                {/* Background subtle watermark logo */}
                <div className="opacity-10 pointer-events-none absolute inset-0 flex items-center justify-center">
                  <LogoDR variant="icon" size="xl" />
                </div>

                <div className="w-16 h-16 rounded-full bg-[#0a1d88]/10 text-[#0a1d88] flex items-center justify-center mb-3">
                  <QrCode className="w-9 h-9 stroke-[1.75]" />
                </div>

                <p className="text-[#0a1d88] font-bold text-sm tracking-wide uppercase">
                  ESPACIO LIBRE PARA
                </p>
                <p className="text-[#e5720b] font-extrabold text-base tracking-wider uppercase mt-0.5">
                  CÓDIGO QR REAL
                </p>

                <p className="text-[11px] text-slate-500 font-medium leading-snug mt-2 max-w-[200px]">
                  Área 55–65% limpia y despejada para insertar el QR final
                </p>

                {/* Subtle alignment guide markers */}
                <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                  <span>1080 × 1920 px</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Call to Action & Tagline */}
      <div className="w-full flex flex-col items-center text-center pb-2 z-10 shrink-0">
        {/* Main CTA: “ESCANEÁ PARA CONOCERNOS” */}
        <div className="w-full max-w-xs bg-gradient-to-r from-[#e5720b] via-[#f78825] to-[#e5720b] text-white py-3 px-6 rounded-2xl shadow-lg shadow-[#e5720b]/25 border border-white/20 flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-[1.02]">
          <Smartphone className="w-5 h-5 text-[#fcd412] animate-bounce" />
          <span className="font-montserrat font-black text-sm sm:text-base tracking-wider uppercase drop-shadow-sm">
            ESCANEÁ PARA CONOCERNOS
          </span>
        </div>

        {/* Corporate Details */}
        <div className="mt-3 flex flex-col items-center">
          <p className="text-white/90 font-semibold text-xs sm:text-sm tracking-wide">
            Distribución de Telas & Textiles
          </p>
          <p className="text-[10px] text-[#fcd412] font-semibold tracking-wider uppercase mt-0.5">
            {contact.location}
          </p>
        </div>
      </div>
    </div>
  );
};
