import '@fontsource/poppins/300.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins';
import '@fontsource-variable/outfit';
import '@fontsource/itim';
import '@fontsource/gaegu';

export interface ChatFont {
  fontFamily: string,
  displayName?: string,
  info?: string,
  overrideWeight?: string | number
}

export type FontKeys = 'itim' | 'outfit' | 'poppins' | 'gaegu';


export const FontMap: Record<FontKeys, ChatFont> = {
  itim: {
    fontFamily: 'Itim',
  },
  gaegu: {
    fontFamily: 'Gaegu',
    overrideWeight: 'bold', // forcing bold for legibility as this font is quite thin
  },
  outfit: {
    displayName: 'Outfit',
    fontFamily: 'Outfit Variable',
  },
  poppins: {
    fontFamily: 'Poppins',
  },
};