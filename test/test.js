// test to read config.json
import 'esm';
import config from '../config.json' assert { type: 'json' };

console.log(config.apiKey);
console.log(config.apiUrl);
