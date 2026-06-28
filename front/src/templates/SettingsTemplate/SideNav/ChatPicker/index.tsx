import { Icon } from '@iconify/react';
import { IconButton } from '@/components/IconButton';
import { DropdownButton } from './DropdownButton';
import { useEffect, useRef, useState } from 'react';
import { Divider } from '@/components/Divider';
import { useStore } from '@/store';
import { createChat, setActiveChat } from '@/store/actions/settingsActions';
import { setChatToDelete, setChatToRename } from '@/store/actions/pageActions';
import * as S from './styles';


const MAX_ITEMS = 10;

export const ChatPicker = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeChat = useStore(s => s.activeChat);
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
                <button onClick={() => onItemSelect(m.id)}>
                  {m.id == activeChat?.metadata.id && (
                    <Icon aria-hidden icon="mingcute:right-fill" />
                  )}
                  {m.name}
                </button>
                <IconButton title='edit' onClick={() => onItemEdit(m.id)}>
                  <Icon aria-hidden icon='mingcute:pencil-line' />
                </IconButton>
                <IconButton title='delete' onClick={() => onItemDelete(m.id)}>
                  <Icon aria-hidden icon="mingcute:delete-2-line" />
                </IconButton>
              </S.MenuSelectItem>
            ))
        }
        <Divider />
        { !maxItemsReached && (
          <S.MenuButton disabled={maxItemsReached} onClick={createChat}>
            <Icon icon="mingcute:add-fill" />
            New configuration
          </S.MenuButton>
        )}
      </S.Menu>
    </S.Container>
  );
};
