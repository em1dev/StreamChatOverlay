const EVENT_URL = 'https://events.7tv.io/v3';
const API_URL = 'https://7tv.io/v3/users/twitch';
const EVENT_TYPE = 'dispatch';

const CHANGE_TYPE = 'emote_set.update';

interface SevenTVEmoteSetChangeEvent
{
  type: string,
  // theres more stuff but for now all we care is the type
  // potentially we could extract exactly which emote was added/removed and display a msg or notification
}

export class SevenTVSync {

  private eventSource: EventSource | null = null;
  private hasDisconnected = false;

  public async connect(id: string, onChange: () => void)
  {
    this.hasDisconnected = false;
    const resp = await fetch(`${API_URL}/${id}`);
    if (!resp.ok) return;
    const data = await resp.json() as { 'emote_set_id' : string };
    const emoteSetId = data.emote_set_id;

    if (this.hasDisconnected) return;

    this.eventSource = new EventSource(`${EVENT_URL}/@emote_set.update<object_id=${emoteSetId}>`);
    this.eventSource.addEventListener('open', () => {
      console.log(`Listening to 7TV changes for ${id}`);
    });
    this.eventSource.addEventListener(EVENT_TYPE, (e) => {
      if (typeof e.data != 'string') return;
      const msg = JSON.parse(e.data as string) as SevenTVEmoteSetChangeEvent;
      if (msg.type != CHANGE_TYPE) return;
      console.log('Detected 7TV changes');
      onChange();
    });
  }

  public close()
  {
    this.hasDisconnected = true;
    this.eventSource?.close();
  }
}