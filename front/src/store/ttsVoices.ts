import { create } from 'zustand';


interface TtsVoiceStore  {
  voices: Array<SpeechSynthesisVoice>,
}

export const setTtsVoices = (
  newValue: SpeechSynthesisVoice[] | ((prevValue: SpeechSynthesisVoice[]) => SpeechSynthesisVoice[])
) => {
  useTtsVoiceStore.setState({
    voices: typeof newValue === 'function' ? newValue(useTtsVoiceStore.getState().voices) : newValue
  });
};

export const useTtsVoiceStore = create<TtsVoiceStore>()(() => ({
  voices: [],
}));
