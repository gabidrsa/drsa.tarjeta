import React from 'react';
import { X, Github, Globe, CheckCircle2, Copy, ExternalLink, ArrowRight } from 'lucide-react';

interface VercelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelGuideModal: React.FC<VercelGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const copyCode = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5720b] to-[#0a1d88] flex items-center justify-center text-white font-bold shadow-md">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-lg text-white">
                Guía de Publicación en GitHub & Vercel
              </h3>
              <p className="text-xs text-slate-400">
                Instrucciones paso a paso para alojar tu Tarjeta Digital D.R SA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-5 text-sm">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#fcd412] text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#e5720b] text-white flex items-center justify-center text-[10px]">1</span>
                Descargar / Exportar el código
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              En la barra superior de esta aplicación, selecciona el menú de exportación o clona la carpeta de código fuente.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#fcd412] text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#e5720b] text-white flex items-center justify-center text-[10px]">2</span>
                Crear repositorio en GitHub
              </span>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#e5720b] hover:underline flex items-center gap-1 font-semibold"
              >
                github.com/new <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-300 text-xs mb-2">
              Ejecuta los siguientes comandos en tu terminal para vincular el repositorio local con GitHub:
            </p>
            <div className="relative bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800 overflow-x-auto">
              <code>
                git init<br />
                git add .<br />
                git commit -m "Initial commit - D.R SA Digital Card"<br />
                git branch -M main<br />
                git remote add origin https://github.com/TU_USUARIO/drsa-tarjeta-digital.git<br />
                git push -u origin main
              </code>
              <button
                onClick={() => copyCode(`git init\ngit add .\ngit commit -m "Initial commit - D.R SA Digital Card"\ngit branch -M main\ngit remote add origin https://github.com/TU_USUARIO/drsa-tarjeta-digital.git\ngit push -u origin main`, 2)}
                className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center gap-1"
              >
                {copiedStep === 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedStep === 2 ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#fcd412] text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#e5720b] text-white flex items-center justify-center text-[10px]">3</span>
                Desplegar gratis en Vercel
              </span>
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#e5720b] hover:underline flex items-center gap-1 font-semibold"
              >
                vercel.com/new <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
              <li>Inicia sesión en Vercel con tu cuenta de GitHub.</li>
              <li>Selecciona Importar Repositorio y elige <strong className="text-white">drsa-tarjeta-digital</strong>.</li>
              <li>Vercel detectará automáticamente que es un proyecto Vite + React. Haz clic en <strong className="text-white">Deploy</strong>.</li>
              <li>¡Listo! Obtendrás una URL como <code className="bg-slate-950 px-1.5 py-0.5 rounded text-[#fcd412]">drsa-tarjeta.vercel.app</code>.</li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs uppercase">Generación del QR Final D.R SA</span>
            </div>
            <p className="text-xs text-emerald-300/90 leading-relaxed">
              Copia la URL de Vercel (ej: <code className="bg-emerald-950 px-1 py-0.5 rounded">https://drsa-tarjeta.vercel.app</code>) y colócala en el panel de control de esta app para generar el código QR real que colocarás en la Pantalla QR.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#e5720b] hover:bg-[#c96005] text-white font-semibold text-xs rounded-xl transition-colors shadow-md flex items-center gap-1.5"
          >
            <span>Entendido</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
