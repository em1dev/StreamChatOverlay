import { useEffect, useState } from "react";
import Chat from "../../components/chat";
import { testMessages } from "../../examples";
import { ChatMessageData } from "../../types";
import { pickRandom } from "../../utils/randomUtils";
import * as S from './styles';

const HomePage = () => {
  const [messages, setMessages] = useState<Array<ChatMessageData>>([]);
  const [channel, setChannel] = useState<string>('');

  useEffect(() => {
    const onInterval = () => {
      setMessages((prevMessages) => (
        [...prevMessages, {
          ...pickRandom(testMessages),
          id: `${Math.random()}`
        }].splice(-10)
      ));
    };
    const intervalRef = setInterval(onInterval, 1000);

    return () => { clearInterval(intervalRef) };
  }, []);

  return (
    <S.Page>
      <S.GlobalStyles />
      <h1>El Pato Chat</h1>
      <h2>Twitch chat overlay con pronombres</h2>
      <S.ChatContainer>
        <Chat msgs={messages} />
      </S.ChatContainer>
      <S.Input value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="Nombre de twitch" />
      <div>http://localhost:3080/#{channel}</div>
      <div>Copia este link en OBS como browser source</div>
    </S.Page>
  );
}

export default HomePage;