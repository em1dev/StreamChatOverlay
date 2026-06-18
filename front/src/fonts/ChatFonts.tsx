import { useConfiguration } from '@/store/configuration';
import { useEffect } from 'react';

export interface ChatFont {
  fontFamily: string,
  displayName?: string,
  info?: string,
  weights: Array<FontWeights>,
  importPaths: Array<string>,
}

export type FontKeys = 'itim' | 'outfit' | 'poppins' | 'gaegu';
export type FontWeights = 'normal' | 'bold' | 100 | 200 | 300 | 500 | 600 | 800 | 900;

export const FontMap: Record<FontKeys, ChatFont> = {
  itim: {
    fontFamily: 'Itim',
    weights: ['normal', 'bold'],
    importPaths: ['@fontsource/itim']
  },
  gaegu: {
    fontFamily: 'Gaegu',
    weights: ['normal', 'bold'],
    importPaths: ['@fontsource/gaegu']
  },
  outfit: {
    displayName: 'Outfit',
    fontFamily: 'Outfit Variable',
    weights: [ 100, 200 , 300, 'normal', 500, 600, 'bold', 800, 900 ],
    importPaths: ['@fontsource-variable/outfit']
  },
  poppins: {
    fontFamily: 'Poppins',
    weights: [ 300, 'normal', 500, 'bold' ],
    importPaths: [
      '@fontsource/poppins/300.css',
      '@fontsource/poppins/500.css',
      '@fontsource/poppins/800.css',
      '@fontsource/poppins',
    ]
  },
};

const loadedFonts: Record<FontKeys, boolean> = {
  gaegu: false,
  itim: false,
  outfit: false,
  poppins: false
};

// needs to be a switch for static analysis
const loadFont = async (fontKey: FontKeys) => {
  console.log(`Loading font ${fontKey}`);
  loadedFonts[fontKey] = true;

  switch (fontKey) {
    case 'gaegu':
      await import('@fontsource/gaegu');
      break;
    case 'itim':
      await import('@fontsource/itim');
      break;
    case 'outfit':
      await import('@fontsource-variable/outfit');
      break;
    case 'poppins':
      await Promise.all(
        [import('@fontsource/poppins/300.css'),
          import('@fontsource/poppins/500.css'),
          import('@fontsource/poppins/800.css'),
          import('@fontsource/poppins')]
      );
      break;
  }
};

export const useAllChatFonts = () => {
  useEffect(() => {
    Promise.all(
      Object
        .entries(loadedFonts)
        .filter(([,loaded]) => !loaded)
        .map(([key]) => loadFont(key as FontKeys))
    );
  }, []);
};

export const useChatFontLoader = () => {
  const selectedFont = useConfiguration(s => s.userConfiguration.chatFont);

  useEffect(() => {
    const hasLoaded = loadedFonts[selectedFont];
    if (hasLoaded) return;

    loadFont(selectedFont);

  }, [selectedFont]);
};
