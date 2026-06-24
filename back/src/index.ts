import cors from 'cors';
import expressWs from 'express-ws';
import express, { ErrorRequestHandler } from 'express';
import { config } from './config';
import { httpLogger, logger } from './logger';
import z, { ZodError } from 'zod';
import { router as channelRouter } from './routes/channel/routes';
import { router as authenticatioRouter } from './routes/authentication/routes';
import { router as settingsRouter } from './routes/settings/routes';
import { router as connectionRouter } from './routes/connection/routes';
import { router as secretRouter } from './routes/secret/routes';
import { wsHandler } from './routes/ws';


const apiws = expressWs(express());
const api = apiws.app;

api.use(cors());

api.get('/health', (_, res) => {
  res.status(200).send();
});

api.use(express.json());
api.use(httpLogger);

api.use(channelRouter);
api.use(authenticatioRouter);
api.use(settingsRouter);
api.use(connectionRouter);
api.use(secretRouter);

api.ws('/', wsHandler);

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
