import { useStore } from '@/store';
import { DeleteConfirmationModal } from './Modals/DeleteConfirmationModal';
import { RenameChatModal } from './Modals/RenameChatModal';
import * as S from './styles';


export const ModalContainer = () => {
  const chatToRename = useStore(s => s.chatToRename);
  const chatToDelete = useStore(s => s.chatToDelete);

  const nothingToShow = !chatToDelete && !chatToRename;
  if (nothingToShow) return null;

  return (
    <S.Container>
      {chatToRename && ( <RenameChatModal /> )}
      {chatToDelete && ( <DeleteConfirmationModal /> )}
    </S.Container>
  );
};
