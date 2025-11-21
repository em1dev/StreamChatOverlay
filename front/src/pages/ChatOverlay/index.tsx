import { useLocation, useParams } from 'react-router';
import Chat from '../../components/ChatVisualizerCore';
import { useTwitchChat } from '../../hooks/useTwitchChat/useTwitchChat';
import { BaseCSS } from './styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { chatApi } from '@/api/chatApi';
import { ThemeProvider } from 'styled-components';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { useConfiguration } from '@/store/configuration';
import { useChatTheme } from '@/hooks/useChatTheme';
import { defaultUserConfiguration } from '@/store/defaultConfiguration';
import { useSettingsChangeListener } from '@/hooks/useSettingsChangeListener';

const ChatOverlay = () => {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation(); 

  const setInitialConfiguration = useConfiguration(s => s.setInitialState);
  const chatTheme = useChatTheme();
  const [connectionDetails, setConnectionDetails] = useState<{
    channelName: string,
    channelId: string,
  } | null>(null);
  const [hasError, setHasError] = useState(false);

  const userIdParsed = useMemo(() => {
    if (!userId) return null;
    return parseInt(userId);
  }, [userId]);

  const fetchSettings = useCallback(async () => {
    try {
      const search = new URLSearchParams(location.search);
      const secret = search.get('s');
      if (!secret || userIdParsed == null) {
        setHasError(true);
        console.error('Missing params');
        return;
      }
      const resp = await chatApi.getConnectionDetailsFromSecret(userIdParsed, secret);
      if (resp.hasError || !resp.data) {
        setHasError(true);
        console.error('Incorrect secret or server issues');
        return;
      };

      let settingsParsed = defaultUserConfiguration;
      if (resp.data.settingsJsonString.length > 0)
      {
        settingsParsed = JSON.parse(resp.data.settingsJsonString) as UserConfiguration;
      }

      setInitialConfiguration(settingsParsed, secret);
      setConnectionDetails({
        channelId: resp.data!.twitchUserId,
        channelName: resp.data!.twitchUsername,
      });
    } catch(e) {
      console.error(e);
      setHasError(true);
    }
  }, [location.search, setInitialConfiguration, userIdParsed]);

  useSettingsChangeListener(userIdParsed, () => {
    console.log('Change received');
    fetchSettings();
  });

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (hasError) return (
    <div style={{ background: '#ffd0d0', color: '#934040', padding: '1em', borderRadius: '1em', border: 'solid 2px #bd8888'}}>
      <h1>Something has gone wrong with the chat visualizer</h1>
      <p>Make sure you copied the url correctly, if you have recently changed your twitch password you might have to recreate the url at https://chat.elpato.dev</p>
    </div>
  );

  if (connectionDetails) return (
    <ThemeProvider theme={chatTheme}>
      <ChatWithTwitchConnection
        channelId={connectionDetails.channelId}
        channelLogin={connectionDetails.channelName}
      />
    </ThemeProvider>
  );
};

const ChatWithTwitchConnection = ({
  channelId,
  channelLogin
}: {
  channelId: string,
  channelLogin: string
}) => {
  const { chatMessages } = useTwitchChat(channelId, channelLogin);

  return (
    <>
      <BaseCSS />
      <Chat msgs={chatMessages} />
    </>
  );
};

export default ChatOverlay;