import { Connection } from '@/api/chatApi/types';
import { Icon } from '@iconify/react';


export const LiveServiceIcon = ({ type }: { type: Connection['type'] }) => {
  if (type == 'youtube')
    return <Icon fontSize="1.2em" color="red" aria-hidden icon="mingcute:youtube-line" />;
  return <Icon fontSize="1.2em" color="purple" aria-hidden icon="mingcute:twitch-fill" />;
};
