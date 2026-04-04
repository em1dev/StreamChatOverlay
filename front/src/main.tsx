import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from './themes/mainTheme.ts';
import { GlobalStyle } from './globalStyle.ts';
import router from './app/routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={mainTheme} >
    <GlobalStyle />
    <RouterProvider router={router} />
  </ThemeProvider>
);
