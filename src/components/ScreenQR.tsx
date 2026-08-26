import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { DRContactData } from '../types';
import { LogoDR } from './LogoDR';
import { Smartphone, Sparkles, MapPin } from 'lucide-react';

interface ScreenQRProps {
  contact: DRContactData;
  elementId?: string;
}

export const ScreenQR: React.FC<ScreenQRProps> = ({ contact, elementId = 'screen-qr' }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate QR code encoding target URL for the contact's digital card (e.g., domain + '/dario' or '/mariano')
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://www.drsa.com.ar';
    const targetUrl = `${origin}${contact.cardPath}`;

    QRCode.toDataURL(targetUrl, {
      width: 700,
      margin: 2,
      color: {
        dark: '#0a1d88',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR generation error:', err));
  }, [contact.cardPath]);

  return (
    <div
      id={elementId}
      className="relative w-full h-full bg-[#0a1d88] text-white flex flex-col justify-between items-center p-5 sm:p-6 select-none overflow-hidden bg-textile-pattern font-['Plus_Jakarta_Sans',sans-serif]"
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Background Decorative Ambient Flares & Subtle Textile Weave Lines */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#152bb5] opacity-35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-16 w-72 h-72 bg-[#e5720b] opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-[#061158] opacity-60 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle diagonal textile weave graphic overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="qr-weaving-pattern" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="30" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="30" y2="0" stroke="#fcd412" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#qr-weaving-pattern)" />
      </svg>

      {/* TOP HEADER: Centered D.R SA Logo & Dario Lucarelli Info */}
      <div className="w-full flex flex-col items-center text-center pt-2 z-10 shrink-0">
        <div className="flex items-center justify-center mb-2.5">
          <LogoDR variant="icon" size="xl" />
        </div>

        {/* Company Title */}
        <h1 className="font-montserrat font-black text-3xl sm:text-4xl tracking-tight text-white drop-shadow-lg leading-none">
          {contact.company}
        </h1>

        {/* Orange Accent Line */}
        <div className="h-1.5 w-16 bg-[#e5720b] rounded-full my-2.5 shadow-md" />

        {/* Dario Lucarelli Name & Role */}
        <h2 className="font-montserrat font-bold text-lg sm:text-xl text-white tracking-tight mt-1">
          {contact.name}
        </h2>
        <p className="text-[11px] font-medium text-slate-300">
          {contact.role}
        </p>
      </div>

      {/* CENTRAL SECTION: QR CODE FRAME WITH CTA BELOW */}
      <div className="w-full my-auto py-2 flex flex-col items-center justify-center z-10 shrink-0">
        {/* High-Impact QR Frame */}
        <div className="relative w-[75%] max-w-[270px] aspect-square flex items-center justify-center p-3.5 rounded-2xl bg-white shadow-2xl border-2 border-white/30">
          
          {/* Executive Corner Target Marks */}
          <div className="absolute -top-2.5 -left-2.5 w-7 h-7 border-t-4 border-l-4 border-[#e5720b] rounded-tl-lg pointer-events-none" />
          <div className="absolute -top-2.5 -right-2.5 w-7 h-7 border-t-4 border-r-4 border-[#e5720b] rounded-tr-lg pointer-events-none" />
          <div className="absolute -bottom-2.5 -left-2.5 w-7 h-7 border-b-4 border-l-4 border-[#fcd412] rounded-bl-lg pointer-events-none" />
          <div className="absolute -bottom-2.5 -right-2.5 w-7 h-7 border-b-4 border-r-4 border-[#fcd412] rounded-br-lg pointer-events-none" />

          {/* QR Image */}
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Código QR D.R SA"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
              <Sparkles className="w-8 h-8 animate-spin text-[#0a1d88]" />
            </div>
          )}
        </div>

        {/* Main CTA Pill Banner: "Escanear para conocer más" (Static, placed below QR) */}
        <div className="bg-gradient-to-r from-[#e5720b] via-[#f78825] to-[#e5720b] text-white py-2 px-5 rounded-full shadow-lg border border-white/20 flex items-center justify-center gap-2 mt-4">
          <Smartphone className="w-4 h-4 text-[#fcd412] shrink-0" />
          <span className="font-montserrat font-black text-xs sm:text-sm tracking-wide uppercase drop-shadow-sm">
            Escanear para conocer más
          </span>
        </div>

        <p className="text-[11px] font-semibold text-slate-300 tracking-wide mt-2 text-center">
          Escaneá con la cámara de tu celular
        </p>
      </div>

      {/* FOOTER SECTION: Textile Categories & Exact Address */}
      <div className="w-full text-center pt-3 pb-1 z-10 shrink-0 border-t border-white/15 mt-1">
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
          Telas para <span className="text-[#fcd412]">TAPICERÍA</span> · <span className="text-[#fcd412]">DECORACIÓN</span> · <span className="text-[#fcd412]">MARROQUINERÍA</span> · <span className="text-[#fcd412]">NÁUTICA</span>
        </p>
        <p className="text-[10px] sm:text-[11px] font-medium text-slate-300 flex items-center justify-center gap-1.5 mt-1">
          <MapPin className="w-3.5 h-3.5 text-[#e5720b] shrink-0" />
          <span>{contact.location}</span>
        </p>
      </div>
    </div>
  );
};

