import { useEffect } from 'react';
import { useConfiguration } from '../../../../store/configuration';
import { useTtsVoices } from '../../../../store/ttsVoices';
import * as S from '../../styles';
import { Select } from '../../../../components/Select';

export const ChatVisualizerSettings = () => {
  const { voices, setVoices } = useTtsVoices(state => state);

  const { 
    updateUserConfiguration,
    ...configuration
  } = useConfiguration(state => state);

  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') {
      console.log('speach synthesis is not suported');
      return;
    }

    const onVoicesChange = () => {
      const voices = speechSynthesis.getVoices();
      setVoices(voices);
    };

    onVoicesChange();

    speechSynthesis.addEventListener('voiceschanged', onVoicesChange);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', onVoicesChange);
    };
  }, [setVoices]);

  return (
    <S.FullSection className='flex flex-col gap-2'>
      <h2>Basic configuration</h2>

      <div role="radiogroup">
        <h3 className='mb-2'>Chat Direction</h3>

        <div className='flex gap-5'>
          <button 
            aria-label='left'
            onClick={() => updateUserConfiguration({  chatDirection: 'left' })}
            type='button'
            role='radio'
            className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${configuration.chatDirection === 'left' ? 'bg-[#b9b9b9] text-black' : 'border-[#b9b9b9] border-2 border-solid text-[#b9b9b9]'}
        `}
          >
            <span className="icon-[mingcute--arrow-left-fill]" role="img" aria-hidden="true" />
          </button>

          <button 
            aria-label='right'
            onClick={() => updateUserConfiguration({  chatDirection: 'right' })}
            type='button'
            role='radio'
            className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${configuration.chatDirection === 'right' ? 'bg-[#b9b9b9] text-black' : 'border-[#b9b9b9] border-2 border-solid text-[#b9b9b9]'}
          `}
          >
            <span className="icon-[mingcute--arrow-right-fill]" role="img" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className='flex gap-2 flex-col mt-2'>
        <label 
          htmlFor='config-chat-theme-select'
        >
        Theme
        </label>

        <Select
          id="config-chat-theme-select"
          value={configuration.chatTheme}
          onChange={(e) => {
            updateUserConfiguration({
              chatTheme: e.target.value
            });
          }}
        >
          <option value='1'>Coffee</option>
          <option value='2'>Pato</option>
          <option value='4'>Pink</option>
          <option value='3'>High contrast</option>
        </Select>
      </div>

      <div>
        <h3 className='my-2'>Emotes</h3>

        <div className='flex gap-5 flex-wrap'>

          <div className='flex gap-1 items-center'>
            <button 
              id='config-checkbox-betterttv' 
              type='button'
              aria-labelledby='config-checkbox-bettertv-label'
              aria-checked={configuration.betterTTVEnabled}
              role='checkbox' 
              className='flex items-center' 
              onClick={() => updateUserConfiguration({ betterTTVEnabled : !configuration.betterTTVEnabled })}
            >
              {configuration.betterTTVEnabled ?
                <span className="icon-[mingcute--toggle-right-fill] text-[2em]" role="img" aria-hidden="true" />
                :
                <span className="icon-[mingcute--toggle-left-line] text-[2em]" role="img" aria-hidden="true" />
              }
            </button>

            <S.Label id='config-checkbox-bettertv-label' htmlFor='config-checkbox-betterttv'>BetterTTV</S.Label>
          </div>

          <div className='flex gap-1 items-center'>
            <button 
              id='config-checkbox-franker' 
              type='button'
              aria-labelledby='config-checkbox-franker-label'
              aria-checked={configuration.frankerFaceEnabled}
              role='checkbox' 
              className='flex items-center' 
              onClick={() => updateUserConfiguration({ frankerFaceEnabled : !configuration.frankerFaceEnabled })}
            >
              {configuration.frankerFaceEnabled ?
                <span className="icon-[mingcute--toggle-right-fill] text-[2em]" role="img" aria-hidden="true" />
                :
                <span className="icon-[mingcute--toggle-left-line] text-[2em]" role="img" aria-hidden="true" />
              }
            </button>
            <S.Label id='config-checkbox-franker-label' htmlFor='config-checkbox-franker'>FrankerFaceZ</S.Label>
          </div>


          <div className='flex gap-1 items-center'>
            <button 
              id='config-checkbox-7tv' 
              type='button'
              aria-labelledby='config-checkbox-7tv-label'
              aria-checked={configuration.sevenTVEnabled}
              role='checkbox' 
              className='flex items-center' 
              onClick={() => updateUserConfiguration({ sevenTVEnabled : !configuration.sevenTVEnabled })}
            >
              {configuration.sevenTVEnabled ?
                <span className="icon-[mingcute--toggle-right-fill] text-[2em]" role="img" aria-hidden="true" />
                :
                <span className="icon-[mingcute--toggle-left-line] text-[2em]" role="img" aria-hidden="true" />
              }
            </button>
            <S.Label id='config-checkbox-7tv-label' htmlFor='config-checkbox-7tv'>7TV</S.Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className='my-2'>Text to speech (TTS)</h3>

        <div className='mb-2 flex gap-1 items-center'>
          <button 
            id='config-checkbox-tts' 
            type='button'
            aria-labelledby='config-checkbox-tts-label'
            aria-checked={configuration.isTTSEnabled}
            role='checkbox' 
            className='flex items-center' 
            onClick={() => updateUserConfiguration({ isTTSEnabled : !configuration.isTTSEnabled })}
          >
            {configuration.isTTSEnabled ?
              <span className="icon-[mingcute--toggle-right-fill] text-[2em]" role="img" aria-hidden="true" />
              :
              <span className="icon-[mingcute--toggle-left-line] text-[2em]" role="img" aria-hidden="true" />
            }
          </button>

          <label id='config-checkbox-tts-label' htmlFor='config-checkbox-tts'>Enable TTS</label>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='config-tts-voice'>Voice</label>
          <Select
            id='config-tts-voice'
            value={configuration.ttsConfiguration.selectedVoice}
            onChange={(e) => {
              const newVoice = voices.find(v => v.voiceURI === e.target.value);
              updateUserConfiguration({
                ttsConfiguration: {
                  ...configuration.ttsConfiguration,
                  selectedVoice: newVoice?.voiceURI
                }
              });
            }}
          >
            {
              voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name}</option>
              ))
            }
          </Select>
        </div>

      </div>

    </S.FullSection>
  );
};