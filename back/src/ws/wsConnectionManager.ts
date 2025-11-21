import { WebSocket, OPEN } from 'ws';
import { ChangeEvent } from './events';

export class WsConnectionManager {
  // userId to connection arrays
  private _connections: Record<number, { connections: Array<WebSocket> }> = {};

  private static _instance: WsConnectionManager | null = null;
  private constructor()
  {}

  public static GetInstance = () => {
    if (!this._instance)
    {
      this._instance = new WsConnectionManager();
    }
    return this._instance;
  };

  public AddConnection(userId: number, ws:WebSocket)
  {
    let existingItem = this._connections[userId];
    if (!existingItem) {
      existingItem = { connections: [] };
      this._connections[userId] = existingItem;
    }

    existingItem.connections = [...existingItem.connections, ws];

    ws.onclose = () => {
      this.RemoveConnection(userId, ws);
    };
  }

  public RemoveConnection(userId: number, ws:WebSocket)
  {
    const existingItem = this._connections[userId];
    if (!existingItem) {
      return;
    }

    existingItem.connections = existingItem.connections.filter(item => item != ws);

    if (existingItem.connections.length == 0)
    {
      delete this._connections[userId];
    }
  }

  public GetConnections(userId: number)
  {
    return this._connections[userId]?.connections.filter(c => c.readyState == OPEN) ?? [];
  }

  public SendChangeEvent(userId: number, changeId: string)
  {
    const connections = this.GetConnections(userId);
    const changeEv:ChangeEvent = {
      type: 'change',
      data: {
        changeId,
        userId
      }
    };
    const evPayload = JSON.stringify(changeEv);

    for (const ws of connections)
    {
      try {
        ws.send(evPayload);
      } catch{
        console.log('Unable to send change ev to client');
      }
    }
  }
}