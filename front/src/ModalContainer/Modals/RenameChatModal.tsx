import { Button } from '@/components/core/Button';
import { Input } from '@/components/core/Input';
import { useStore } from '@/store';
import { setChatToRename } from '@/store/actions/pageActions';
import { setChatName } from '@/store/actions/chatActions';
import { useEffect, useState } from 'react';
import { chatApi } from '@/api/chatApi';


export const RenameChatModal = () => {
  const session = useStore(s => s.session);
  const chatToRename = useStore(s => s.chatToRename);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(chatToRename?.name ?? '');
  }, [chatToRename]);

  const onSave = async () => {
    if (!chatToRename) return;
    if (!session) return;

    const result = await chatApi.updateChatName(
      chatToRename.chatId,
      name,
      session.token
    );

    if (result.hasError) return;

    setChatName(chatToRename.chatId, name);
    setChatToRename(null);
  };

  const onCancel = () => {
    setName('');
    setChatToRename(null);
  };

  return (
    <div>
      <header>
        <h1>Chat</h1>
      </header>

      <label htmlFor='chat-rename-input'>
        Name
      </label>
      <Input
        id='chat-rename-input'
        value={name}
        maxLength={20}
        onChange={(e) => setName(e.target.value)}
      />

      <footer>
        <Button
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
        >
          Save
        </Button>
      </footer>
    </div>
  );
};
