import { ThemeProvider } from 'styled-components';
import { useChatTheme } from '@/hooks/useChatTheme';
import { ChatWithTwitchConnection } from './ChatWithTwitchConnection';
import { useSecret } from './useSecret';
import { useStore } from '@/store';


export const ChatOverlay = () => {
  const { hasError, isLoading, twitch } = useSecret();
  const hasActiveChat = useStore(s => s.activeChat !== null);
  const twitchConnectionEnabled = useStore(s => s.activeChat?.settings.allowedConnections.twitch);

  if (hasError) return (
    <div style={{ background: '#ffd0d0', color: '#934040', padding: '1em', borderRadius: '1em', border: 'solid 2px #bd8888'}}>
      <h1>Something has gone wrong with the chat visualizer</h1>
      <p>Make sure you copied the url correctly, if you have recently changed your twitch password you might have to recreate the url at https://chat.elpato.dev</p>
    </div>
  );

  if (isLoading) return;
  if (!hasActiveChat) return;
  if (!twitchConnectionEnabled || !twitch) return;

  return (
    <ChatOverlayWithSettings channelId={twitch.channelId} channelName={twitch.channelName}  />
  );
};

export const ChatOverlayWithSettings = ({ channelId, channelName }: { channelId: string, channelName: string}) => {
  const chatTheme = useChatTheme();

  return (
    <ThemeProvider theme={chatTheme}>
      <ChatWithTwitchConnection
        channelId={channelId}
        channelLogin={channelName}
      />
    </ThemeProvider>
  );
};
