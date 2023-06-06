import http from 'http';

import 'dotenv/config';
import express from 'express';

export const app = express();
export const port = process.env.PORT || '3000';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(express.json());

export const server = http.createServer(app);
server.listen(port);

console.log(
  `🚀 Server is running at http://localhost:${port}` +
    ' ' +
    'press Ctrl-C to terminate....'
);
