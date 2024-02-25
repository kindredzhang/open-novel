import ConfigLoader from './OpenAiConfig';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class OpenAI {
    private config: OpenAIConfig;

    constructor() {
        const loadedConfig = ConfigLoader.getConfig();
    
        if (!loadedConfig) {
          throw new Error('Config not loaded. Call ConfigLoader.loadConfig() first.');
        }
    
        this.config = loadedConfig;
    }

    async generateText(content: string) {
        // open-ai request body
        const chatRequest: ChatRequest = {
            model: this.config.model,
            messages: [{ role: "user", content: content }],
            temperature: this.config.temperature,
        };
    
        try {
          const result = await this.callAPI(chatRequest);
          // add chat history
          return result.choices[0].message.content;
        } catch (error) {
          console.error('Error calling OpenAI API:', error);
          throw error;
        }
    }

    private async callAPI(data: ChatRequest): Promise<any> {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        };
    
        const options: AxiosRequestConfig = {
          method: 'post',
          url: this.config.apiUrl,
          headers,
          data,
        };
    
        const response: AxiosResponse = await axios(options);
        return response.data;
    }
}

export default OpenAI;