import { useConfiguration } from '../../../store/configuration';
import * as S from '../styles';

export const ChatVisualizerSettings = () => {
  const { 
    updateUserConfiguration,
    ...configuration
  } = useConfiguration(state => state);

  return (
    <S.FullSection>
      <S.InputSection>

        <h2>Chat Visualizer Settings</h2>

        <h2>Direction</h2>

        <S.DirectionContainer>
          <S.RowGroup>
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
          </S.RowGroup>

          <S.RowGroup>
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
          </S.RowGroup>
        </S.DirectionContainer>
      </S.InputSection>

      <S.InputSection>

        <h2>Emotes</h2>

        <S.RowGroup>
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
        </S.RowGroup>

        <S.RowGroup>
          <S.Checkbox 
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
        </S.RowGroup>

        <S.RowGroup>
          <S.Checkbox
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
        </S.RowGroup>

        <h2>Ignored Users</h2>
        {
          configuration.ignoredUsers
            .map((value) => (
              <S.InputWithButtonContainer
                key={value.id}
              >
                <S.TextInput
                  title='ignored user'
                  value={value.value}
                  onChange={(e) => (
                    updateUserConfiguration({
                      ignoredUsers: [
                        ...configuration.ignoredUsers.map(user => user.id === value.id 
                          ? { id: value.id, value: e.target.value }
                          : user),
                      ]
                    })
                  )}
                />
                <button title='remove ignored user'
                  onClick={() => (updateUserConfiguration({
                    ignoredUsers: configuration.ignoredUsers.filter(user => user.id !== value.id)
                  }))}>
                  <img src='img/close.svg'></img>
                </button>
              </S.InputWithButtonContainer>
            ))
        }
        <S.AddBtn 
          title='Add a new ignored user'
          onClick={() => {
            updateUserConfiguration({
              ignoredUsers: [
                ...configuration.ignoredUsers,
                {
                  id: crypto.randomUUID(),
                  value: ''
                }
              ]
            });
          }} >
          <img width={20} height={20} src='img/add.svg'></img>
        </S.AddBtn>
      </S.InputSection>
    </S.FullSection>
  );
};