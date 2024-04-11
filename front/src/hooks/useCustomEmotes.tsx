import { useEffect, useState } from 'react';
import { CustomEmote } from '../api/elpatoApi/types';
import { elPatoApi } from '../api/elpatoApi';

export const useCustomEmotes = (channelId: string) => {
  const [customEmotes, setCustomEmotes] = useState<Array<CustomEmote>>([]);

  useEffect(() => {
    (async () => {
      const resp = await elPatoApi.getEmotes(channelId);
      if (!resp.data) return;
      setCustomEmotes(resp.data);
    })();
  }, [channelId]);

  return customEmotes;
};