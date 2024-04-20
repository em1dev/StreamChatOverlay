import { useCallback } from 'react';
import { TTSReplacement } from '../../types';
import * as S from './styles';
import { Divider } from '../Divider';
import { IconButton } from '../IconButton';


export interface TTSReplacementBlockProps {
  replacement: TTSReplacement,
  onChange: (replacement: TTSReplacement) => void,
  onDelete: () => void,
  canAddSubReplacement: boolean,
}

export const TTSReplacementBlock = ({ replacement, onChange, onDelete, canAddSubReplacement }: TTSReplacementBlockProps) => {

  const update = useCallback((newValues: Partial<TTSReplacement>) => {

    const newReplacement: TTSReplacement = { 
      ...replacement,
      ...newValues
    };

    onChange(newReplacement);
  }, [replacement, onChange]);

  return (
    <S.Container>
      <IconButton style={{ marginLeft: 'auto' }} type='close' onClick={onDelete} />

      <S.MultiLabelContainer>
        <label htmlFor={`replacement-${replacement.id}-regex`} >Regex</label>
        <label htmlFor={`replacement-${replacement.id}-regexFlags`} >Flags</label>
      </S.MultiLabelContainer>
      <S.RegexInputContainer>
        <input
          id={`replacement-${replacement.id}-regex`}
          value={replacement.regex} 
          onChange={(e) => {
            update({ regex: e.target.value });
          }}
        />
        <input
          id={`replacement-${replacement.id}-regexFlags`}
          value={replacement.regexFlags}
          onChange={(e) => {
            update({ regexFlags: e.target.value });
          }}
        />
      </S.RegexInputContainer>

      <S.CheckboxContainer>
        <input
          id={`replacement-${replacement.id}-replaceFullMsg`}
          type='checkbox'
          checked={!!replacement.replaceFullMessage}
          onChange={(e) => {
            update({ replaceFullMessage: e.target.checked });
          }}
        />
        <label htmlFor={`replacement-${replacement.id}-replaceFullMsg`}>
          Replace full message
        </label>
      </S.CheckboxContainer>

      <Divider />

      <label htmlFor={`replacement-${replacement.id}-replacementWith`}>
        Replace with (blank if you want to remove it)
      </label>
      <input
        id={`replacement-${replacement.id}-replacementWith`}
        value={replacement.replaceWith}
        onChange={(e) => {update({ replaceWith: e.target.value });}}
      />

      <Divider />

      <label htmlFor={`replacement-${replacement.id}-description`}>Description</label>
      <input
        id={`replacement-${replacement.id}-description`}
        value={replacement.description}
        onChange={(e) => { update({ description: e.target.value });}}
      />

      { replacement.replacement && (
        <TTSReplacementBlock 
          canAddSubReplacement={false}
          replacement={replacement.replacement}
          onChange={(newR) => {
            update({ replacement: newR });
          }}
          onDelete={() => {
            update({ replacement: undefined });
          }}
        />
      )}

      { !replacement.replacement && canAddSubReplacement && (
        <S.AddSubReplacementBtn onClick={() =>
          update({
            replacement: {
              description: '',
              id: crypto.randomUUID(), // get a random id,
              ordinal: 0,
              regex: '',
              regexFlags: '',
              replaceWith: '',
              replaceFullMessage: false,
            }
          })
        } >
          Add sub replacement
        </S.AddSubReplacementBtn>
      )}
    </S.Container>
  );
};