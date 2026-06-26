import Chat from '@/components/ChatVisualizerCore';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';
import { DefaultTheme, ThemeProvider, useTheme } from 'styled-components';
import { ThemePicker } from '@/components/ThemePicker';
import { Footer } from '@/components/Footer';
import { defaultUserConfiguration } from '@/store/configurationStore/defaultConfiguration';
import { useState } from 'react';
import { themeKeyMap, ThemeKeys } from '@/themes/chatThemes';
import { CTAButton } from './CTAButton';

import * as S from './styles';


export const Landing = () =>
{
  const [selectedTheme, setSelectedTheme] = useState<{
    themeKey: ThemeKeys,
    variant: string
  }>({
    themeKey: 'duck',
    variant: 'default'
  });
  const baseTheme = useTheme();
  const theme = themeKeyMap[selectedTheme.themeKey];
  const chatVariantTheme = theme[selectedTheme.variant].theme;

  const chatTheme:DefaultTheme = {
    ...baseTheme,
    chat: chatVariantTheme
  };

  return (
    <S.Main>
      <section>
        <div>
          <div>
            <h1>Stream Chat Overlay</h1>
            <p>Configurable Twitch chat with chatter pronouns</p>
          </div>

          <ul>
            <li>100% Free and open source</li>
            <li>Text to speech support</li>
            <li>Font and size customization</li>
            <li>BetterTTV, FFZ and 7TV integration</li>
            <li>Pronoun support via pronouns.alejo</li>
          </ul>

          <S.ThemePickerContainer>
            <ThemePicker
              label='Theme preview'
              themeKey={selectedTheme.themeKey}
              themeVariant={selectedTheme.variant}
              onChange={(newKey, newVariant) =>
                setSelectedTheme({ themeKey: newKey, variant: newVariant })
              }
            />
          </S.ThemePickerContainer>

          <S.CTAContainer>

            <CTAButton />

            <a
              data-umami-event='outbound link'
              data-umami-event-url='https://ko-fi.com/emydev'
              data-umami-event-from='landing btn'
              target='_blank'
              href='https://ko-fi.com/emydev'
            >
              Support me :3
            </a>
          </S.CTAContainer>
        </div>

        <S.ChatContainer aria-hidden>
          <S.Blob style={{ fill: '#EEC5C6' }}>
            <svg aria-hidden xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 319.2 356.7">
              <path d="M271.9 50.3c30.6 29.3 51.3 75.5 46.6 123.9-4.6 48.4-34.6 99-86.5 136.3s-125.6 61.4-168.3 35.3S9.4 243.5 3.4 177.3C-2.7 111.2-3.1 55.2 24 26.7 51.1-1.9 105.9-2.9 153.4 2.8c47.6 5.8 88 18.2 118.5 47.5z"></path>
            </svg>
          </S.Blob>

          <ThemeProvider theme={chatTheme}>
            <Chat
              chatDirection='right'
              chatFont={defaultUserConfiguration.chatFont}
              fontSize={defaultUserConfiguration.fontSize}
              fontWeight={defaultUserConfiguration.chatFontWeight}
              headerOrdering={defaultUserConfiguration.headerOrdering}
              lowerOpacityOnTop={false}
              showBadges={true}
              msgs={[
                ...landingExamplesMessages
              ]} />
          </ThemeProvider>
        </S.ChatContainer>
      </section>

      <Footer />

    </S.Main>
  );
};
