import { useEffect, useState } from 'react';
import ChatOverlay from './pages/ChatOverlay';
import HomePage from './pages/HomePage';
import { UserInformation } from './api/elpatoApi/types';
import { elPatoApi } from './api/elpatoApi';
import { GlobalStyle } from './globalStyle';
import { useConfiguration } from './store/configuration';
import { ThemeProvider } from 'styled-components';
import { pinkTheme, theme1, theme2, theme3 } from './themes/mainTheme';

const isObs = () => !!(window as { obsstudio?: unknown })['obsstudio'];

const getTheme = (value?: string) => {
  switch (value) {
  case '2':
    return theme2;
  case '3':
    return theme3;
  case '4':
    return pinkTheme;
  case '1':
  default:
    return theme1;
  }
};

const App = () => {
  const channelName = useConfiguration(state => state.channelName);
  const userTheme = useConfiguration(state => state.chatTheme);
  const [channel, setChannel] = useState<UserInformation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedTheme = getTheme(userTheme);

  useEffect(() => {
    const load = async () => {
      if (!isObs()) return;

      const resp = await elPatoApi.getUserDetails(channelName);
      if (resp.data) {
        setChannel(resp.data);
        return;
      }
      if (resp.status === 404) {
        setError('User not found');
        return;
      }
      setError('Unexpected error');
    };

    load();
  }, [channelName]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle/>
      { error && (<h1>{error}</h1>) }
      { channel && isObs() && (<ChatOverlay userInformation={channel} />) }
      { !isObs() && ( <HomePage /> ) }
    </ThemeProvider>
  );
};

export default App;
