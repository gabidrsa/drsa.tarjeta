import { toPng } from 'html-to-image';

export async function exportElementAsPng(elementId: string, filename: string): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // Ensures high resolution crispness for 1080x1920
      cacheBust: true,
      backgroundColor: '#0a1d88',
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('Error exporting image:', error);
    return false;
  }
}
