import dotenv from 'dotenv';

import express, { Router } from 'express';
import http from 'http';
import { responsesRouter } from './routes/responses.route';

dotenv.config();

const app = express();

(async () => {
  console.info('startng server');

  app.use(express.json());

  const routers: Router[] = [responsesRouter];

  app.use(routers);

  const httpServer = http.createServer(app);

  httpServer.listen(process.env.PORT, () => {
    console.info(`Server port: ${process.env.PORT}`);
  });
})();
