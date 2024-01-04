import { betterTTVApi } from "../betterTTVApi";
import { twitchApi } from "../twitchApi";
import { ElPatoApiResponse, ElPatoEmote, TwitchBadgeResponse, UserInformation } from "../types";

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

  public onGetUserInformation = async (userName: string): Promise<ElPatoApiResponse<UserInformation>> => {
    if (!this._appToken) return { status: 500 };

    const resp = await twitchApi.getUserInformation(userName, this._appToken);

    if (resp.data) {
      const foundUser = resp.data.data.find((item) => item.login === userName.toLowerCase());
      if (!foundUser) return { status: 404 };
      return {
        status: 200,
        body: foundUser
      };
    }

    if (resp.error?.status === 403 || resp.error?.status === 401) {
      const newToken = await this.authenticateApp();
      if (newToken) {
        return await this.onGetUserInformation(userName);
      }
      return { status: 500 };
    }

    return {
      status: resp.error?.status ?? 500,
    }
  }

  public getEmotes = async (channelId: string): Promise<ElPatoApiResponse<Array<ElPatoEmote>>> => {
    const globalEmotes = await betterTTVApi.getGlobalEmotes();
    const userEmotes = await betterTTVApi.getUserEmotes(channelId);

    if (!globalEmotes.data) return { status: 500 };
    let patoEmotes:Array<ElPatoEmote> = globalEmotes.data.map((emote) => ({
      id: emote.id,
      code: emote.code,
      animated: emote.animated,
      url1x: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
      url2x: `https://cdn.betterttv.net/emote/${emote.id}/2x`,
      url3x: `https://cdn.betterttv.net/emote/${emote.id}/3x`
    }));

    if (userEmotes.data) {
      patoEmotes = patoEmotes.concat(userEmotes.data.sharedEmotes.map((emote) => ({
        id: emote.id,
        animated: emote.animated,
        code: emote.code,
        url1x: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
        url2x: `https://cdn.betterttv.net/emote/${emote.id}/2x`,
        url3x: `https://cdn.betterttv.net/emote/${emote.id}/3x`
      })));

      patoEmotes = patoEmotes.concat(userEmotes.data.channelEmotes.map((emote) => ({
        id: emote.id,
        animated: emote.animated,
        code: emote.code,
        url1x: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
        url2x: `https://cdn.betterttv.net/emote/${emote.id}/2x`,
        url3x: `https://cdn.betterttv.net/emote/${emote.id}/3x`
      })));
    }

    return { status: 200, body: patoEmotes };
  }
}