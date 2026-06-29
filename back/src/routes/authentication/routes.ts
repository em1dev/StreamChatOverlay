import z from 'zod';
import { LoginServices } from '../../api/authApi';
import { loginHandler } from './handlers/loginHandler';
import { getTokenIfValid } from '../../util/getUserFromToken';
import { getAuthUrl } from './handlers/getAuthUrl';
import { Router } from 'express';


export const router = Router();

router.post('/login', async (req, res) => {
  const { code, redirectUrl } = z.object({
    code: z.string(),
    provider: z.enum(LoginServices),
    redirectUrl: z.string()
  }).parse(req.body);

  const result = await loginHandler(code, redirectUrl);
  result.sendResult(res);
});

router.post('/token/verify', async (req, res) => {
  const isValid = await getTokenIfValid(req.headers);
  if (!isValid) return res.status(401).send();
  return res.status(200).send();
});

router.get('/authenticate', async (req, res) => {
  const redirectUrl = req.query['redirectUrl'] as string;
  const authUrl = await getAuthUrl(redirectUrl);
  if (!authUrl)
    return res.status(400).send();

  res.redirect(authUrl);
});
