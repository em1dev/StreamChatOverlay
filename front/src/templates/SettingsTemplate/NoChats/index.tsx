import { Button } from '@/components/core/Button';
import { Icon } from '@iconify/react';
import { useStore } from '@/store';
import { addChat } from '@/store/actions/chatActions';
import { chatApi } from '@/api/chatApi';
import * as S from './styles';


export const NoChats = () => {
  const session = useStore(s => s.session);

  const onChatCreate = async () => {
    if (!session) return;
    const resp = await chatApi.createChat(session.token, 'Main chat');
    if (!resp.data) return;
    addChat(resp.data);
  };

  return (
    <S.Container>
      <Icon aria-hidden fontSize="1.5em" icon="mingcute:chat-1-line" />
      <h1>No Chat Settings</h1>
      <Button onClick={onChatCreate}>
        <Icon aria-hidden icon="mingcute:add-fill" />
        Create chat
      </Button>
    </S.Container>
  );
};
