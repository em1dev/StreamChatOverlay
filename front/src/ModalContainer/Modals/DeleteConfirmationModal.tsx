import { Button } from '@/components/Button';
import { useStore } from '@/store';
import { setChatToDelete } from '@/store/actions/pageActions';
import { removeChat } from '@/store/actions/chatActions';
import { chatApi } from '@/api/chatApi';

export const DeleteConfirmationModal = () => {
  const session = useStore(s => s.session);
  const toDelete = useStore(c => c.chatToDelete);

  const onCancel = () => {
    setChatToDelete(null);
  };

  const onConfirmDelete = async () => {
    if (!toDelete) return;
    if (!session) return;

    const result = await chatApi.deleteChat(session.token, toDelete.chatId);
    if (result.hasError) return;

    await removeChat(toDelete.chatId);
    setChatToDelete(null);
  };

  return (
    <div>
      <header>
        <h1>
          Are you sure you want to delete <i>{toDelete?.name}</i> ?
        </h1>

      </header>

      <p>
        You won't be able to recover these settings
      </p>

      <footer>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirmDelete}>Yes, Delete</Button>
      </footer>
    </div>
  );
};
