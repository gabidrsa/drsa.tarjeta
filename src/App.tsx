import React, { useState } from 'react';
import { DEFAULT_CONTACT_DATA, DRContactData } from './types';
import { ScreenDigitalCard } from './components/ScreenDigitalCard';

export default function App() {
  const [contact] = useState<DRContactData>(DEFAULT_CONTACT_DATA);

  return (
    <div className="w-full min-h-[100dvh] bg-[#040c42] text-white flex items-center justify-center p-2 sm:p-4 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-x-hidden selection:bg-[#e5720b] selection:text-white">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0a1d88] opacity-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#e5720b] opacity-20 rounded-full blur-3xl pointer-events-none" />

      {/* 9:16 Story Container (1080x1920 Proportional Frame) */}
      <main className="w-full max-w-[430px] aspect-[9/16] max-h-[96dvh] bg-[#0a1d88] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/15 relative overflow-hidden flex flex-col shrink-0">
        <ScreenDigitalCard contact={contact} />
      </main>
    </div>
  );
}

