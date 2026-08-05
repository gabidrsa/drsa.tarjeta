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
      className="relative w-full h-full bg-[#0a1d88] text-white flex flex-col justify-between items-center p-6 sm:p-7 select-none overflow-hidden bg-textile-pattern font-['Plus_Jakarta_Sans',sans-serif]"
      style={{
        minHeight: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Decorative Ambient Flares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#152bb5] opacity-25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#e5720b] opacity-15 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER: Centered D.R SA Logo */}
      <div className="w-full flex flex-col items-center text-center pt-2 z-10 shrink-0">
        <div className="flex items-center justify-center mb-3">
          <LogoDR variant="icon" size="md" />
        </div>

        {/* Company Title */}
        <h1 className="font-montserrat font-black text-3xl sm:text-4xl tracking-tight text-white drop-shadow-md">
          {contact.company}
        </h1>

        {/* Orange Accent Line */}
        <div className="h-1.5 w-14 bg-[#e5720b] rounded-full my-2.5 shadow-sm" />

        {/* Dario Lucarelli Name & Role */}
        <h2 className="font-montserrat font-bold text-2xl sm:text-3xl text-white tracking-tight">
          {contact.name}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide mt-0.5">
          {contact.role}
        </p>
      </div>

      {/* MIDDLE SECTION: CONTACT DATA DETAILS */}
      <div className="w-full my-auto py-2 flex flex-col items-center justify-center text-center space-y-3 z-10 max-w-xs">
        {/* WhatsApp Block */}
        <a
          href={`https://wa.me/${contact.whatsappRaw}?text=Hola%20Dario,%20te%20contacto%20a%20trav%C3%A9s%20de%20tu%20tarjeta%20digital%20de%20D.R%20SA`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center p-1.5 rounded-xl hover:bg-white/5 transition-colors w-full"
        >
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
            WhatsApp
          </span>
          <span className="font-montserrat font-bold text-lg sm:text-xl text-white group-hover:text-[#fcd412] transition-colors tracking-tight mt-0.5">
            {contact.whatsappDisplay}
          </span>
        </a>

        {/* Instagram Block */}
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center p-1.5 rounded-xl hover:bg-white/5 transition-colors w-full"
        >
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
            Instagram
          </span>
          <span className="font-montserrat font-bold text-lg sm:text-xl text-white group-hover:text-[#fcd412] transition-colors tracking-tight mt-0.5">
            {contact.instagramDisplay}
          </span>
        </a>

        {/* Website Block */}
        <a
          href={contact.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center p-1.5 rounded-xl hover:bg-white/5 transition-colors w-full"
        >
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
            Sitio web
          </span>
          <span className="font-montserrat font-bold text-lg sm:text-xl text-white group-hover:text-[#fcd412] transition-colors tracking-tight mt-0.5">
            {contact.websiteDisplay}
          </span>
        </a>
      </div>

      {/* ACTION BUTTONS SECTION (Matching reference photo layout) */}
      <div className="w-full flex flex-col items-center space-y-2.5 z-10 shrink-0 max-w-xs">
        {/* Primary Action Button: "Guardar contacto" */}
        <button
          onClick={handleSaveContact}
          className={`w-full py-3.5 px-6 rounded-full font-montserrat font-extrabold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
            savedSuccess
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-[#e5720b] hover:bg-[#c96005] text-white shadow-[#e5720b]/30 active:scale-95'
          }`}
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-200" />
              <span>¡Contacto Guardado!</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5 text-white" />
              <span>Guardar contacto</span>
            </>
          )}
        </button>

        {/* Secondary Pill Button: "WhatsApp" */}
        <a
          href={`https://wa.me/${contact.whatsappRaw}?text=Hola%20Dario,%20te%20contacto%20a%20trav%C3%A9s%20de%20tu%20tarjeta%20digital%20de%20D.R%20SA`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-6 rounded-full border-2 border-white/80 hover:border-white bg-white/5 hover:bg-white/10 text-white font-montserrat font-bold text-sm sm:text-base tracking-wide text-center transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
        >
          <MessageCircle className="w-4 h-4 text-[#fcd412]" />
          <span>WhatsApp</span>
        </a>

        {/* Secondary Pill Button: "Instagram" */}
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-6 rounded-full border-2 border-white/80 hover:border-white bg-white/5 hover:bg-white/10 text-white font-montserrat font-bold text-sm sm:text-base tracking-wide text-center transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
        >
          <Instagram className="w-4 h-4 text-[#fcd412]" />
          <span>Instagram</span>
        </a>

        {/* Secondary Pill Button: "Sitio web" */}
        <a
          href={contact.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-6 rounded-full border-2 border-white/80 hover:border-white bg-white/5 hover:bg-white/10 text-white font-montserrat font-bold text-sm sm:text-base tracking-wide text-center transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
        >
          <Globe className="w-4 h-4 text-[#fcd412]" />
          <span>Sitio web</span>
        </a>
      </div>

      {/* FOOTER SECTION: Textile Categories & Location */}
      <div className="w-full text-center pt-3 pb-1 z-10 shrink-0 border-t border-white/10 mt-2">
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
          Telas para <span className="text-[#fcd412]">TAPICERÍA</span> · <span className="text-[#fcd412]">DECORACIÓN</span> · <span className="text-[#fcd412]">MARROQUINERÍA</span> · <span className="text-[#fcd412]">NÁUTICA</span>
        </p>
        <p className="text-[10px] font-medium text-slate-400 flex items-center justify-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 text-[#e5720b]" />
          {contact.location}
        </p>
      </div>
    </div>
  );
};
