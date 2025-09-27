import { Icon } from '@iconify/react';
import * as S from './styles';
import { SettingsTemplate } from '@/templates/SettingsTemplate';

export const AddToStream = () => 
{

  return (
    <SettingsTemplate>
      <h1>Add chat overlay to stream</h1>

      <S.ClickToCopyBtn type='button'>
        Click to copy the magic link
      </S.ClickToCopyBtn>

      <S.WarningContainer>
        <div>
          <Icon aria-hidden icon="mingcute:alert-fill" />
        </div>
        <div>
          <p>The magic link contains your credential information</p>
          <p>This link should not be shared with anyone or exposed to your stream</p>
          <p>In the case of leaking the magic link. Generate a new magic link to destroy the old one.</p>
          <button>Generate new magic link</button>
        </div>
      </S.WarningContainer>

      <S.StepContainer>
        <p>Step 1</p>
        <p>Copy the url by clicking the box above</p>
      </S.StepContainer>

      <S.StepContainer>
        <p>Step 2</p>
        <p>Create a browser source in OBS</p>
        <img width={500} src="/img/step2.png" />
      </S.StepContainer>

      <S.StepContainer>
        <p>Step 3</p>
        <p>Paste the magic link on the url box.</p>
        <p>Set the width and height to what size you want the chat to be.</p>
        <p>For example I use 900x400</p>
        <img width={500} src="/img/step3.png" />
      </S.StepContainer>

      <S.StepContainer>
        <p>Step 4</p>
        <p>All done, your chat should be working now</p>
        <p>Remember to refresh your browser source after changing any settings</p>
      </S.StepContainer>

    </SettingsTemplate>
  );

};