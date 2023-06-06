import { ErrorRequestHandler, RequestHandler } from 'express';
import { port, server } from './app.js';

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
  console.log(
    `🚀 Server is running on ${bind}` + ' ' + 'press Ctrl-C to terminate....'
  );
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
    return next(err);
  }

  // Set the error message in the response locals
  res.locals.message = err.message;

  // Set the error object in the response locals based on the application environment
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Set the HTTP status code of the response to the error status or default to 500 (Internal Server Error)
  res.status(err.status || 500);

  // Render the 'error' view or template to display the error
  res.render('error');
};
