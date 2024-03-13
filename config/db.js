import { database } from '../config.js';
import pkg from 'pg';

const { Client } = pkg;
const { username, password, host, port, name } = database;

const connectionString = `postgresql://${username}:${password}@${host}:${port}/${name}`;

const client = new Client({
  connectionString: connectionString,
});

export { client };
