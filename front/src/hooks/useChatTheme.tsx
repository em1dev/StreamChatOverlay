import { themeKeyMap, ThemeKeys } from '@/themes/chatThemes';
import { useMemo } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';

export const useChatTheme = (chatThemeKey: ThemeKeys) => {
  const theme = useTheme();

  const chatTheme: DefaultTheme = useMemo(() => (
    {
      ...theme,
      chat: chatThemeKey ? themeKeyMap[chatThemeKey] : themeKeyMap['duck']
    }
  ), [chatThemeKey, theme]);

  return chatTheme;
};