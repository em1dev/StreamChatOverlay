import { twitchApi } from "../twitchApi";
import { ElPatoApiResponse, TwitchBadgeResponse } from "../types";

export class ApiHandler {
  private _appToken: string | null = null;

  constructor() {
    this.authenticateApp();
  }

  private authenticateApp = async () => {
    const resp = await twitchApi.getAppToken();
    if (resp.data) {
      this._appToken = resp.data.access_token;
      return resp.data.access_token;
    }
    console.error(`Failed to authenticate`);
  };

  public onGetGlobalBadges = async ():Promise<ElPatoApiResponse<TwitchBadgeResponse['data']>> => {
    if (!this._appToken) return { status: 500 };

    const resp = await twitchApi.getGlobalBadges(this._appToken);

    if (resp.data) return {
      status: 200,
      body: resp.data.data
    }

    if (resp.error?.status === 403 || resp.error?.status === 401) {
      const newToken = await this.authenticateApp();
      if (newToken) {
        return await this.onGetGlobalBadges();
      }
      return { status: 500 };
    }

    return {
      status: resp.error?.status ?? 500,
    }
  }

  public onGetChannelBadge = async (channelId: string): Promise<ElPatoApiResponse<TwitchBadgeResponse['data']>> => {
    if (!this._appToken) return { status: 500 };

    const resp = await twitchApi.getChannelBadges(channelId, this._appToken);
    if (resp.data) return {
      status: 200,
      body: resp.data.data
    }

    if (resp.error?.status === 403 || resp.error?.status === 401) {
      const newToken = await this.authenticateApp();
      if (newToken) {
        return await this.onGetChannelBadge(channelId);
      }
      return { status: 500 };
    }

    return {
      status: resp.error?.status ?? 500,
    }
  }
}