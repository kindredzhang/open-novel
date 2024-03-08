import { readFileSync } from 'fs';
import { load } from 'js-yaml';

type OpenAiConfig = {
  apiKey: string;
  apiUrl: string;
  model: string;
  temperature: number;
};

type ClaudeConfig = {
  apiKey: string;
  model: string;
};

export type PostgresConfig = {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
};

type AppConfig = {
  openAi: OpenAiConfig | null;
  claude: ClaudeConfig | null;
  postgres: PostgresConfig | null;
};

function loadConfig(filePath: string): AppConfig {
  try {
    const fileContents = readFileSync(filePath, 'utf8');
    const config = load(fileContents) as AppConfig;
    return config;
  } catch (err) {
    console.error('Error loading configuration file:', err);
    return { openAi: null, claude: null, postgres: null };
  }
}

const configFile = 'config.yml';
const { openAi, claude, postgres } = loadConfig(configFile);

if (openAi) {
  console.log('OpenAI configuration:');
  console.table(openAi);
} else {
  console.error('Failed to load OpenAI configuration');
}

if (claude) {
  console.log('Claude configuration:');
  console.table(claude);
} else {
  console.error('Failed to load Claude configuration');
}

if (postgres) {
  console.log('PostgreSQL configuration:');
  console.table(postgres);
} else {
  console.error('Failed to load PostgreSQL configuration');
}
