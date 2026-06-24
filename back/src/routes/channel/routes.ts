import { Router } from 'express';
import { getChannelBadgesHandler } from './handlers/getChannelBadgesHandler';
import { EmoteConfiguration, getChannelEmotesHandler } from './handlers/getChannelEmotesHandler';


export const router = Router();

router.get('/:channelId/badges', async (req, res) => {
  const channelId = req.params.channelId;
  const result = await getChannelBadgesHandler(channelId);
  result.sendResult(res);
});

router.get('/:channelId/emotes', async (req, res) => {
  const channelId = req.params.channelId;
  const emoteConfig:EmoteConfiguration = {
    betterTTV: req.query['betterTTV'] === 'true',
    frankerFace: req.query['frankerFace'] === 'true',
    sevenTV: req.query['sevenTV'] === 'true',
  };

  const result = await getChannelEmotesHandler(channelId, emoteConfig);
  result.sendResult(res);
});
