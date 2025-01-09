import { useEffect } from 'react';
import { useConfiguration } from '../../../store/configuration';
import { useTtsVoices } from '../../../store/ttsVoices';
import * as S from '../styles';
import { Select } from '../../../components/Select';

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
    <S.FullSection>

      <h2 className='mb-2'>Chat Direction</h2>

      <div className='flex gap-5'>
        <div className='flex gap-1'>
          <S.Radio
            id="config-radio-direction-left"
            type="radio"
            name="direction"
            checked={configuration.chatDirection === 'left'}
            onChange={(e) => {
              if (e.target.checked) {
                updateUserConfiguration({ chatDirection: 'left' });
              }
            }}
          />
          <S.Label htmlFor="config-radio-direction-left" >Left</S.Label>
        </div>

        <div className='flex gap-1'>
          <S.Radio
            id="config-radio-direction-right"
            type="radio"
            name="direction"
            checked={configuration.chatDirection === 'right'}
            onChange={(e) => {
              if (e.target.checked) {
                updateUserConfiguration({ chatDirection: 'right' });
              }
            }}
          />
          <S.Label htmlFor="config-radio-direction-right">Right</S.Label>
        </div>
      </div>


      <h2 className='my-2'>Emotes</h2>

      <div className='flex gap-1'>
        <S.Checkbox
          id='config-checkbox-betterttv'
          type='checkbox'
          checked={configuration.betterTTVEnabled}
          onChange={(e) => {
            updateUserConfiguration({
              betterTTVEnabled: e.target.checked
            });
          }}
        />
        <S.Label htmlFor='config-checkbox-betterttv'>BetterTTV</S.Label>
      </div>

      <div className='flex gap-1'>
        <S.Checkbox 
          disabled
          id='config-checkbox-franker'
          type='checkbox'
          checked={configuration.frankerFaceEnabled}
          onChange={(e) => {
            updateUserConfiguration({
              frankerFaceEnabled: e.target.checked
            });
          }}
        />
        <S.Label  htmlFor='config-checkbox-franker'>FrankerFaceZ</S.Label>
      </div>

      <div className='flex gap-1'>
        <S.Checkbox
          disabled
          id='config-checkbox-7tv'
          type='checkbox'
          checked={configuration.sevenTVEnabled}
          onChange={(e) => {
            updateUserConfiguration({
              sevenTVEnabled: e.target.checked
            });
          }}
        />
        <S.Label htmlFor='config-checkbox-7tv'>7TV</S.Label>
      </div>

      <h2 className='my-2'>TTS Settings</h2>

      <div className='mb-2 flex gap-1 items-center'>
        <S.Checkbox
          id='config-checkbox-ttsenabled'
          type='checkbox'
          checked={configuration.isTTSEnabled}
          onChange={(e) => {
            updateUserConfiguration({
              isTTSEnabled: e.target.checked
            });
          }}
        />
        <label htmlFor='config-checkbox-ttsenabled'>Enable TTS</label>
      </div>

      <Select
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

    </S.FullSection>
  );
};