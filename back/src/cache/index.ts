import { createClient, RedisClientType } from 'redis';
import { logger } from '../logger';
import { config } from '../config';

const DAY_IN_SECONDS = 86400;
const HOUR_IN_SECONDS = 3600;
const MINUTE_IN_SECONDS = 60;

export const daysInSeconds = (days: number) => DAY_IN_SECONDS * days;
export const hoursInSeconds = (hours: number) => HOUR_IN_SECONDS * hours;
export const minutesInSeconds = (minutes: number) => MINUTE_IN_SECONDS * minutes;

export class RedisCache
{
  private _client: RedisClientType;
  private static _instance: RedisCache | null = null;

  private constructor() {
    this._client = createClient({
      url: config.REDIS_URL
    });

    this._client
      .on('error', err => logger.error(err, 'Redis client error'));

    this._client.connect().then(() => {
      logger.info('Connected to redis cache');
    });
  }

  public static getInstance = () => {
    if (!this._instance) {
      this._instance = new RedisCache();
    }
    return this._instance;
  };

  public getItem = async <T>(key: string) => {
    try {
      const item = await this._client.get(key);
      if (!item) return;
      return JSON.parse(item) as T;
    } catch {
      return;
    }
  };

  public setItem = async <T>(
    key: string, item: T
  ) => {
    await this._client
      .set(key, JSON.stringify(item));
  };

  public setItemWithExpiration = async <T>(
    key: string, item: T, cacheDurationInSeconds: number
  ) => {
    await this._client
      .setEx(key, cacheDurationInSeconds, JSON.stringify(item));
  };
}
