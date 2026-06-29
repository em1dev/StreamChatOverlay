import { IncomingHttpHeaders } from 'http';


const CLIENT_ID_HEADER_KEY = 'client_id';

// client id identifies each individual web client, so they can ignore events created from their actions
// this has nothing to do with twitch client id
export const getClientIdFromHeader = async (headers: IncomingHttpHeaders) => {
  const clientId =  headers[CLIENT_ID_HEADER_KEY];
  if (typeof clientId === 'string') return clientId;
};
