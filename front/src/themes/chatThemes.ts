import { centeredChatTheme, greenCenterTheme, pinkCenterTheme, redCenterTheme } from './chatThemes/centered';
import { coffeeChatTheme } from './chatThemes/coffee';
import { contrastChatTheme, contrastRedChatTheme } from './chatThemes/contrast';
import { blueChatTheme, duckChatTheme, greenChatTheme, pinkChatTheme, redChatTheme } from './chatThemes/duck';
import { floatingChatTheme } from './chatThemes/floating';
import { ChatTheme } from './styled';

export type ThemeKeys = 'duck' | 'coffee' | 'floating' |  'contrast' | 'centered' ;

type ChatThemeVariant = {
  theme: ChatTheme,
  displayColor: string,
}

export const themeKeyWithDisplayName:Array<{
  displayName: string,
  key: ThemeKeys
}> = [
  { displayName: 'Rounded', key: 'duck' },
  { displayName: 'Coffee', key: 'coffee' },
  { displayName: 'Floating', key: 'floating' },
  { displayName: 'Sharp', key: 'contrast' },
  { displayName: 'Fill', key: 'centered' },
];

export const themeKeyMap: Record<ThemeKeys, 
  Record<'default', ChatThemeVariant> &
  Record<string, ChatThemeVariant>
> = {
  'duck': {
    'default': {
      theme: duckChatTheme,
      displayColor: '#ffe7af',
    },
    'pink': {
      theme: pinkChatTheme,
      displayColor: 'pink'
    },
    'blue': {
      theme: blueChatTheme,
      displayColor: '#8b86ff'
    },
    'red': {
      theme: redChatTheme,
      displayColor: '#ed6063'
    },
    'green': {
      theme: greenChatTheme,
      displayColor: '#2ebf2e'
    }
  },
  'coffee': { 
    'default': { 
      theme: coffeeChatTheme,
      displayColor: '#3b3432'
    }
  },
  'floating': { 
    'default': {
      theme: floatingChatTheme,
      displayColor: 'transparent'
    }
  },
  'contrast': { 
    'default': {
      theme: contrastChatTheme ,
      displayColor: 'black'
    },
    'inverted': {
      theme: contrastRedChatTheme ,
      displayColor: 'white'
    },
  },
  'centered': { 
    'default': {
      theme: centeredChatTheme,
      displayColor: '#94dbea'
    },
    'pink': {
      theme: pinkCenterTheme,
      displayColor: 'pink'
    },
    'red': {
      theme: redCenterTheme,
      displayColor: '#ed6063'
    },
    'green': {
      theme: greenCenterTheme,
      displayColor: '#7fe57f'
    }
  }
};