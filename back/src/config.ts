import 'dotenv/config';

export const config = process.env as {
  PORT: string,
  APP_ID: string,
  AUTH_API_URL: string
};

if (
  !config.PORT ||
  !config.APP_ID ||
  !config.AUTH_API_URL
){
  throw new Error('Missing env variables');
}
