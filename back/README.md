# Chat backend

Used to get emote, badges and channel information while also authenticating and storing/updating user configuration

Integrates with [EmyDev Auth Server](https://github.com/em1dev/AuthService) for storing credentials.

# Env

Create a .env file with the following details

```
SERVER_PORT='Port for the server to run at'
APP_ID='Unique app name used within auth service'
AUTH_API_URL='The auth server url'
```

# Endpoints

## Channel endpoints

Gets badges and emotes
```
GET /:channelId/badges
GET /:channelId/emotes
```

## User endpoints
Settings are stored as a stringified json string. The backend doesn't really care what the shape is as long as its a string.

If the user does not have any settings it returns an empty string. The client should handle this scenario and prefill defaults.
```
GET /settings
POST /settings
{
  settingsJsonString: string
}
```

## Secret
Gets user credential information associated with secret
```
POST /secret
{
  userId: number,
  secret: string
}
```

Recreate secret in case it has been leaked. This revokes any access token associated by calling revoke endpoint in the auth server
```
DELETE /settings/secret
```
## Authentication
```
POST /login
{
  code: string,
  provider: 'twitch'
  redirectUrl: string
}

POST /verify
Authorization bearer #token

GET /auth/url?redirectUrl=localhost:8090
```