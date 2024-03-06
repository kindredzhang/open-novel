import * as fs from 'fs/promises';
export class ConfigLoader {
    static async init() {
        if (!this.config) {
            await this.loadConfig();
        }
    }
    static async loadConfig() {
        try {
            const content = await fs.readFile('config/config.json', 'utf-8');
            this.config = JSON.parse(content);
        }
        catch (error) {
            console.error('Error loading config file:', error);
            throw error;
        }
    }
    static getConfig() {
        return this.config;
    }
}
ConfigLoader.config = null;
