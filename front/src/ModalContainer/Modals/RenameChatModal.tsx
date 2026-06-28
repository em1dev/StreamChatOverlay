import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useStore } from '@/store';
import { setChatToRename } from '@/store/actions/pageActions';
import { renameChat } from '@/store/actions/settingsActions';
import { useEffect, useState } from 'react';


export const RenameChatModal = () => {
  const [title, setTitle] = useState<string>('');
  const chatToRename = useStore(s => s.chatToRename);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(chatToRename?.name ?? '');
  }, [chatToRename]);

  const onSave = async () => {
    if (!chatToRename) return;
    await renameChat(chatToRename.chatId, title);
  };

  const onCancel = () => {
    setTitle('');
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
        value={title}
        maxLength={20}
        onChange={(e) => setTitle(e.target.value)}
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
