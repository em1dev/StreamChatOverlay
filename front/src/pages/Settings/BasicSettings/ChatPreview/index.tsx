import { ThemeProvider } from 'styled-components';
import Chat from '@/components/ChatVisualizerCore';
import { useChatTheme } from '@/hooks/useChatTheme';
import { useConfigurationStore } from '@/store/configurationStore';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';

import * as S from './styles';


export const ChatPreview = () => {
  const chatTheme = useChatTheme();
  const chatDirection = useConfigurationStore(state => state.userConfiguration.chatDirection);
  const lowerOpacityOnTop = useConfigurationStore(state =>  state.userConfiguration.lowerOpacityOnTop);
  const chatFontKey = useConfigurationStore(state => state.userConfiguration.chatFont);
  const fontSize = useConfigurationStore(state => state.userConfiguration.fontSize);
  const fontWeight = useConfigurationStore(state => state.userConfiguration.chatFontWeight);
  const headerOrdering = useConfigurationStore(state =>  state.userConfiguration.headerOrdering);
  const showChatterBadges = useConfigurationStore(state => state.userConfiguration.showChatterBadges);

  return (
    <S.ChatContainer>
      <ThemeProvider theme={chatTheme}>
        <Chat
          headerOrdering={headerOrdering}
          showBadges={showChatterBadges}
          lowerOpacityOnTop={lowerOpacityOnTop}
          fontWeight={fontWeight}
          fontSize={fontSize}
          chatFont={chatFontKey}
          chatDirection={chatDirection}
          msgs={landingExamplesMessages}
        />
      </ThemeProvider>
    </S.ChatContainer>
  );
};
