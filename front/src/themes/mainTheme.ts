import { theme2 } from './chatThemes';
import { DefaultTheme } from 'styled-components';

export const mainTheme: DefaultTheme = {
  chat: theme2,
  page: {
    colors: {
      title: '#FF5B87',
      text: '#B65770',
      bg: '#FBF5EB',

      primary_bg: '#FF94B8',
      primary_text: '#681018',

      secondary_bg: '',
      secondary_text: '',

      select_bg: '#E2ABB4',
      select_text: '#681018'
    }
  }
};