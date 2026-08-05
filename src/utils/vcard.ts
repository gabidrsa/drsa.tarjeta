import { DRContactData, DEFAULT_CONTACT_DATA } from '../types';

export function downloadVCard(contact: DRContactData = DEFAULT_CONTACT_DATA): void {
  const vcardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Lucarelli;Dario;;;',
    `FN:${contact.name}`,
    `ORG:${contact.company}`,
    `TITLE:${contact.role}`,
    `TEL;TYPE=CELL,VOICE,MSG:${contact.whatsappDisplay}`,
    `URL;TYPE=WORK:${contact.websiteUrl}`,
    `X-SOCIALPROFILE;type=instagram:https://instagram.com/dr.sa_rosario`,
    `NOTE:${contact.categories} - ${contact.location}`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Dario_Lucarelli_DRSA.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
