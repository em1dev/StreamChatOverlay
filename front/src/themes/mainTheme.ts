import { DefaultTheme } from 'styled-components';
import { themeKeyMap } from './chatThemes';

export const mainTheme: DefaultTheme = {
  chat: themeKeyMap['duck'].default.theme,
  page: {
    colors: {
      title: '#FF5B87',
      text: '#B65770',
      bg: '#FBF5EB',

      primary_bg: '#f6d5d5',
      primary_bg_hover: '#f6cccc',
      primary_text: '#963e54',

      secondary_bg: 'transparent',
      secondary_bg_hover: '#fff6fb',
      secondary_text: '#B65770',
      secondary_border: 'solid 3px #f6d5d5',

      input_bg: '#f6d5d5',
      input_bg_hover: '#f6cccc',
      input_text: '#963e54',

      warning_bg: '#fdffd5',
      warning_text: '#514d44',

      danger_bg: '#ff898b',
      danger_text: '#572e2e',
      danger_bg_hover: '#ff6b79'
    }
  }
};