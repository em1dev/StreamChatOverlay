import { ThemeProvider } from 'styled-components';
import { useChatTheme } from '@/hooks/useChatTheme';
import { ChatWithTwitchConnection } from './ChatWithTwitchConnection';
import { ChatWithYoutubeConnection } from './ChatWithYoutubeConnection';
import { useSecret } from './useSecret';

import '@/fonts/ChatFonts';
import { ChatWithBothConnections } from './ChatWithBothConnections';


const ChatOverlay = () => {
  const { hasError, isLoading, twitch, youtube, secret, userId } = useSecret();
  const chatTheme = useChatTheme();

  if (hasError) return (
    <div style={{ background: '#ffd0d0', color: '#934040', padding: '1em', borderRadius: '1em', border: 'solid 2px #bd8888'}}>
      <h1>Something has gone wrong with the chat visualizer</h1>
      <p>Make sure you copied the url correctly, if you have recently changed your twitch password you might have to recreate the url at https://chat.elpato.dev</p>
    </div>
  );

  if (isLoading) return;

  if (twitch && youtube && secret && userId != null) return (
    <ThemeProvider theme={chatTheme}>
      <ChatWithBothConnections
        twitchChannelId={twitch.channelId}
        twitchChannelLogin={twitch.channelName}
        secret={secret}
        userId={userId}
        />
    </ThemeProvider>
  );

  if (twitch) return (
    <ThemeProvider theme={chatTheme}>
      <ChatWithTwitchConnection
        channelId={twitch.channelId}
        channelLogin={twitch.channelName}
      />
    </ThemeProvider>
  );

  if (youtube && secret && userId != null) return (
    <ThemeProvider theme={chatTheme}>
      <ChatWithYoutubeConnection
        secret={secret}
        userId={userId}
      />
    </ThemeProvider>
  );
};

export default ChatOverlay;
