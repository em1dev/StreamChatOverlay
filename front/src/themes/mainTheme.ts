import { DefaultTheme } from 'styled-components';
import { themeKeyMap } from './chatThemes';

export const mainTheme: DefaultTheme = {
  chat: themeKeyMap['duck'].default.theme,
  page: {
    buttons: {
      primary: {
        bg: '#ff92af',
        bg_hover: '#ef7f9d',
        color: '#510101',
        color_hover: '#641948',
        outline: 'none',
      },
      secondary: {
        bg: '#f5e5de',
        bg_hover: '#edd7cd',
        color: '#692121',
        color_hover: '#963e54',
        outline: 'none',
      },
      ghost: {
        bg: 'transparent',
        bg_hover: '#f5e5de',
        color: 'inherit',
        color_hover: 'inherit',
        outline: 'none'
      },
      destructive: {
        bg: '#ffd0d0',
        bg_hover: '#ffc8c8',
        color: '#e7000b',
        color_hover: '#e7000b',
        outline: 'none'
      },
      outline: {
        bg: 'transparent',
        bg_hover: '#fffbf5',
        color: 'inherit',
        color_hover: 'inherit',
        outline: 'solid 0.1em #e9cdcd'
      },
      link: {
        bg: 'transparent',
        bg_hover: 'transparent',
        color: 'inherit',
        color_hover: 'inherit',
        outline: 'transparent'
      }
    },
    outlines: {
      section: 'solid 0.1em #e9cdcd',
      input: 'solid 0.1em #e9cdcd'
    },
    borderRadius: '0.5em',
    query: {
      mobile: 'max-width: 900px'
    },
    colors: {
      title: '#f14e7a',
      text: '#a64b63',
      bg: '#FBF5EB',

      primary_bg: '#f6d5d5',
      primary_bg_hover: '#f6cccc',
      primary_text: '#963e54',

      secondary_bg: 'transparent',
      secondary_bg_hover: '#fff6fb',
      secondary_text: '#a64b63',
      secondary_border: 'solid 3px #f6d5d5',

      nav_bg_hover: '#f5e5de',

      button_bg_hover: '#f5e5de',

      input_bg: 'transparent',
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
