import util from 'util';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { port, server } from './app.js';
import DBG from 'debug';

const debug = DBG('notes:debug');
const dbgerror = DBG('notes:error');

/**
 * Normalize the specified port value.
 */
export function normalizePort(s: string): string | number | boolean {
  const port = parseInt(s, 10);

  if (isNaN(port)) {
    // named pipe
    return s;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Handle error that occurs during server startup.
 */
export function onError(error: NodeJS.ErrnoException) {
  dbgerror(error);

  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    case 'ENOTESSTORE':
      console.error(`Notes data store initialization failure because `, error);
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Handle the event when the server starts listening on a specific address.
 */
export function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  debug(`🚀 Server is running on \x1b[36m\x1b[1m${bind}\x1b[0m`);
}

class NotFoundError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}

/**
 * Handle the 404 - Not Found error.
 */
export const handle404: RequestHandler = (req, res, next): void => {
  const err = new NotFoundError('The requested resource was not found.');
  next(err);
};

/**
 * Basic error handler middleware.
 */
export const basicErrorHandler: ErrorRequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = (err, req, res, next) => {
  if (res.headersSent) {
    // If headers have already been sent, pass the error to the next error handler middleware
    debug(`basicErrorHandler HEADERS SENT error ${util.inspect(err)}`);
    return next(err);
  }

  // Set the error message in the response locals
  res.locals.message = err.message;

  // Set the error object in the response locals based on the application environment
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Set the HTTP status code of the response to the error status or default to 500 (Internal Server Error)
  res.status(err.status || 500);

  // Render the 'error' view or template to display the error
  res.json(err);
};

process.on('uncaughtException', function (err) {
  console.error(`Uncaught Exception: ${err.stack || err}`);
});

process.on('unhandledRejection', (reason, p) => {
  console.error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
});

async function catchProcessDeath() {
  debug('process death...');
  server.close();
  process.exit(0);
}

process.on('SIGTERM', catchProcessDeath);
process.on('SIGINT', catchProcessDeath);
process.on('SIGHUP', catchProcessDeath);

process.on('exit', () => {
  debug('exiting...');
});
