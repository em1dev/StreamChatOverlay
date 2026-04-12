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
  weights: Array<FontWeights>,
}

export type FontKeys = 'itim' | 'outfit' | 'poppins' | 'gaegu';
export type FontWeights = 'normal' | 'bold' | 100 | 200 | 300 | 500 | 600 | 800 | 900;

export const FontMap: Record<FontKeys, ChatFont> = {
  itim: {
    fontFamily: 'Itim',
    weights: ['normal', 'bold']
  },
  gaegu: {
    fontFamily: 'Gaegu',
    weights: ['normal', 'bold']
  },
  outfit: {
    displayName: 'Outfit',
    fontFamily: 'Outfit Variable',
    weights: [ 100, 200 , 300, 'normal', 500, 600, 'bold', 800, 900 ]
  },
  poppins: {
    fontFamily: 'Poppins',
    weights: [ 300, 'normal', 500, 'bold' ]
  },
};