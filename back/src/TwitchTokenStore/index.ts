import { AuthApi } from '../api/authApi';
import { twitchApi } from '../api/twitchApi';
import { logger } from '../logger';

export interface TwitchCredentials
{
  clientId: string,
  clientSecret: string,
  appToken: string
}

export interface YoutubeCredentials
{
  clientId: string
}

export class TokenStore {
  private static _instance: TokenStore | null = null;
  private _twitchCredentials: TwitchCredentials | null = null;
  private _youtubeCredentials: YoutubeCredentials | null = null;

  public static getInstance = () => {
    if (this._instance == null) {
      this._instance = new TokenStore();
    }
    return this._instance;
  };

  public getYoutubeCredentials = async (): Promise<YoutubeCredentials> => {
    if (!this._youtubeCredentials) {
      const result = await AuthApi.getAppCredentials();
      const foundCredentials = result.find(c => c.type == 'youtube');
      if (!foundCredentials) {
        throw new Error('Missing youtube credentials on auth server');
      }
      this._youtubeCredentials = {
        clientId: foundCredentials.clientId
      };
    }
    return this._youtubeCredentials;
  };

  public getTwitchCredentials = async (): Promise<TwitchCredentials> => {
    if (!this._twitchCredentials) {
      const result = await AuthApi.getAppCredentials();
      const foundCredentials = result.find(c => c.type == 'twitch');
      if (!foundCredentials) {
        throw new Error('Missing twitch credentials on auth server');
      }

      const tokenResult = await twitchApi.getAppToken(foundCredentials.clientId, foundCredentials.clientSecret);

      if (tokenResult.error || tokenResult.data == null)
      {
        throw new Error(`Failed twitch authentication. Reason ${tokenResult.error}`);
      }

      this._twitchCredentials = {
        clientId: foundCredentials.clientId,
        clientSecret: foundCredentials.clientSecret,
        appToken: tokenResult.data.access_token
      };
    }

    const tokenVerificationResp = await twitchApi.verifyToken(this._twitchCredentials.appToken);
    if (tokenVerificationResp.error) {
      logger.info(tokenVerificationResp, 'Expired app token...refreshing');
      return await this.getTwitchCredentials();
    }

    return this._twitchCredentials;
  };
}
