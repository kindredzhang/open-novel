import { queryMessagesByNovelId } from '../mappers/chatHistory.js'
import { fetchClaude } from '../model/claude.js';
import { insertChatHistory } from '../mappers/chatHistory.js'
import { getNovelById } from '../mappers/novel.js';
import { prompt } from '../config.js';


async function generateText(novelId, promptList) {
    // 获取历史聊天记录
    const novel = getNovelById(novelId)
    const existMessage = queryMessagesByNovelId(novel.id);
    // 封装初始prompt
    promptList.unshift(prompt.firstMessage);
    const responseMessages = [];
    for (const prompt of promptList) {
        let chatHistory;
        try {
            chatHistory = await insertChatHistory("user", prompt, novelId, 0);
            existMessage.push(prompt);
            const result = await fetchClaude(novelId, existMessage);
            responseMessages.push(result)
            console.log('API Response:', result);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    return responseMessages;
}


export { generateText }