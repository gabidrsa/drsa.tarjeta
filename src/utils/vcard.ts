import { DRContactData, DEFAULT_CONTACT_DATA } from '../types';

export async function downloadVCard(contact: DRContactData = DEFAULT_CONTACT_DATA): Promise<void> {
  const vcardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Lucarelli;Dario;;;',
    `FN:${contact.name}`,
    `ORG:${contact.company}`,
    `TITLE:${contact.role}`,
    `TEL;TYPE=CELL,VOICE,PREF:+${contact.whatsappRaw}`,
    `TEL;TYPE=CELL:${contact.whatsappDisplay}`,
    `URL;TYPE=WORK:${contact.websiteUrl}`,
    `X-SOCIALPROFILE;type=instagram:${contact.instagramUrl}`,
    `NOTE:${contact.categories} - ${contact.location}`,
    'END:VCARD'
  ].join('\r\n');

  const fileName = 'Dario_Lucarelli_DRSA.vcf';
  const file = new File([vcardContent], fileName, { type: 'text/vcard;charset=utf-8' });

  // 1. Web Share API (Primary strategy for Android / Samsung / mobile devices to directly open contacts app)
  if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `${contact.name} - ${contact.company}`,
        text: `Guardar contacto de ${contact.name}`,
      });
      return;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // User dismissed share sheet
      }
    }
  }

  // 2. Direct Blob / Data URI download fallback
  const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
  
  if (isAndroid) {
    // Data URI for Android browsers
    const dataUrl = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcardContent);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Blob object URL for iOS and Desktop
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
}
