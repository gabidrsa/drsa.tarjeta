import React from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';

interface PhoneContainerProps {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  isStandalonePhoneView?: boolean;
}

export const PhoneContainer: React.FC<PhoneContainerProps> = ({
  children,
  title,
  subTitle,
  isStandalonePhoneView = false,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Title label for showcase preview mode */}
      {!isStandalonePhoneView && (
        <div className="mb-3 text-center">
          <h3 className="font-montserrat font-bold text-base text-slate-200 tracking-wide flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5720b]" />
            {title}
          </h3>
          {subTitle && (
            <p className="text-xs text-slate-400 mt-0.5">{subTitle}</p>
          )}
        </div>
      )}

      {/* Modern Smartphone Mockup Frame (375 × 850 px aspect ratio 9:16 optimized) */}
      <div className={`relative bg-slate-900 rounded-[44px] p-3 sm:p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-slate-800 ring-1 ring-white/10 overflow-hidden transition-all duration-300 ${
        isStandalonePhoneView ? 'w-full max-w-[400px] h-[850px]' : 'w-[360px] sm:w-[375px] h-[780px] sm:h-[820px]'
      }`}>
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0a1d88]/80 ring-1 ring-slate-800" />
        </div>

        {/* Smartphone Status Bar Simulation */}
        <div className="absolute top-4 left-0 right-0 px-8 flex justify-between items-center text-[10px] font-semibold text-white/80 z-20 pointer-events-none">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3 text-white/90" />
            <Wifi className="w-3 h-3 text-white/90" />
            <Battery className="w-3.5 h-3.5 text-white/90" />
          </div>
        </div>

        {/* Screen Content Window */}
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-[#0a1d88]">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-30 pointer-events-none" />
      </div>
    </div>
  );
};
