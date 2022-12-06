import cors from 'cors';
import express from 'express';
import config from './config';
import { getInventoryRouter } from './controllers/inventory.controller';
// import Db from './models/pg';
const getAPIRouter = () =>
  express
    .Router({ mergeParams: true })
    .use(express.json({ limit: '10mb' }))
    .use('/inventory', getInventoryRouter())

async function main() {
  const app = express()
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(cors())
    .use('/api', getAPIRouter())
    .listen(config.port, () =>
      console.log(`listening on http://localhost:${config.port}`)
    );
  function stopServer() {
    console.log('stopping server');
    app.close();
  }
  process.once('SIGTERM', stopServer);
  process.once('SIGINT', stopServer);
}

main().catch((err) => console.error('app.init.failed', err));