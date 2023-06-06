export function normalizePort(s: string) {
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
