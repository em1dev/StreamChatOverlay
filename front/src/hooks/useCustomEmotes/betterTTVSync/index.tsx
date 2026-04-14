import { BetterTTVEvent, BetterTTVJoinChannelEvent } from './eventTypes';

export class BetterTTVSync {
  private ws: WebSocket;

  public constructor(channelId: string, onChange: () => void){
    this.ws = new WebSocket('wss://sockets.betterttv.net/ws');
    this.ws.addEventListener('open', () => {
      console.log(`Listening to BetterTTV changes for ${channelId}`);
      this.ws.send(JSON.stringify({
        name: 'join_channel',
        data: {
          name: `twitch:${channelId}`
        }
      } satisfies BetterTTVJoinChannelEvent));
    });

    this.ws.addEventListener('message', (e) => {
      try {
        const msg = JSON.parse(e.data) as BetterTTVEvent;
        if (
          msg.name == 'emote_create' ||
          msg.name == 'emote_update' ||
          msg.name == 'emote_delete'
        ) {
          // it takes a couple of seconds from receiving the event to the api showing
          //    the emote changes, so we wait 5 seconds
          //    alternatively we could parse the changes and apply them client side if this approach is not consistent
          console.log('Detected betterTTV changes');
          setTimeout(onChange, 5000);
        }
      } catch (e) {
        console.log('weird message from betterttv ws', e);
      }
    });
  }

  public close = () => {
    this.ws.close();
  };
};