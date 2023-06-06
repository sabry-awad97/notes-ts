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
