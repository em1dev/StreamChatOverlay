import 'dotenv/config';

export const config = process.env as {
  PORT: string,
  APP_ID: string,
  AUTH_API_URL: string,
  SQLITE_DB_PATH: string
};

if (
  !config.PORT ||
  !config.APP_ID ||
  !config.AUTH_API_URL ||
  !config.SQLITE_DB_PATH
){
  throw new Error('Missing env variables');
}
