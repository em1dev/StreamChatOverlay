import { ThemeProvider } from 'styled-components';
import { Landing } from './pages/Landing';
import { mainTheme } from './themes/mainTheme';
import { GlobalStyle } from './globalStyle';
import { Route, Routes } from 'react-router';
import { BasicSettings } from './pages/Settings/BasicSettings';
import { TextToSpeechSettings } from './pages/Settings/TextToSpeechSettings';
import { AddToStream } from './pages/Settings/AddToStream';
import { AdvanceSettings } from './pages/Settings/AdvanceSettings';

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalStyle />
      <Routes>
        <Route index element={ <Landing /> } />

        <Route path="/settings/" element={ <BasicSettings /> } />
        <Route path="/settings/add-to-stream" element={ <AddToStream /> } />
        <Route path="/settings/tts" element={ <TextToSpeechSettings /> } />
        <Route path="/settings/advance-settings" element={ <AdvanceSettings /> } />
        <Route path="/settings/custom-theme" element={ <BasicSettings /> } />

        <Route path="/l/:magicLink" element={ <div>asd</div> } />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
