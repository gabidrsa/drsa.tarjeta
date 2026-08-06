import { DRContactData, DEFAULT_CONTACT_DATA } from '../types';

export async function downloadVCard(contact: DRContactData = DEFAULT_CONTACT_DATA): Promise<void> {
  const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // 1. Android Native Contacts Intent (Opens Samsung/Google Contacts "Crear contacto" screen directly without download)
  if (isAndroid) {
    const phone = `+${contact.whatsappRaw}`;
    const name = encodeURIComponent(contact.name);
    const company = encodeURIComponent(contact.company);
    const role = encodeURIComponent(contact.role);
    const notes = encodeURIComponent(`${contact.categories} - ${contact.location} | Web: ${contact.websiteDisplay}`);

    const intentUrl = `intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.dir/raw_contact;S.name=${name};S.company=${company};S.job_title=${role};S.phone=${encodeURIComponent(phone)};S.notes=${notes};end`;

    try {
      window.location.href = intentUrl;
      return;
    } catch {
      // Fallback if intent fails
    }
  }

  // vCard content string for iOS and web fallback
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

  const dataUri = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcardContent);

  // 2. iOS Safari direct vCard modal trigger (opens native "Añadir a contactos" sheet directly in Safari)
  if (isIOS) {
    window.location.href = dataUri;
    return;
  }

  // 3. Web Share API fallback if supported
  const fileName = 'Dario_Lucarelli_DRSA.vcf';
  const file = new File([vcardContent], fileName, { type: 'text/vcard;charset=utf-8' });

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
        return;
      }
    }
  }

  // 4. Default fallback: Open data URL directly without download attribute
  const link = document.createElement('a');
  link.href = dataUri;
  link.target = '_self';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

