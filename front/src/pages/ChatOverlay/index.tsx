import { useLocation, useParams } from 'react-router';
import Chat from '../../components/ChatVisualizerCore';
import { useTwitchChat } from '../../hooks/useTwitchChat/useTwitchChat';
import { BaseCSS } from './styles';
import { useEffect, useState } from 'react';
import { chatApi } from '@/api/chatApi';
import { ThemeProvider } from 'styled-components';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { useConfiguration } from '@/store/configuration';
import { useChatTheme } from '@/hooks/useChatTheme';

const ChatOverlay = () => {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation(); 

  const setInitialConfiguration = useConfiguration(s => s.setInitialState);
  const chatThemeKey = useConfiguration(s => s.userConfiguration.chatTheme);
  const chatTheme = useChatTheme(chatThemeKey);
  const [connectionDetails, setConnectionDetails] = useState<{
    channelName: string,
    channelId: string,
  } | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const search = new URLSearchParams(location.search);
        const secret = search.get('s');
        if (!secret || !userId) {
          setHasError(true);
          console.error('Missing params');
          return;
        }
        const userIdParsed = Number.parseInt(userId);

        const resp = await chatApi.getConnectionDetailsFromSecret(userIdParsed, secret);
        if (resp.hasError || !resp.data) {
          setHasError(true);
          console.error('Incorrect secret or server issues');
          return;
        };

        const settingsParsed = JSON.parse(resp.data.settingsJsonString) as UserConfiguration;
        setInitialConfiguration(settingsParsed, secret);
        setConnectionDetails({
          channelId: resp.data!.twitchUserId,
          channelName: resp.data!.twitchUsername,
        });
      } catch(e) {
        console.error(e);
        setHasError(true);
      }
    })();
  }, [location, userId, setInitialConfiguration]);

  if (hasError) return (
    <div style={{ background: '#ffd0d0', color: '#934040', padding: '1em', borderRadius: '1em', border: 'solid 2px #bd8888'}}>
      <h1>Something has gone wrong</h1>
      <p>Make sure you copied the url correctly, if you have recently changed your twitch password you might have to recreate the url. At https://chat.elpato.dev</p>
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