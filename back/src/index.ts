import cors from 'cors';
import express from 'express';
import { ApiHandler } from './apiHandler';
import 'dotenv/config';
import { betterTTVApi } from './betterTTVApi';
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

patoApi.get('/users/:userName', async (req, res) => {
  const resp = await apiHandler.onGetUserInformation(req.params.userName);
  res.status(resp.status).send(resp.body);
});

patoApi.get('/:channelId/emotes', async (req, res) => {
  const resp = await apiHandler.getEmotes(req.params.channelId);
  res.status(resp.status).send(resp.body);
});


patoApi.listen(PORT, 'localhost', () => {
  console.log(`Started server at http://localhost:${PORT}`)
});