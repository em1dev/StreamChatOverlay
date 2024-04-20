import { create, useStore } from 'zustand';

interface TtsVoiceStore  {
  voices: Array<SpeechSynthesisVoice>,
  setVoices: (values: Array<SpeechSynthesisVoice>) => void,
}

export const ttsVoiceStore = create<TtsVoiceStore>()((set) => ({
  voices: [],
  setVoices: (value) => {
    set(() => ({ voices: value }));
  },
}));

export const useTtsVoices = <T>(selector: (state: TtsVoiceStore) => T) => (
  useStore(ttsVoiceStore, selector)
);