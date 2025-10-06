import { ThemeProvider } from 'styled-components';
import { Landing } from './pages/Landing';
import { mainTheme } from './themes/mainTheme';
import { GlobalStyle } from './globalStyle';
import { Outlet, Route, Routes } from 'react-router';
import { BasicSettings } from './pages/Settings/BasicSettings';
import { TextToSpeechSettings } from './pages/Settings/TextToSpeechSettings';
import { AddToStream } from './pages/Settings/AddToStream';
import { AdvanceSettings } from './pages/Settings/AdvanceSettings';
import { CustomThemeSettings } from './pages/Settings/CustomThemeSettings';
import { AuthProvider } from './context/authContext/authProvider';
import { AuthenticationPage } from './pages/AuthenticationPage';
import { SettingsSynchronizer } from './utils/SettingsSynchronizer';
import ChatOverlay from './pages/ChatOverlay';
import { SettingsTemplate } from './templates/SettingsTemplate';

const Providers = () => (
  <AuthProvider>
    <SettingsSynchronizer />
    <Outlet />
  </AuthProvider>
);

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalStyle />
      <Routes>
        <Route element={<Providers />}>
          <Route index element={ <Landing /> } />
          <Route element={<SettingsTemplate />}>
            <Route path="/settings/" element={ <BasicSettings /> } />
            <Route path="/settings/add-to-stream" element={ <AddToStream /> } />
            <Route path="/settings/tts" element={ <TextToSpeechSettings /> } />
            <Route path="/settings/advance-settings" element={ <AdvanceSettings /> } />
            <Route path="/settings/custom-theme" element={ <CustomThemeSettings /> } />
          </Route>

          <Route path="/auth" element={ <AuthenticationPage /> } />
        </Route>

        <Route path="/o/:userId" element={ <ChatOverlay /> } />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
