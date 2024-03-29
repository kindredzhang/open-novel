import {ConfigLoader} from './OpenAiConfig.js';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {UserRole} from '../models/Enum.js'
import { OpenAIConfig } from '../models/Interface.js';
import { Message, Messages, ChatRequest} from '../models/Interface.js';

export class OpenAI {
  private config: OpenAIConfig;

  constructor() {
      const loadedConfig = ConfigLoader.getConfig();
  
      if (!loadedConfig) {
        throw new Error('Config not loaded. Call ConfigLoader.loadConfig() first.');
      }
  
      this.config = loadedConfig;
  }

    async generateText(chatHistory: Array<Message>, currentMessage: Message, attempt: number = 0): Promise<Message> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const maxAttempts = 5;

        if (attempt >= maxAttempts) {
            throw new Error('Max attempt limit reached.');
        }

        // 添加当前消息到聊天历史
        const updatedChatHistory = [...chatHistory, currentMessage];
        
        const chatRequest: ChatRequest = {
            model: this.config.model,
            messages: updatedChatHistory,
            temperature: this.config.temperature,
        };

        try {
            const result = await this.callAPI(chatRequest);
            const responseMessage: Message = result.choices[0].message;
            // return responseMessage;
            const checkMessage = await this.checkGenerateText(responseMessage.content);

            // 如果不以"1"开头，将checkMessage追加到聊天历史并再次请求
            if (!checkMessage.content.startsWith("1")) {
                const feedbackMessage: Message = {
                    role: UserRole.USER,
                    content: checkMessage.content
                };
                return this.generateText([...updatedChatHistory, feedbackMessage], currentMessage, attempt + 1);
            } else {
                return responseMessage;
            }
        } catch (error) {
            console.error('Error generating text:', error);
            throw error;
        }
    }
  
    async checkGenerateText(content: string): Promise<Message> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // open-ai request body
        const chatRequest: ChatRequest = {
            model: this.config.model,
            //模拟真实逻辑判断
            // messages: [{ role: UserRole.USER, content: '只能以数字1或者2回答我，判断逻辑是否合理，合理返回1，不合理返回2,不合理的时候应该给我详细说明不合理的原因。下面是我的文章' + content }],
            //模拟逻辑合理
            messages: [{ role: UserRole.USER, content: '回答我数字1'}],
            //逻辑逻辑不合理
            // messages: [{ role: UserRole.USER, content: '回答我数字2'}],
            temperature: this.config.temperature,
        };

        try {
            const result = await this.callAPI(chatRequest);
            // get current response message and add to chat history
            const message: Message = result.choices[0].message;
            return message;
        } catch (error) {
            console.error('Error checking generated text:', error);
            throw error;
        }
    }


    async callAPI(data: ChatRequest): Promise<any> {
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
