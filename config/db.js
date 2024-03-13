import { database } from '../config.js';
import pkg from 'pg';

const { Client } = pkg;
const { username, password, host, port, name } = database;

const connectionString = `postgresql://${username}:${password}@${host}:${port}/${name}`;

const client = new Client({
  connectionString: connectionString,
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
    client.end();
  })
  .catch(error => console.error('Error:', error));
