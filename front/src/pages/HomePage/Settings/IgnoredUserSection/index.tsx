import { useConfiguration } from '../../../../store/configuration';
import * as S from '../../styles';

export const IgnoredUserSection = () => {
  const { 
    updateUserConfiguration,
    ...configuration
  } = useConfiguration(state => state);

  return (
    <S.FullSection className='flex flex-col gap-2'>

      <h2 className='mb-2'>Ignored Users</h2>
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
    </S.FullSection>
  );
};