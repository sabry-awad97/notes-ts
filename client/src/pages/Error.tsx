import React from 'react';
import { IError } from '../types';

interface Props {
  error: IError;
}

const Error: React.FC<Props> = ({ error }) => (
  <div>
    <h1>{error.message}</h1>
    <h2>{error.status}</h2>
    <pre>{error.stack}</pre>
  </div>
);

export default Error;
