import { WebsocketRequestHandler } from 'express-ws';
import { YoutubeChatClient } from '../api/youtubeGrpc';
import { YoutubeChatMessage } from '../api/youtubeGrpc/messageMapper';

type WS = Parameters<WebsocketRequestHandler>[0];

export class ChatWsManager {
  private constructor(){}
  private static _instance: ChatWsManager | null = null;
  public static getInstance = () => {
    if (!this._instance) {
      this._instance = new ChatWsManager();
    }
    return this._instance;
  };

  // key = userId
  private _store: Record<string, {
    chatClient: YoutubeChatClient,
    wsClients: Array<WS>
  }> = {};

  public addNewConnection = async (userId:number, wsClient: WS) => {
    console.log('new connection to chat');
    if (!this._store[userId])
    {
      this._store[userId] = {
        chatClient: new YoutubeChatClient(userId, this.sendEvents),
        wsClients: []
      };
    }

    this._store[userId].wsClients.push(wsClient);

    wsClient.on('close', () => {
      this.removeConnection(userId, wsClient);
    });
  };

  public removeConnection = (userId: number, wsClient: WS) => {
    console.log('lost connection to chat clietn');
    if (!this._store[userId]) return;

    const newClients = this._store[userId].wsClients.filter(ws => ws !== wsClient);
    this._store[userId].wsClients = newClients;

    if (newClients.length == 0) {
      this._store[userId].chatClient.close();
      delete this._store[userId];
    }
  };

  private sendEvents = (newMessages: YoutubeChatMessage[], userId: number) => {
    console.log('new messages', newMessages);
    this._store[userId]?.wsClients.forEach(ws => ws.send(JSON.stringify(newMessages)));
  };
}
