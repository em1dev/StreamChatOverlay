import { AuthApi } from '../api/authApi';
import { twitchApi } from '../api/twitchApi';

export interface TwitchCredentials
{
  clientId: string,
  clientSecret: string,
  appToken: string
}

export class TwitchTokenStore {
  private static _instance: TwitchTokenStore | null = null;
  private _twitchCredentials: TwitchCredentials | null = null;

  public static getInstance = () => {
    if (this._instance == null) {
      this._instance = new TwitchTokenStore();
    }
    return this._instance;
  };

  public getCredentials = async () => {
    if (!this._twitchCredentials) {
      const result = await AuthApi.getAppCredentials();
      const tokenResult = await twitchApi.getAppToken(result.clientId, result.clientSecret);

      if (tokenResult.error || tokenResult.data == null)
      {
        throw new Error(`Failed twitch authentication. Reason ${tokenResult.error}`);
      }

      this._twitchCredentials = {
        clientId: result.clientId,
        clientSecret: result.clientSecret,
        appToken: tokenResult.data.access_token
      };
    }

    return this._twitchCredentials;
  };
}