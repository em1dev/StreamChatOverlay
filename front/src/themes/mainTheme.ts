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

      select_bg: '#FFC9DD',
      select_text: '#a3575e',

      input_bg: '#FFC9DD',
      input_text: '#a3575e'
    }
  }
};