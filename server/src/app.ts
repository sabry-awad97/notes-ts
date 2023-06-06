import http from 'http';

import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import { normalizePort, onError, onListening } from './app-support.js';

export const app = express();
export const port = normalizePort(process.env.PORT || '3000');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export const server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);
