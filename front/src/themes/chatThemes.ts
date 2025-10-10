import { coffeeChatTheme } from './chatThemes/coffee';
import { contrastChatTheme } from './chatThemes/contrast';
import { duckChatTheme } from './chatThemes/duck';
import { floatingChatTheme } from './chatThemes/floating';
import { pinkChatTheme } from './chatThemes/pink';
import { ChatTheme } from './styled';

// theme variables
export const THEME_USER_COLOR = '$userColor';

export type ThemeKeys = 'duck' | 'coffee' | 'pink' | 'floating' |  'contrast' ;

export const themeKeyMap: Record<ThemeKeys, ChatTheme> = {
  'duck': duckChatTheme,
  'coffee': coffeeChatTheme,
  'pink': pinkChatTheme,
  'floating': floatingChatTheme,
  'contrast': contrastChatTheme,
};