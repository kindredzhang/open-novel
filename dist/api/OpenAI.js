var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ConfigLoader from './OpenAiConfig';
import axios from 'axios';
import { UserRole } from '../models/Enum';
import { History } from './History';
export class OpenAI {
    constructor() {
        const loadedConfig = ConfigLoader.getConfig();
        if (!loadedConfig) {
            throw new Error('Config not loaded. Call ConfigLoader.loadConfig() first.');
        }
        this.config = loadedConfig;
    }
    generateText(chatHistory, currentMessage, attempt = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxAttempts = 5;
            if (attempt >= maxAttempts) {
                throw new Error('Max attempt limit reached.');
            }
            // 添加当前消息到聊天历史
            const updatedChatHistory = [...chatHistory, currentMessage];
            const chatRequest = {
                model: this.config.model,
                messages: { messages: updatedChatHistory },
                temperature: this.config.temperature,
            };
            try {
                const result = yield this.callAPI(chatRequest);
                const responseMessage = result.choices[0].message;
                const checkMessage = yield this.checkGenerateText(responseMessage.content);
                // 如果不以"1"开头，将checkMessage追加到聊天历史并再次请求
                if (!checkMessage.content.startsWith("1")) {
                    const feedbackMessage = {
                        role: UserRole.USER,
                        content: checkMessage.content
                    };
                    return this.generateText([...updatedChatHistory, feedbackMessage], currentMessage, attempt + 1);
                }
                else {
                    const history = new History();
                    history.writeFinal(responseMessage.content);
                }
                return responseMessage;
            }
            catch (error) {
                console.error('Error calling OpenAI API:', error);
                throw error;
            }
        });
    }
    checkGenerateText(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = {
                messages: [{ role: UserRole.USER, content: '只能以数字1或者2回答我，判断逻辑是否合理，合理返回1，不合理返回2,不合理的时候应该给我详细说明不合理的原因。下面是我的文章' + content }],
            };
            // open-ai request body
            const chatRequest = {
                model: this.config.model,
                messages: messages,
                temperature: this.config.temperature,
            };
            try {
                const result = yield this.callAPI(chatRequest);
                // get current response message and add to chat history
                const message = result.choices[0].message;
                return message;
            }
            catch (error) {
                console.error('Error calling OpenAI API:', error);
                throw error;
            }
        });
    }
    callAPI(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`,
            };
            const options = {
                method: 'post',
                url: this.config.apiUrl,
                headers,
                data,
            };
            const response = yield axios(options);
            return response.data;
        });
    }
}
