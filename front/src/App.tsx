import { useEffect, useState } from 'react';
import ChatOverlay from './pages/ChatOverlay';
import HomePage from './pages/HomePage';
import { UserInformation } from './api/elpatoApi/types';
import { elPatoApi } from './api/elpatoApi';
import { GlobalStyle } from './globalStyle';
import { useConfiguration } from './store/configuration';

const isObs = () => !!(window as { obsstudio?: unknown })['obsstudio'];

const App = () => {
  const channelName = useConfiguration(state => state.channelName);
  const [channel, setChannel] = useState<UserInformation | null>(null);
  const [error, setError] = useState<string | null>(null);


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
    <>
      <GlobalStyle/>
      { error && (<h1>{error}</h1>) }
      { channel && isObs() && (<ChatOverlay userInformation={channel} />) }
      { !isObs() && ( <HomePage /> ) }
    </>
  );
};

export default App;
