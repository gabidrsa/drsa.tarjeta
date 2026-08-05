import React, { useState } from 'react';
import { DRContactData } from '../types';
import { LogoDR } from './LogoDR';
import { downloadVCard } from '../utils/vcard';
import {
  MessageCircle,
  Instagram,
  Globe,
  UserPlus,
  CheckCircle2,
  Share2,
  ExternalLink,
  MapPin
} from 'lucide-react';

interface ScreenDigitalCardProps {
  contact: DRContactData;
  elementId?: string;
}

export const ScreenDigitalCard: React.FC<ScreenDigitalCardProps> = ({
  contact,
  elementId = 'screen-card',
}) => {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveContact = () => {
    downloadVCard(contact);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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

      {/* Very subtle diagonal textile weave graphic overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="weaving-pattern" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="30" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="30" y2="0" stroke="#fcd412" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#weaving-pattern)" />
      </svg>

      {/* TOP HEADER: Centered D.R SA Logo & Dario Lucarelli */}
      <div className="w-full flex flex-col items-center text-center pt-2 z-10 shrink-0">
        <div className="flex items-center justify-center mb-3">
          <LogoDR variant="icon" size="xl" />
        </div>

        {/* Company Title - Enlarged */}
        <h1 className="font-montserrat font-black text-3xl sm:text-4xl tracking-tight text-white drop-shadow-lg leading-none">
          {contact.company}
        </h1>

        {/* Orange Accent Line */}
        <div className="h-1.5 w-16 bg-[#e5720b] rounded-full my-2.5 shadow-md" />

        {/* Dario Lucarelli Name & Role - Enlarged */}
        <h2 className="font-montserrat font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
          {contact.name}
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide mt-1">
          {contact.role}
        </p>
      </div>

      {/* CENTERED ACTION & CONTACT BUTTONS SECTION (Wider & Larger) */}
      <div className="w-full my-auto flex flex-col items-center space-y-3 z-10 shrink-0 max-w-[320px] sm:max-w-[340px] px-1">
        {/* Primary Action Button: "Guardar contacto" */}
        <button
          onClick={handleSaveContact}
          className={`w-full py-3.5 sm:py-4 px-6 rounded-full font-montserrat font-extrabold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 active:scale-95 ${
            savedSuccess
              ? 'bg-emerald-600 text-white shadow-emerald-600/40'
              : 'bg-[#e5720b] hover:bg-[#c96005] text-white shadow-[#e5720b]/50 ring-2 ring-[#e5720b]/30'
          }`}
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
              <span>¡Contacto Guardado!</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5 text-white shrink-0" />
              <span>Guardar contacto</span>
            </>
          )}
        </button>

        {/* Secondary Interactive Button: "WhatsApp" */}
        <a
          href={`https://wa.me/${contact.whatsappRaw}?text=Hola%20Dario,%20te%20contacto%20a%20trav%C3%A9s%20de%20tu%20tarjeta%20digital%20de%20D.R%20SA`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-5 rounded-full border-2 border-white/80 hover:border-white bg-white/10 hover:bg-white/20 text-white font-montserrat font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-between active:scale-95 shadow-lg group backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5 text-[#fcd412] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-extrabold text-sm">WhatsApp</span>
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate ml-2">
            {contact.whatsappDisplay}
          </span>
        </a>

        {/* Secondary Interactive Button: "Instagram" */}
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-5 rounded-full border-2 border-white/80 hover:border-white bg-white/10 hover:bg-white/20 text-white font-montserrat font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-between active:scale-95 shadow-lg group backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5">
            <Instagram className="w-5 h-5 text-[#fcd412] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-extrabold text-sm">Instagram</span>
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate ml-2">
            {contact.instagramDisplay}
          </span>
        </a>

        {/* Secondary Interactive Button: "Sitio web" */}
        <a
          href={contact.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-5 rounded-full border-2 border-white/80 hover:border-white bg-white/10 hover:bg-white/20 text-white font-montserrat font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-between active:scale-95 shadow-lg group backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#fcd412] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-extrabold text-sm">Sitio web</span>
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate ml-2">
            {contact.websiteDisplay}
          </span>
        </a>
      </div>

      {/* FOOTER SECTION: Textile Categories & Location */}
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
