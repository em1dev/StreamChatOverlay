import cors from 'cors';
import express from 'express';
import { ApiHandler } from './apiHandler';
import 'dotenv/config';
const PORT = parseInt(process.env['SERVER_PORT'] ?? '8080');

const patoApi = express();
const apiHandler = new ApiHandler();

patoApi.use(cors());

patoApi.use((req, res, next) => {
  console.log(`${new Date().toDateString()}: [${req.method}] - ${req.url}`);
  res.setHeader('content-type', 'application/json');
  next();
});

patoApi.get('/:channelId/badge', async (req, res) => {
  const resp = await apiHandler.onGetChannelBadge(req.params.channelId);
  res.status(resp.status).send(resp.body);
});

patoApi.get('/badge', async (_, res) => {
  const resp = await apiHandler.onGetGlobalBadges();
  res.status(resp.status).send(resp.body);
});

patoApi.listen(PORT, 'localhost', () => {
  console.log(`Started server at http://localhot:${PORT}`)
});