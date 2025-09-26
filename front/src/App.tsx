import { ThemeProvider } from 'styled-components';
import { Landing } from './pages/Landing';
import { mainTheme } from './themes/mainTheme';
import { GlobalStyle } from './globalStyle';


const App = () => {

  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalStyle />
      <Landing />
    </ThemeProvider>
  );
};

export default App;
