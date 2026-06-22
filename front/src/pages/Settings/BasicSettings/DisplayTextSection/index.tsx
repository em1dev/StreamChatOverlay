import { Input } from '@/components/Input';
import { MessagePreview } from '@/components/MessagePreview';
import { useAuth } from '@/context/authContext/useAuth';
import { chatUsers } from '@/examples/users';
import { useConfiguration } from '@/store/configuration';
import { ChatMessageData } from '@/types';
import { variableReplacementEngine } from '@/utils/variableReplacementEngine';

const buildReplyMsg = (redeemText: string):ChatMessageData =>  ({
  ...chatUsers.emy,
  id: 'reply_message',
  emoteOffsets: new Map(),
  effect: 'normal',
  isCommand: false,
  isFromBot: false,
  messageParts: [
    {
      content: variableReplacementEngine.applyVariables(
        redeemText,
        redeemText,
        chatUsers.emy.userDisplayName,
        '@bulbsum',
        'i believe cows are the real deal'
      ),
      originalContent: redeemText,
      type: 'reply'
    },
    {
      content: 'totally agree',
      originalContent: 'totally agree',
      type: 'text'
    },
    {
      content: 'emotesv2_4e1c5651219a462894aefa8b6720efc5',
      originalContent: '',
      type: 'emote',
    },
  ],
  sentAt: 0,
});

const buildRedeemMsg = (redeemText: string):ChatMessageData =>  ({
  ...chatUsers.emy,
  id: 'redeem_message',
  emoteOffsets: new Map(),
  effect: 'normal',
  isCommand: false,
  isFromBot: false,
  messageParts: [
    {
      content: '160401',
      originalContent: 'PunOko',
      type: 'emote',
    },
    {
      content: 'drink your water!',
      originalContent: 'drink your water!',
      type: 'text'
    },
    {
      content: redeemText,
      originalContent: redeemText,
      type: 'redeption'
    },
  ],
  sentAt: 0,
});

export const DisplayTextSection = () => {
  const { session } = useAuth();
  const replyLabel = useConfiguration(c => c.userConfiguration.replyLabel);
  const redemptionLabel = useConfiguration(c => c.userConfiguration.redemptionLabel);
  const updateConfig = useConfiguration(state => state.updateUserConfiguration);

  return (
    <section>
      <h2>Customize labels</h2>

      <label htmlFor='user-configuration-reply-label-input'>
        Reply label
      </label>
      <p>$replyTo will be replaced with the username who is being replied to</p>
      <p>$shortParentMsg will be replaced with the content of the message replied to shortened to 5 characters</p>
      <Input
        id='user-configuration-reply-label-input'
        value={replyLabel}
        onChange={(e) => (
          updateConfig({ replyLabel: e.target.value }, session)
        )}
      />
      <MessagePreview message={buildReplyMsg(replyLabel)} />

      <label htmlFor='user-configuration-redeem-label-input'>
        Redeem label
      </label>
      <Input
        id='user-configuration-redeem-label-input'
        value={redemptionLabel}
        onChange={(e) => (
          updateConfig({ redemptionLabel: e.target.value }, session)
        )}
      />
      <MessagePreview message={buildRedeemMsg(redemptionLabel)} />

    </section>
  );
};
