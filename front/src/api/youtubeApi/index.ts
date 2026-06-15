import { YoutubeLiveChatPagination } from './types';

const getLiveChatMessages = async (token: string, chatId: string, paginationToken?: string) => {
  const url = 'https://www.googleapis.com/youtube/v3/liveChat/messages';
  const params = new URLSearchParams({
    liveChatId: chatId,
    part: 'id,snippet,authorDetails'
  });
  if (paginationToken)
  {
    params.set('pageToken', paginationToken);
  }

  const resp = await fetch(url + '?' + params.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!resp.ok)
    return null;

  return (await resp.json()) as YoutubeLiveChatPagination;
};

export const youtubeApi = {
  getLiveChatMessages
};
