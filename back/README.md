# Chat backend

Used to get emote, badges and channel information while also authenticating and storing/updating user configuration

## Environmental variables needed

CLIENT_ID -> Twitch client id

CLIENT_SECRET -> Twitch client secret

SERVER_PORT -> Port for the server to run at

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