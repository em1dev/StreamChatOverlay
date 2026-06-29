import { Connection } from '@/api/chatApi/types';
import { Icon } from '@iconify/react';
import { ToggleInput } from '@/components/core/ToggleInput';
import { LiveServiceIcon } from '@/components/core/LiveServiceIcon';
import * as S from './styles';


export interface ConnectionItemProps {
  enabled: boolean,
  onEnabledChanged: (type: Connection['type'], value: boolean) => void,
  isLoading: boolean,
  type: Connection['type'],
  existingConnection?: Connection,
  onDeleteConnection: (type: Connection['type']) => void
  onNewConnection: (type: Connection['type']) => void
}

export const ConnectionItem = ({
  isLoading,
  type,
  existingConnection,
  enabled,
  onDeleteConnection,
  onNewConnection,
  onEnabledChanged
}: ConnectionItemProps) => {
  if (isLoading) return (
    <S.Loading>
      <S.PlaceholderImage />
      <div>
        <ToggleInput isChecked={enabled} onChange={() => { }} >
          Loading...
        </ToggleInput>

        <S.TypeLabel>
          <LiveServiceIcon type={type} />
          { type }
        </S.TypeLabel>
      </div>
    </S.Loading>
  );

  if (!existingConnection) return (
    <S.ConnectButton disabled={isLoading} onClick={() => onNewConnection(type)}>
      <LiveServiceIcon type={type} />
      Connect to
      <span style={{ textTransform: 'capitalize' }}>
        {type}
      </span>
    </ S.ConnectButton>
  );

  return (
    <S.Container>
      <img width={80} height={80} src={existingConnection.profilePictureUrl} alt="profile"></img>
      <div>
        <ToggleInput isChecked={enabled} onChange={(v) => onEnabledChanged(type, v)} >
          { existingConnection.displayName }
        </ToggleInput>

        <S.TypeLabel>
          <LiveServiceIcon type={type} />
          { existingConnection.type }
        </S.TypeLabel>
      </div>
      <button title={`delete ${type} connection`} disabled={isLoading} onClick={() => onDeleteConnection(type)}>
        <Icon aria-hidden icon="mingcute:close-fill" />
      </button>
    </S.Container>
  );
};
