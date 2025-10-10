import Chat from '@/components/ChatVisualizerCore';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';
import { ThemeProvider } from 'styled-components';
import { useAuth } from '@/context/authContext/useAuth';
import { useNavigate } from 'react-router';
import { useChatTheme } from '@/hooks/useChatTheme';
import { ThemePicker } from '@/components/ThemePicker';

import * as S from './styles';

export const Landing = () =>
{
  const navigate = useNavigate();
  const { session, signIn } = useAuth();
  const chatTheme = useChatTheme();

  return (
    <S.Main>
      <section>
        <div>
          <div>
            <h1>Stream Chat Overlay</h1>
            <p>Configurable and themable with chatter pronouns</p>
          </div>

          <div>
            <h2>Features</h2>
            <ul>
              <li>100% Free and open source</li>
              <li>Text to speech support</li>
              {/*
              <li>Color customization</li>
              <li>Font and size customization</li>
              */}
              <li>BetterTTV, FFZ and 7TV integration</li>
              {/*
              <li>5 Beatiful preconfigured themes</li>
              */}
              <li>Pronoun support via pronouns.alejo</li>
            </ul>
          </div>

          <ThemePicker label='Theme preview' />

          <S.CTAContainer>

            { !session ? (
              <button onClick={signIn}>
                Log in
              </button>
            ): (
              <button onClick={() => { navigate('settings'); }}>
                Go to settings
              </button>
            )}

            <a target='_blank' href='https://ko-fi.com/emydev'>
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
            <Chat msgs={[
              ...landingExamplesMessages
            ]} />
          </ThemeProvider>
        </S.ChatContainer>
      </section>

    </S.Main>
  );
};