import { credentials, Metadata } from '@grpc/grpc-js';
import { V3DataLiveChatMessageServiceClient } from '../../proto/streamList_grpc_pb';
import { LiveChatMessageListRequest, LiveChatMessageListResponse } from '../../proto/streamList_pb';
import { mapMessage, YoutubeChatMessage } from './messageMapper';
import { AuthApi } from '../authApi';
import { youtubeApi } from '../youtubeApi';


export class YoutubeChatClient {
  private _client: V3DataLiveChatMessageServiceClient | null = null;
  private _request: LiveChatMessageListRequest;
  private _isClosing = false;

  private _callback: (newMessages: YoutubeChatMessage[], userId: number) => void;

  private _activeToken: { token: string, expiresAt: number } | null = null;
  private _userId: number;

  public constructor(
    userId: number,
    callback: (newMessages: YoutubeChatMessage[], userId: number) => void
  )
  {
    this._userId = userId;
    this._callback = callback;
    this._request = new LiveChatMessageListRequest();
    this._request.addPart('snippet');
    this._request.addPart('id');
    this._request.addPart('authorDetails');

    console.log('created new youtube client');
    this.loadConnectionDetails(userId);
  }

  private loadConnectionDetails = async (userId: number) => {
    const resp = await AuthApi.getConnections(userId);
    const youtubeConnection = resp?.filter(c => c.type === 'youtube').at(0);
    if (!youtubeConnection) return;
    const token = youtubeConnection.token;
    const channelId = youtubeConnection.userId;
    const broadcast = await youtubeApi.getLiveBroadcast(channelId, token);
    const chatId = broadcast?.liveChatId;
    if (!chatId) return;
    this._request.setLiveChatId(chatId);

    const combinedCredentials = this.createCredentials(userId);

    this._client = new V3DataLiveChatMessageServiceClient(
      'dns:///youtube.googleapis.com:443',
      combinedCredentials
    );

    this._request = new LiveChatMessageListRequest();
    this._request.addPart('snippet');
    this._request.addPart('id');
    this._request.addPart('authorDetails');
    this._request.setLiveChatId(chatId);

    this.startListening();
    /*
    if (pageToken)
    {
      this._request.setPageToken(pageToken);
    }
    */
  };

  private createCredentials = (userId: number) => {
    console.log('creating credentials');
    const callCredentials = credentials.createFromMetadataGenerator(async (_, callback) => {
      try {
        if (!this._activeToken || this._activeToken.expiresAt < Date.now()) {
          const resp = await AuthApi.getConnections(userId);
          const ytConnection = resp?.filter((c) => c.type == 'youtube').at(0);
          if (!ytConnection) return callback(new Error('Unable to refresh token'));
          this._activeToken = {
            expiresAt: Date.now() + ytConnection.expiresIn,
            token: ytConnection.token
          };
        }

        const meta = new Metadata();
        meta.add('Authorization', `Bearer ${this._activeToken.token}`);
        callback(null, meta);
      } catch {
        callback(new Error('Unable to refersh token'));
      }
    });

    const sslCredentials = credentials.createSsl();
    const combinedCredentials = credentials.combineChannelCredentials(sslCredentials, callCredentials);
    return combinedCredentials;
  };

  public close = async () => {
    console.log('closing client...');
    this._isClosing = true;
    this._client?.close();
  };

  private startListening = async () => {
    while (this._client) {
      await this.pollMessages();
    }
  };

  private pollMessages = async () => {
    console.log('pooling...');
    if (!this._client) return;
    const streamResponse = this._client.streamList(this._request);

    for await (const item of streamResponse.iterator())
    {
      if (this._isClosing) return;
      console.log('uintern', item);

      const listResponse = item as LiveChatMessageListResponse;
      if (!listResponse) continue;
      const messages = listResponse.getItemsList();

      const messagesParsed = messages
        .map(mapMessage)
        .filter(m => m != null);

      if (messagesParsed.length > 0) {
        this._callback(messagesParsed, this._userId);
      }

      const nextPage = listResponse.getNextPageToken();
      if (nextPage) {
        this._request.setPageToken(nextPage);
      }
    }
  };
}
