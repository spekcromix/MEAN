import http from 'http';
import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl } from './config';

const PORT = 3000;
const debug = new Debug('platzi-overflow:root');

mongoose.Promise = global.Promise;

async function start() {
  await mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true }
  );

  app.listen(PORT, () => {
    debug(`Running in port ${PORT}`);
  });
}

start();
