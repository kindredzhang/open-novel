var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from 'fs/promises';
export class History {
    readChatHistory(agent) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = "history/" + agent + ".json";
            try {
                // Read the content of the specified file; if the file doesn't exist, return an empty array.
                const content = yield fs.readFile(filename, 'utf-8').catch(() => '[]');
                return JSON.parse(content);
            }
            catch (error) {
                console.error('Error reading chat history:', error);
                throw error;
            }
        });
    }
    writeChatHistory(agent, newMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = "history/" + agent + ".json";
            try {
                // Read the content of the specified file; if the file doesn't exist, return an empty array.
                const content = yield fs.readFile(filename, 'utf-8').catch(() => '[]');
                const chatHistory = JSON.parse(content);
                // Add the new message to the chat history
                chatHistory.push(newMessage);
                // Write the updated chat history back to the file
                yield fs.writeFile(filename, JSON.stringify(chatHistory, null, 2), 'utf-8');
            }
            catch (error) {
                console.error('Error writing chat history:', error);
                throw error;
            }
        });
    }
    getMessagesByAgent(agent, content) {
        return __awaiter(this, void 0, void 0, function* () {
            // read current agent exist chat history
            const agentHistory = new History();
            const chatHistory = yield agentHistory.readChatHistory(agent);
            // current message
            const currentMessage = { role: "user", content: content };
            // Since local conversations require carrying the current content, it is necessary to push it in advance.
            chatHistory.push(currentMessage);
            yield agentHistory.writeChatHistory(agent, currentMessage);
            // new messages
            return chatHistory;
        });
    }
    writeFinal(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = "history/final.json";
            try {
                yield fs.writeFile(filename, content + '*******', 'utf-8');
            }
            catch (error) {
                console.error('Error writing chat history:', error);
                throw error;
            }
        });
    }
}
