export type ViewMode = 'card' | 'qr' | 'both';

export type ScreenDeviceMode = 'preview' | 'phone' | 'fullscreen';

export interface DRContactData {
  company: string;
  qrHeadline: string;
  qrSubtext: string;
  tagline: string;
  categories: string;
  location: string;
  name: string;
  role: string;
  whatsappDisplay: string;
  whatsappRaw: string;
  instagramDisplay: string;
  instagramUrl: string;
  websiteDisplay: string;
  websiteUrl: string;
  qrTargetUrl: string;
}

export const DEFAULT_CONTACT_DATA: DRContactData = {
  company: 'D.R SA',
  qrHeadline: 'D.R SA QR',
  qrSubtext: 'ESCANEÁ PARA CONOCERNOS',
  tagline: 'Distribuidora de Telas y Textiles',
  categories: 'Telas para TAPICERÍA · DECORACIÓN · MARROQUINERÍA · NÁUTICA',
  location: 'Riobamba 3334, Rosario, Argentina',
  name: 'Dario Lucarelli',
  role: 'Contacto comercial',
  whatsappDisplay: '+54 9 341 502-2653',
  whatsappRaw: '5493415022653',
  instagramDisplay: '@dr.sa_rosario',
  instagramUrl: 'https://instagram.com/dr.sa_rosario',
  websiteDisplay: 'www.drsa.com.ar',
  websiteUrl: 'http://www.drsa.com.ar',
  qrTargetUrl: 'http://www.drsa.com.ar',
};
