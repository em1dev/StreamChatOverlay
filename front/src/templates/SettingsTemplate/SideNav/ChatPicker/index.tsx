import { Icon } from '@iconify/react';
import { DropdownButton } from './DropdownButton';
import { useEffect, useRef, useState } from 'react';
import { Divider } from '@/components/core/Divider';
import { useStore } from '@/store';
import { addChat, setActiveChat } from '@/store/actions/chatActions';
import { setChatToDelete, setChatToRename } from '@/store/actions/pageActions';
import { chatApi } from '@/api/chatApi';
import * as S from './styles';
import { Button } from '@/components/core/Button';


const MAX_ITEMS = 10;

export const ChatPicker = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeChat = useStore(s => s.activeChat);
  const session = useStore(s => s.session);
  const chats = useStore(s => s.chats);
  const [isOpen, setIsOpen] = useState(false);

  const maxItemsReached = chats.length >= MAX_ITEMS;

  const onBtnClick = () => {
    setIsOpen(v => !v);
  };

  const onItemSelect = (id: number) => {
    setIsOpen(false);
    setActiveChat(id);
  };

  const onItemDelete = (id: number) => {
    setChatToDelete(id);
  };

  const onItemEdit = (id: number) => {
    setIsOpen(false);
    setChatToRename(id);
  };

  const onChatCreate = async () => {
    if (!session) return;
    const count = chats.length;
    const name = count == 0 ? 'Main chat' : `Chat ${count + 1}`;
    const resp = await chatApi.createChat(session.token, name);
    if (!resp.data) return;
    addChat(resp.data);
    setActiveChat(resp.data.id);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onClickBody = (e:PointerEvent) => {
      if (!e.target) return;
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', onClickBody);
    return () => {
      document.removeEventListener('click', onClickBody);
    };
  }, [isOpen]);

  return (
    <S.Container ref={containerRef}>
      <DropdownButton
        isOpen={isOpen}
        label={activeChat?.metadata.name ?? ''}
        onClick={onBtnClick}
      />

      <S.Menu $isOpen={isOpen}>
        {
          chats
            .sort((a,b) => a.id - b.id)
            .map(m => (
              <S.MenuSelectItem key={m.id} >
                <Button $variant='ghost' onClick={() => onItemSelect(m.id)}>
                  {m.id == activeChat?.metadata.id && (
                    <Icon aria-hidden icon="mingcute:right-fill" />
                  )}
                  <span>
                    {m.name}
                  </span>
                </Button>
                <Button $size='normal' $variant='ghost' title='edit' onClick={() => onItemEdit(m.id)}>
                  <Icon aria-hidden icon='mingcute:pencil-line' />
                </Button>
                <Button $size='normal' $variant='ghost' title='delete' onClick={() => onItemDelete(m.id)}>
                  <Icon aria-hidden icon="mingcute:delete-2-line" />
                </Button>
              </S.MenuSelectItem>
            ))
        }
        <Divider />
        { !maxItemsReached && (
          <S.MenuButton
            $variant='ghost'
            disabled={maxItemsReached}
            onClick={onChatCreate}
          >
            <Icon icon="mingcute:add-fill" />
            New chat
          </S.MenuButton>
        )}
      </S.Menu>
    </S.Container>
  );
};
