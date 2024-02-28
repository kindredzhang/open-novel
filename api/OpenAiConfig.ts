import * as fs from 'fs/promises';
import {OpenAIConfig} from '../models/Interface.js';

export class ConfigLoader {
  private static config: OpenAIConfig | null = null;

  static async init(): Promise<void> {
    if (!this.config) {
      await this.loadConfig();
    }
  }

  private static async loadConfig(): Promise<void> {
    try {
      const content = await fs.readFile('config/config.json', 'utf-8');
      this.config = JSON.parse(content) as OpenAIConfig;
    } catch (error) {
      console.error('Error loading config file:', error);
      throw error;
    }
  }

  static getConfig(): OpenAIConfig | null {
    return this.config;
  }
}