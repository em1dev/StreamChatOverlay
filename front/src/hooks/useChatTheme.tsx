import { useConfigurationStore } from '@/store/configurationStore';
import { themeKeyMap } from '@/themes/chatThemes';
import { useMemo } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';

export const useChatTheme = () => {
  const chatThemeKey = useConfigurationStore(c => c.userConfiguration.chatTheme);
  const chatThemeVariant = useConfigurationStore(c => c.userConfiguration.chatThemeVariant);
  const theme = useTheme();

  const chatTheme: DefaultTheme = useMemo(() => {
    // if the theme key is invalid revert to default
    const themeVariants = (chatThemeKey ? themeKeyMap[chatThemeKey] : themeKeyMap['duck']) ?? themeKeyMap['duck'];
    const extractedTheme = themeVariants[chatThemeVariant ?? 'default'] ?? themeVariants.default;

    return ({
      ...theme,
      chat: extractedTheme.theme
    });
  }, [chatThemeKey, chatThemeVariant, theme]);

  return chatTheme;
};
