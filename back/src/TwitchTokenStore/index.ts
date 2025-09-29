import { twitchApi } from '../api/twitchApi';

export class TwitchTokenStore {
  private _appToken: string | null = null;
  private static _instance: TwitchTokenStore | null = null;

  public static getInstance = () => {
    if (this._instance == null) {
      this._instance = new TwitchTokenStore();
    }
    return this._instance;
  };

  public updateToken = async () => {
    const resp = await twitchApi.getAppToken();
    if (resp.data) {
      this._appToken = resp.data.access_token;
      return resp.data.access_token;
    }
    throw new Error(`Failed twitch authentication. Reason ${resp.error}`);
  };

  public getToken = async () => {
    if (this._appToken == null) {
      return this.updateToken();
    };

    return this._appToken;
  };
}