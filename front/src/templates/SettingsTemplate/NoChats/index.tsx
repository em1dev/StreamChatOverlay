import { Button } from '@/components/Button';
import { Icon } from '@iconify/react';
import { createChat } from '@/store/actions/settingsActions';
import * as S from './styles';


export const NoChats = () => {
  const onCreate = async () => {
    await createChat();
  };

  return (
    <S.Container>
      <Icon aria-hidden fontSize="1.5em" icon="mingcute:chat-1-line" />
      <h1>No Chat Settings</h1>
      <p>Create a chat settings to begin</p>
      <Button onClick={onCreate}>
        <Icon aria-hidden icon="mingcute:add-fill" />
        Create chat settings
      </Button>
    </S.Container>
  );
};
