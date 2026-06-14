import pino from 'pino';
import pinoHttp from 'pino-http';

export const logger = pino({
});

export const httpLogger = pinoHttp({
  base: logger,
  serializers: {
    req: (req) => ({
      ...req,
      headers: {
        ...req.headers,
        authorization: '**Redacted**'
      }
    })
  }
});
