import http from 'http';
import path from 'path';
import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import {
  basicErrorHandler,
  handle404,
  normalizePort,
  onError,
  onListening,
} from './app-support.js';
import hbs from 'hbs';

export const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

export const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

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

app.use(handle404);
app.use(basicErrorHandler);

export const server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);
