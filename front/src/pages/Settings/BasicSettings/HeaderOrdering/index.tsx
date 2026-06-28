import { Icon } from '@iconify/react';
import { ChatMessageHeaderType } from '@/types/settingsTypes';
import { Fragment } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';
import { ToggleInput } from '@/components/ToggleInput';
import { MessagePreview } from '@/components/MessagePreview';

import * as S from './styles';
import { useChatSettings } from '@/store';
import { updateChatSettings } from '@/store/actions/settingsActions';


const headerTypeToDisplayName: Record<ChatMessageHeaderType, string> = {
  'badges': 'Badges',
  'name': 'User Name',
  'pronouns': 'Pronouns'
};

export const HeaderOrdering = () => {
  const showChatterBadges = useChatSettings(c => c.showChatterBadges);
  const ordering = useChatSettings(c => c.headerOrdering);

  const onSwitchRight = useCallback((index: number) => {
    const newOrder = [...ordering];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    updateChatSettings({
      headerOrdering: newOrder
    });
  }, [ordering]);

  return (
    <section>
      <h2>Message Header</h2>

      <MessagePreview message={landingExamplesMessages[3]} />

      <ToggleInput
        isChecked={showChatterBadges}
        onChange={(value) => { updateChatSettings({ showChatterBadges: value }); }}
      >
        Show chatter badges
      </ToggleInput>

      <S.HeaderOrderingContainer>
        {
          ordering.map((item, index) => (
            <Fragment key={item}>
              <div>{ headerTypeToDisplayName[item] }</div>
              {index != ordering.length - 1  && (
                <button
                  aria-label={`switch ${headerTypeToDisplayName[item]} with ${headerTypeToDisplayName[ordering[index + 1]]}`}
                  type='button'
                  onClick={() => onSwitchRight(index)}
                >
                  <Icon icon="cuida:swap-horizontal-arrows-outline" />
                </button>
              )}
            </Fragment>
          ))
        }
      </S.HeaderOrderingContainer>
    </section>
  );
};
