import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { Sequelize } from 'sequelize';
const configFile = 'config.yml';
const config = yaml.load(fs.readFileSync(configFile, 'utf8'));
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'postgres',
});
export default sequelize;
