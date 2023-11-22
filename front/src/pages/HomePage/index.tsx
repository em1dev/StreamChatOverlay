import { useEffect, useState } from "react";
import Chat from "../../components/chat";
import { testMessages } from "../../examples";
import { ChatMessageData } from "../../types";
import { pickRandom } from "../../utils/randomUtils";
import * as S from './styles';
import { ChatConfiguration, defaultChatConfiguration } from "../../hooks/useChatConfig";
import ClickToCopy from "../../components/ClickToCopy";

const HomePage = () => {
  const [messages, setMessages] = useState<Array<ChatMessageData>>([]);
  const [channel, setChannel] = useState<string>('');
  const [chatConfig, setChatConfig] = useState<ChatConfiguration>(defaultChatConfiguration);

  useEffect(() => {
    const onInterval = () => {
      setMessages((prevMessages) => (
      [
        { ...pickRandom(testMessages), id: `${Math.random()}` },
        ...prevMessages
      ].splice(0, 10)
      ));
    };
    const intervalRef = setInterval(onInterval, 1000);

    return () => { clearInterval(intervalRef) };
  }, []);

  const url = `${window.location.href}?direction=${chatConfig.direction}#${channel}`;

  return (
    <S.Page>
      <S.GlobalStyles />
      <h1>El Pato Chat</h1>
      <h2>Twitch chat overlay con pronombres</h2>
      <S.ChatContainer>
          <Chat msgs={messages} config={chatConfig} />
      </S.ChatContainer>
      <S.Input value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="Nombre de twitch" />

      <S.SettingsContainer>
        <ClickToCopy content={url} />
        <div>Copia este link en OBS como browser source</div>
        <div>
          <S.Input 
            onClick={() => setChatConfig((prev) => ({...prev, direction: 'left'}))}
            defaultChecked={chatConfig.direction === 'left'}
            id="left" type="radio" name="direction" />
          <S.Label htmlFor="left">Left</S.Label>

          <S.Input 
            onClick={() => setChatConfig((prev) => ({...prev, direction: 'right'}))}
            defaultChecked={chatConfig.direction === 'right'}
            id="right" type="radio" name="direction" />
          <S.Label htmlFor="right">Right</S.Label>

        </div>
      </S.SettingsContainer>
    </S.Page>
  );
}

export default HomePage;