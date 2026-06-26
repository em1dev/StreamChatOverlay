import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from './themes/mainTheme.ts';
import { GlobalStyle } from './globalStyle.ts';
import router from './app/routes.tsx';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={mainTheme} >
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
