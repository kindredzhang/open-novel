import * as fs from 'fs/promises';

interface OpenAIConfig {
  apiKey: string;
  apiUrl: string;
  model: string;
  temperature: number;
}

class ConfigLoader {
  private static config: OpenAIConfig | null = null;

  static async loadConfig(): Promise<void> {
    try {
      const content = await fs.readFile('config/config.json', 'utf-8');
      ConfigLoader.config = JSON.parse(content) as OpenAIConfig;
    } catch (error) {
      console.error('Error loading config file:', error);
      throw error;
    }
  }

  static getConfig(): OpenAIConfig | null {
    return ConfigLoader.config;
  }
}

export default ConfigLoader;
