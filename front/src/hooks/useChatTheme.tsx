import { useConfiguration } from '@/store/configuration';
import { themeKeyMap, ThemeKeys } from '@/themes/chatThemes';
import { useMemo } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';

export const useChatTheme = (chatThemeKey: ThemeKeys) => {
  const theme = useTheme();
  const chatThemeOverride = useConfiguration(c => c.userConfiguration.chatThemeOverride);

  const combinedTheme: DefaultTheme = useMemo(() => {
    const chatTheme = chatThemeKey ? themeKeyMap[chatThemeKey] : themeKeyMap['duck'];

    if (chatThemeOverride?.font)
    {
      chatTheme.font = chatThemeOverride.font;
    }

    return (
      {
        ...theme,
        chat: chatTheme
      });
  }, [chatThemeKey, theme, chatThemeOverride]);

  return combinedTheme;
};