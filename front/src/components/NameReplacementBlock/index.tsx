import * as S from './styles';
import { TTSReplacement } from '../../types';
import { useCallback } from 'react';
import { Divider } from '../Divider';
import { IconButton } from '../IconButton';

export interface NameReplacementBlock {
  replacement: TTSReplacement,
  onChange: (value: TTSReplacement) => void,
  onDelete: () => void
}

export const NameReplacementBlock = ({ onChange, onDelete, replacement }: NameReplacementBlock) => {
  const update = useCallback((newValues: Partial<TTSReplacement>) => {

    const newReplacement: TTSReplacement = { 
      ...replacement,
      ...newValues
    };

    onChange(newReplacement);
  }, [replacement, onChange]);

  return (
    <S.Container>

      <S.Header>
        <label htmlFor={`user-replacement-${replacement.id}-regex`}>
        Chatter name
        </label>
        <IconButton type='close' onClick={onDelete} />
      </S.Header>

      <input
        id={`user-replacement-${replacement.id}-regex`}
        value={replacement.regex}
        onChange={(e) => {update({ regex: e.target.value });}}
      />

      <Divider />

      <label htmlFor={`user-replacement-${replacement.id}-replaceWith`}>Replace with</label>
      <input
        id={`user-replacement-${replacement.id}-replaceWith`}
        value={replacement.replaceWith}
        onChange={(e) => { update({ replaceWith: e.target.value });}}
      />

    </S.Container>
  );

};