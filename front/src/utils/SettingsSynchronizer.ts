import { chatApi } from '@/api/chatApi';
import { useSettingsChangeListener } from '@/hooks/useSettingsChangeListener';
import { useStore } from '@/store';
import { resetState, setActiveChat, setChats } from '@/store/actions/settingsActions';
import { useCallback, useEffect } from 'react';

export const SettingsSynchronizer = () => {
  const { session, isLoadingSession } = useStore();

  useEffect(() => {
    if (!session) return;

    (async () => {
      if (isLoadingSession) return;

      if (!session)
      {
        resetState();
        return;
      }

      const result = await chatApi.getChat(session.token);
      if (result.data) {
        setChats(result.data);
        setActiveChat(result.data.at(0)?.id);
      }
    })();
  }, [session, isLoadingSession]);

  const onSettingsChange = useCallback(async () => {
    if (isLoadingSession || !session) return;
    const result = await chatApi.getChat(session.token);
    if (result.data) {
      setChats(result.data);
      setActiveChat(result.data.at(0)?.id);
    }
  }, [session, isLoadingSession]);

  useSettingsChangeListener(session?.user.id || null, onSettingsChange);

  return null;
};
