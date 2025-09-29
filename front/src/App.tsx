import { ThemeProvider } from 'styled-components';
import { Landing } from './pages/Landing';
import { mainTheme } from './themes/mainTheme';
import { GlobalStyle } from './globalStyle';
import { Route, Routes } from 'react-router';
import { BasicSettings } from './pages/Settings/BasicSettings';
import { TextToSpeechSettings } from './pages/Settings/TextToSpeechSettings';
import { AddToStream } from './pages/Settings/AddToStream';
import { AdvanceSettings } from './pages/Settings/AdvanceSettings';
import { CustomThemeSettings } from './pages/Settings/CustomThemeSettings';
import { AuthProvider } from './authContext/authProvider';
import { AuthenticationPage } from './pages/AuthenticationPage';

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
          <Route index element={ <Landing /> } />
          <Route path="/settings/" element={ <BasicSettings /> } />
          <Route path="/settings/add-to-stream" element={ <AddToStream /> } />
          <Route path="/settings/tts" element={ <TextToSpeechSettings /> } />
          <Route path="/settings/advance-settings" element={ <AdvanceSettings /> } />
          <Route path="/settings/custom-theme" element={ <CustomThemeSettings /> } />
          <Route path="/l/:magicLink" element={ <div>asd</div> } />

          <Route path="/auth" element={ <AuthenticationPage /> } />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
