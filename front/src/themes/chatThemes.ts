import { centeredChatTheme } from './chatThemes/centered';
import { coffeeChatTheme } from './chatThemes/coffee';
import { contrastChatTheme } from './chatThemes/contrast';
import { duckChatTheme } from './chatThemes/duck';
import { floatingChatTheme } from './chatThemes/floating';
import { pinkChatTheme } from './chatThemes/pink';
import { ChatTheme } from './styled';

export type ThemeKeys = 'duck' | 'coffee' | 'pink' | 'floating' |  'contrast' | 'centered' ;

export const themeKeyMap: Record<ThemeKeys, ChatTheme> = {
  'duck': duckChatTheme,
  'coffee': coffeeChatTheme,
  'pink': pinkChatTheme,
  'floating': floatingChatTheme,
  'contrast': contrastChatTheme,
  'centered': centeredChatTheme
};