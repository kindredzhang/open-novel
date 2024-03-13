import { readFileSync } from 'fs';
import { load } from 'js-yaml';
function loadConfig(filePath) {
    try {
        const fileContents = readFileSync(filePath, 'utf8');
        const config = load(fileContents);
        return config;
    }
    catch (err) {
        console.error('Error loading configuration file:', err);
        return { openAi: null, claude: null, postgres: null };
    }
}
const configFile = 'config.yml';
const { openAi, claude, postgres } = loadConfig(configFile);
if (openAi) {
    console.log('OpenAI configuration:');
    console.table(openAi);
}
else {
    console.error('Failed to load OpenAI configuration');
}
if (claude) {
    console.log('Claude configuration:');
    console.table(claude);
}
else {
    console.error('Failed to load Claude configuration');
}
if (postgres) {
    console.log('PostgreSQL configuration:');
    console.table(postgres);
}
else {
    console.error('Failed to load PostgreSQL configuration');
}
