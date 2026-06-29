import { useStore } from '..';

export const setTtsVoices = (
  newValue: SpeechSynthesisVoice[] | ((prevValue: SpeechSynthesisVoice[]) => SpeechSynthesisVoice[])
) => {
  useStore.setState({
    voices: typeof newValue === 'function'
      ? newValue(useStore.getState().voices)
      : newValue
  });
};
