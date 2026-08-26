import React, { useState, useEffect } from 'react';
import { CONTACTS_MAP, DARIO_CONTACT, DRContactData } from './types';
import { ScreenDigitalCard } from './components/ScreenDigitalCard';
import { ScreenQR } from './components/ScreenQR';
import { CreditCard, QrCode, Download, Check, User, Share2 } from 'lucide-react';
import { exportElementAsPng } from './utils/exportImage';

type PersonId = 'dario' | 'mariano';
type ViewTab = 'card' | 'qr';

export default function App() {
  const [selectedPerson, setSelectedPerson] = useState<PersonId>('dario');
  const [activeTab, setActiveTab] = useState<ViewTab>('card');
  const [showAdminBar, setShowAdminBar] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync state with URL path or hash on initial load
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const rawUrl = (window.location.pathname + window.location.hash + window.location.search).toLowerCase();
      
      // Check if admin bar requested via query parameter
      if (rawUrl.includes('admin=true') || rawUrl.includes('admin=1')) {
        setShowAdminBar(true);
      }

      if (rawUrl.includes('qrmariano')) {
        setSelectedPerson('mariano');
        setActiveTab('qr');
      } else if (rawPathIncludes('qrdario', rawUrl)) {
        setSelectedPerson('dario');
        setActiveTab('qr');
      } else if (rawPathIncludes('mariano', rawUrl)) {
        setSelectedPerson('mariano');
        setActiveTab('card');
      } else {
        setSelectedPerson('dario');
        setActiveTab('card');
      }
    };

    function rawPathIncludes(key: string, url: string) {
      return url.includes(key);
    }

    syncRouteFromUrl();
    window.addEventListener('popstate', syncRouteFromUrl);
    window.addEventListener('hashchange', syncRouteFromUrl);
    return () => {
      window.removeEventListener('popstate', syncRouteFromUrl);
      window.removeEventListener('hashchange', syncRouteFromUrl);
    };
  }, []);

  // Update browser URL when changing person or view tab
  const navigateTo = (person: PersonId, tab: ViewTab) => {
    setSelectedPerson(person);
    setActiveTab(tab);

    const targetRoute = tab === 'qr' ? `/qr${person}` : `/${person}`;
    if (window.location.pathname !== targetRoute) {
      window.history.pushState({}, '', targetRoute);
    }
  };

  const currentContact: DRContactData = CONTACTS_MAP[selectedPerson] || DARIO_CONTACT;

  const handleDownload = async () => {
    setIsExporting(true);
    const targetId = activeTab === 'card' ? 'screen-card' : 'screen-qr';
    const filename = activeTab === 'card' 
      ? `DR_SA_Tarjeta_${currentContact.name.replace(/\s+/g, '_')}` 
      : `DR_SA_Foto_QR_${currentContact.name.replace(/\s+/g, '_')}`;
    
    const success = await exportElementAsPng(targetId, filename);
    setIsExporting(false);

    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    }
  };

  const handleCopyCurrentLink = () => {
    const origin = window.location.origin;
    const targetPath = activeTab === 'qr' ? currentContact.qrPath : currentContact.cardPath;
    const fullUrl = `${origin}${targetPath}`;
    
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#040c42] text-white flex flex-col items-center justify-center p-2 sm:p-4 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-x-hidden selection:bg-[#e5720b] selection:text-white">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0a1d88] opacity-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#e5720b] opacity-20 rounded-full blur-3xl pointer-events-none" />

      {/* Optional Admin Controls Bar (only visible when ?admin=true or toggled) */}
      {showAdminBar && (
        <header className="w-full max-w-[430px] mb-3 z-20 flex flex-col gap-2 px-1 animate-fade-in">
          {/* Row 1: Person Selector (Dario vs Mariano) */}
          <div className="w-full flex items-center justify-between bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-xl">
            <div className="flex items-center gap-1 w-full">
              <button
                onClick={() => navigateTo('dario', activeTab)}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  selectedPerson === 'dario'
                    ? 'bg-[#e5720b] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Dario Lucarelli</span>
              </button>

              <button
                onClick={() => navigateTo('mariano', activeTab)}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  selectedPerson === 'mariano'
                    ? 'bg-[#e5720b] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Mariano Lucarelli</span>
              </button>
            </div>
          </div>

          {/* Row 2: View Mode (Tarjeta vs QR) + Download PNG */}
          <div className="w-full flex items-center justify-between gap-2">
            {/* Card / QR Mode Switcher */}
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-2xl border border-white/15 shadow-xl">
              <button
                onClick={() => navigateTo(selectedPerson, 'card')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === 'card'
                    ? 'bg-[#152bb5] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Tarjeta</span>
              </button>

              <button
                onClick={() => navigateTo(selectedPerson, 'qr')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === 'qr'
                    ? 'bg-[#152bb5] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Foto QR</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Copy Link Button */}
              <button
                onClick={handleCopyCurrentLink}
                className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs transition-all active:scale-95"
                title="Copiar enlace de esta sección"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-[#fcd412]" />}
              </button>

              {/* Download PNG Button */}
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className={`px-3 py-2 rounded-2xl text-xs font-extrabold transition-all duration-200 shadow-xl border flex items-center gap-1.5 active:scale-95 disabled:opacity-50 ${
                  downloadSuccess
                    ? 'bg-emerald-600 border-emerald-400 text-white'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white hover:border-white/40'
                }`}
                title="Descargar esta foto en PNG"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-200" />
                    <span>¡Guardado!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#fcd412]" />
                    <span>{isExporting ? 'Descargando...' : 'Descargar PNG'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* 9:16 Story Container (1080x1920 Proportional Frame) */}
      <main className="w-full max-w-[430px] aspect-[9/16] max-h-[96dvh] bg-[#0a1d88] rounded-2xl sm:rounded-3xl shadow-2xl border border-white/15 relative overflow-hidden flex flex-col shrink-0">
        {activeTab === 'card' ? (
          <ScreenDigitalCard contact={currentContact} />
        ) : (
          <ScreenQR contact={currentContact} />
        )}
      </main>

      {/* Discrete floating admin toggle button (for managing links/downloads) */}
      {!showAdminBar && (
        <button
          onClick={() => setShowAdminBar(true)}
          className="fixed bottom-2 right-2 p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/40 hover:text-white transition-all text-xs z-30"
          title="Opciones de administración"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}



