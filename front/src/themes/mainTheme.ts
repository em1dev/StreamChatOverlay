import { DefaultTheme } from 'styled-components';
import { themeKeyMap } from './chatThemes';

export const mainTheme: DefaultTheme = {
  chat: themeKeyMap['duck'].default.theme,
  page: {
    colors: {
      title: '#FF5B87',
      text: '#B65770',
      bg: '#FBF5EB',

      primary_bg: '#ffc9dd',
      primary_bg_hover: '#ffa5c6',
      primary_text: '#51273d',

      secondary_bg: '#ffe7f4',
      secondary_bg_hover: '#fff6fb',
      secondary_text: '#993a3a',
      secondary_border: 'solid 1px #f5c3ed',

      select_bg: '#ffc9dd',
      select_text: '#51273d',

      input_bg: '#ffc9dd',
      input_text: '#51273d',

      warning_bg: '#fdffd5',
      warning_text: '#514d44',

      danger_bg: '#ff898b',
      danger_text: '#572e2e',
      danger_bg_hover: '#ff6b79'
    }
  }
};