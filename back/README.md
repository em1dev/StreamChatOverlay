# Chat backend

Used to get emote, badges and channel information while also authenticating and storing/updating user configuration

## Environmental variables needed

SERVER_PORT -> Port for the server to run at

APP_ID -> App name used within auth service

AUTH_API_URL -> The auth server url

## Endpoints


```
GET /users/:username

GET /:channelId/badges
GET /:channelId/emotes

GET /settings
POST /settings
{
  settings: JSON.Object
}


POST /authenticate
{
  code: string
}

POST /verify
Authorization token

```