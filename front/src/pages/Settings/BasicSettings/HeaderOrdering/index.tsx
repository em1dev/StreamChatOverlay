import { Icon } from '@iconify/react';
import { updateUserConfiguration } from '@/store/configurationStore/actions';
import { useConfigurationStore } from '@/store/configurationStore';
import { ChatMessageHeaderType } from '@/types/userConfigurationTypes';
import { Fragment } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';
import { ToggleInput } from '@/components/ToggleInput';
import { MessagePreview } from '@/components/MessagePreview';

import * as S from './styles';


const headerTypeToDisplayName: Record<ChatMessageHeaderType, string> = {
  'badges': 'Badges',
  'name': 'User Name',
  'pronouns': 'Pronouns'
};

export const HeaderOrdering = () => {
  const showChatterBadges = useConfigurationStore(c => c.userConfiguration.showChatterBadges);
  const ordering = useConfigurationStore(c => c.userConfiguration.headerOrdering);

  const onSwitchRight = useCallback((index: number) => {
    const newOrder = [...ordering];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    updateUserConfiguration({
      headerOrdering: newOrder
    });
  }, [ordering]);

  return (
    <section>
      <h2>Message Header</h2>

      <MessagePreview message={landingExamplesMessages[3]} />

      <ToggleInput
        isChecked={showChatterBadges}
        onChange={(value) => { updateUserConfiguration({ showChatterBadges: value }); }}
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
