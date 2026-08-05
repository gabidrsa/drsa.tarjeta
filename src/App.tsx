import React, { useState } from 'react';
import { DEFAULT_CONTACT_DATA, DRContactData } from './types';
import { ScreenDigitalCard } from './components/ScreenDigitalCard';

export default function App() {
  const [contact] = useState<DRContactData>(DEFAULT_CONTACT_DATA);

  return (
    <div className="w-full min-h-[100dvh] h-[100dvh] bg-[#0a1d88] text-white flex flex-col items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden selection:bg-[#e5720b] selection:text-white">
      {/* Main Full-Mobile Digital Card View */}
      <main className="w-full max-w-md h-full flex flex-col justify-between items-center relative overflow-hidden">
        <ScreenDigitalCard contact={contact} />
      </main>
    </div>
  );
}

