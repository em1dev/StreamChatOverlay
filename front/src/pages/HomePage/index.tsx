import { useEffect, useState } from 'react';
import * as S from './styles';
import { useDebounce } from '@uidotdev/usehooks';
import { elPatoApi } from '../../api/elpatoApi';
import { UserInformation } from '../../api/elpatoApi/types';
import { ChatVisualizerSettings } from './Settings/ChatVisualizerSettings.ts/index.tsx';
import { useConfiguration } from '../../store/configuration.ts';
import { ConfigurationSection } from './ConfigurationSection.ts';
import { SideBar } from './SideBar/index.tsx';
import { ChatSection } from './ChatSection/index.tsx';
import { TTSSettings } from './Settings/TTSSettings/index.tsx';
import { UserReplacementSettings } from './Settings/UserReplacementSettings.ts/index.tsx';
import { IgnoredUserSection } from './Settings/IgnoredUserSection/index.tsx';

const HomePage = () => {
  const [selectedConfiguration, setSelectedConfiguration] = useState<ConfigurationSection>(ConfigurationSection.ChatVisual);

  const [channelDetails, setChannelDetails] = useState<UserInformation | null>(null);
  const channelId = useConfiguration(state => state.channelId);
  const channelName = useConfiguration(state => state.channelName);
  const udpateConfiguration = useConfiguration(state => state.updateUserConfiguration);
  const [channel, setChannel] = useState<string>(channelName);
  const debouncedChannel = useDebounce(channel, 500);

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await elPatoApi.getUserDetails(debouncedChannel);
      if (!user.data) return;
      setChannelDetails(user.data);
      udpateConfiguration({ channelId: user.data.id, channelName: user.data.login });
    };

    getUserDetails();
  }, [debouncedChannel, udpateConfiguration]);

  return (
    <S.Page>

      <S.GlobalStyles />

      <ChatSection channelInformation={channelDetails} />

      <S.SettingsContainer>

        <S.SettingSectionCard>
          <S.InputSection>
            <h1>Channel</h1>
            <S.TextInput
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              placeholder="Nombre de twitch"
            />
          </S.InputSection>
          { channelId && (
            <S.Info>You can copy the url into a obs source to render a chat overlay</S.Info>
          )}
        </S.SettingSectionCard>

        <div className='flex flex-row flex-1 gap-2 overflow-auto'>
          <SideBar
            onChange={setSelectedConfiguration}
            selectedSection={selectedConfiguration}
          />

          { selectedConfiguration === ConfigurationSection.ChatVisual && (
            <S.ChatSettings>
              <ChatVisualizerSettings />
            </S.ChatSettings>
          )}

          { selectedConfiguration === ConfigurationSection.TTS && (
            <S.ChatSettings>
              <TTSSettings />
            </S.ChatSettings>
          )}

          { selectedConfiguration === ConfigurationSection.NameReplacement && (
            <S.ChatSettings>
              <UserReplacementSettings />
            </S.ChatSettings>
          )}

          { selectedConfiguration === ConfigurationSection.IgnoredUsers && (
            <S.ChatSettings>
              <IgnoredUserSection />
            </S.ChatSettings>
          )}
        </div>

      </S.SettingsContainer>
    </S.Page>
  );
};

export default HomePage;