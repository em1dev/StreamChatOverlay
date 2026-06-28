import { Button } from '@/components/Button';
import { useStore } from '@/store';
import { setChatToDelete } from '@/store/actions/pageActions';
import { deleteChat } from '@/store/actions/settingsActions';

export const DeleteConfirmationModal = () => {

  const toDelete = useStore(c => c.chatToDelete);

  const onCancel = () => {
    setChatToDelete(null);
  };

  const onConfirmDelete = async () => {
    if (!toDelete) return;
    await deleteChat(toDelete.chatId);
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
