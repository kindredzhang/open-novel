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

    async generateText(currentAgent: string, messages: Messages) :Promise<Message> {
        // open-ai request body
        const chatRequest: ChatRequest = {
            model: this.config.model,
            messages: messages,
            temperature: this.config.temperature,
        };
    
        try {
          const result = await this.callAPI(chatRequest);
          // get current response message and add to chat history
          const currentResponseMessage : Message = result.choices[0].message;
          return currentResponseMessage;
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