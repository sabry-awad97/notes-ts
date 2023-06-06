import http from 'http';
import path from 'path';
import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import {
  basicErrorHandler,
  handle404,
  normalizePort,
  onError,
  onListening,
} from './app-support.js';
import cors from 'cors';
import hbs from 'hbs';
import { __dirname } from './approotdir.js';
import { router as indexRouter } from './routes/index.js';
import { router as notesRouter } from './routes/notes.js';
import { InMemoryNotesStore } from './models/notes-memory.js';

export const app = express();
export const NotesStore = new InMemoryNotesStore();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

export const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/notes', notesRouter);

app.use(handle404);
app.use(basicErrorHandler);

export const server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);
