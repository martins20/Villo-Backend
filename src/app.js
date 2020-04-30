import dotenv from 'dotenv';

import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // cors is Enabled from all ip's
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
