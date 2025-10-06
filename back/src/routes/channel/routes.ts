import { api } from '../..';
import { getChannelBadgesHandler } from './handlers/getChannelBadgesHandler';
import { EmoteConfiguration, getChannelEmotesHandler } from './handlers/getChannelEmotesHandler';

api.get('/:channelId/badges', async (req, res) => {
  const channelId = req.params.channelId;
  const result = await getChannelBadgesHandler(channelId);
  res.status(result.status).send(result.body);
});

api.get('/:channelId/emotes', async (req, res) => {
  const channelId = req.params.channelId;
  const emoteConfig:EmoteConfiguration = {
    betterTTV: req.query['betterTTV'] === 'true',
    frankerFace: req.query['frankerFace'] === 'true',
    sevenTV: req.query['sevenTV'] === 'true',
  };

  const result = await getChannelEmotesHandler(channelId, emoteConfig);
  res.status(result.status).send(result.body);
});

