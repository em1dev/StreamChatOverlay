import { logger } from '../../logger';
import { WebsocketEvent } from './events';
import { WebSocket as WS } from 'ws';

type WSVersion = 'v2';

export class WsConnectionManager {
  // userId to connection arrays
  private _connections: Record<number, {
    connections: Array<{
      ws: WS,
      version: WSVersion
    }>
  }> = {};

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

  public AddConnection(userId: number, ws:WS, version: WSVersion)
  {
    let existingItem = this._connections[userId];
    if (!existingItem) {
      existingItem = { connections: [] };
      this._connections[userId] = existingItem;
    }

    existingItem.connections = [
      ...existingItem.connections,
      { version, ws }
    ];

    ws.on('close', () => {
      this.RemoveConnection(userId, ws);
    });
  }

  public RemoveConnection(userId: number, ws:WS)
  {
    const existingItem = this._connections[userId];
    if (!existingItem) {
      return;
    }

    existingItem.connections = existingItem
      .connections
      .filter(item => item.ws != ws);

    if (existingItem.connections.length == 0)
    {
      delete this._connections[userId];
    }
  }

  public GetConnections(userId: number, version: WSVersion)
  {
    return this._connections[userId]?.connections
      .filter(c => c.ws.readyState == WebSocket.OPEN && c.version == version) ?? [];
  }

  public sendEvent(event: WebsocketEvent, userId: number)
  {
    const connections = this.GetConnections(userId, 'v2');
    const payload = JSON.stringify(event);
    for (const connection of connections)
    {
      try {
        connection.ws.send(payload);
      } catch{
        logger.info('Unable to send ev to client');
      }
    }
  }
}
