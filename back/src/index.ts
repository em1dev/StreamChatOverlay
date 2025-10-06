import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const PORT = parseInt(process.env['SERVER_PORT'] ?? '8080');

export const api = express();
api.use(cors());
api.use(express.json());

api.use((req, res, next) => {
  console.log(`${new Date().toDateString()}: [${req.method}] - ${req.url}`);
  res.setHeader('content-type', 'application/json');
  next();
});

import './routes/channel/routes';
import './routes/authentication/routes';
import './routes/settings/routes';

api.listen(PORT, 'localhost', () => {
  console.log(`Started server at http://localhost:${PORT}`);
});