import React from 'react';

export const OFFICIAL_LOGO_URL = 'https://res.cloudinary.com/dfx2o2suk/image/upload/v1778269925/site_logo.png';

interface LogoDRProps {
  variant?: 'icon' | 'full' | 'compact';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const LogoDR: React.FC<LogoDRProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeClasses = {
    sm: 'h-8 max-h-8',
    md: 'h-11 max-h-11',
    lg: 'h-16 max-h-16',
    xl: 'h-20 max-h-20',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official D.R SA Logo Image */}
      <div className="relative flex items-center justify-center shrink-0">
        <img
          src={OFFICIAL_LOGO_URL}
          alt="Logo D.R SA"
          referrerPolicy="no-referrer"
          className={`${sizeClasses[size]} w-auto object-contain drop-shadow-md transition-all`}
        />
      </div>

      {variant === 'full' && showText && (
        <div className="flex flex-col text-left">
          <span className="font-montserrat font-black tracking-wider text-white text-xl sm:text-2xl leading-none">
            D.R SA
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#fcd412] uppercase tracking-widest mt-1">
            DISTRIBUCIÓN DE TELAS
          </span>
        </div>
      )}
    </div>
  );
};
