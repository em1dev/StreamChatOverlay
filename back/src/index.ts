import cors from 'cors';
import expressWs from 'express-ws';
import express, { ErrorRequestHandler } from 'express';
import { config } from './config';
import { httpLogger, logger } from './logger';
import z, { ZodError } from 'zod';

const apiws = expressWs(express());
export const api = apiws.app;

api.use(cors());

api.get('/health', (_, res) => {
  res.status(200).send();
});

api.use(express.json());
api.use(httpLogger);

import './routes/channel/routes';
import './routes/authentication/routes';
import './routes/settings/routes';
import './routes/connection/routes';
import './ws';

// must be 4 params so that its registered as an error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler:ErrorRequestHandler = (err:unknown, req, res, next) => {
  if (err instanceof ZodError) {
    const issues = z.treeifyError(err);
    req.log.info(z.prettifyError(err));
    res.status(400).send(issues);
    return;
  }

  req.log.error(err);
  res.status(500).send('Internal error');
};

api.use(errorHandler);

api.use((_, res) => {
  res.status(404).send();
});

api.listen(config.PORT, () => {
  logger.info(`Started server at http://localhost:${config.PORT}`);
});
