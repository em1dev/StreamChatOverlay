import z from 'zod';
import { api } from '../..';
import { LoginServices } from '../../api/authApi';
import { loginHandler } from './handlers/loginHandler';
import { getTokenIfValid } from '../../getUserFromToken';
import { getAuthUrl } from './handlers/getAuthUrl';

api.post('/login', async (req, res) => {
  const { code, redirectUrl } = z.object({
    code: z.string(),
    provider: z.enum(LoginServices),
    redirectUrl: z.string()
  }).parse(req.body);

  const user = await loginHandler(code, redirectUrl);

  if (!user) {
    res.status(401).send();
  }

  res.status(200).send(user);
});

api.post('/token/verify', async (req, res) => {
  const isValid = await getTokenIfValid(req.headers);
  if (!isValid) return res.status(401).send();
  return res.status(200).send();
});

api.get('/auth/url', async (req, res) => {
  const redirectUrl = req.query['redirectUrl'] as string;
  const result = await getAuthUrl(redirectUrl);
  return res.status(200).send(result.body);
});