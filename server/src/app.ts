import http from 'http';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import rfs from 'rotating-file-stream';
import DBG from 'debug';
// import capcon from 'capture-console';
import cookieParser from 'cookie-parser';
import {
  basicErrorHandler,
  handle404,
  normalizePort,
  onError,
  onListening,
} from './app-support.js';
import cors from 'cors';
import { __dirname } from './approotdir.js';
import { router as notesRouter } from './routes/notes.js';

// capcon.startCapture(process.stdout, function (stdout) {
//   fs.appendFileSync('stdout.txt', stdout, 'utf8');
// });

// capcon.startCapture(process.stderr, function (stderr) {
//   fs.appendFileSync('stderr.txt', stderr, 'utf8');
// });

const debug = DBG('notes:debug');
const dbgerror = DBG('notes:error');

import { useModel as useNotesModel } from './models/notes-store.js';

useNotesModel(process.env.NOTES_MODEL ? process.env.NOTES_MODEL : 'memory')
  .then(store => {
    debug(`Using ${store} model`);
  })
  .catch(error => {
    onError({
      name: 'notes-store',
      code: 'ENOTESSTORE',
      message: error.message,
    });
  });

export const app = express();

export const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.use(
  logger(process.env.REQUEST_LOG_FORMAT || 'dev', {
    // immediate: true,
    stream: process.env.REQUEST_LOG_FILE
      ? rfs.createStream(process.env.REQUEST_LOG_FILE, {
          size: '10M',
          interval: '1d',
          compress: 'gzip',
        })
      : process.stdout,
  })
);

if (process.env.REQUEST_LOG_FILE) {
  app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const buildDir = path.join(__dirname, '..', '..', 'client', 'build');

app.use(express.static(buildDir));

app.use('/notes', notesRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.use(handle404);
app.use(basicErrorHandler);

export const server = http.createServer(app);
server.listen(port);
server.on('request', req => {
  debug(`${new Date().toISOString()} request ${req.method} ${req.url}`);
});
server.on('error', onError);
server.on('listening', onListening);
