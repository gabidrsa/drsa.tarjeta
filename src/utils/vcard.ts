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

  // 1. Web Share API with File object: On Android (Samsung, Chrome) and iOS, this opens native Contacts share/add prompt
  if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `${contact.name} - ${contact.company}`,
        text: `Agendar contacto de ${contact.name}`,
      });
      return;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // User cancelled share dialog
      }
    }
  }

  // 2. Direct opening via Blob URL (no download attribute)
  // Without the 'download' attribute, iOS Safari and Android browsers open the native vCard contact importer directly
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);

  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    // On iOS Safari, opening the blob URL directly triggers the native "Add to Contacts" screen
    window.location.href = blobUrl;
  } else {
    // On Android / Mobile browsers, trying location assignment or data URI triggers system contacts
    const dataUrl = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcardContent);
    
    // Create link without 'download' attribute to force opening in Contacts app
    const link = document.createElement('a');
    link.href = dataUrl;
    link.target = '_self';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
