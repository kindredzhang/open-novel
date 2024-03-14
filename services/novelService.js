import { queryMessagesByNovelId } from '../mappers/chatHistory.js'
import fetchClaude from '../model/claude.js';
import { insertChatHistory } from '../mappers/chatHistory.js'

async function generateText(novelId, promptList) {
    const existMessage = queryMessagesByNovelId(novelId);
    for (const prompt of promptList) {
        let chatHistory;
        try {
            chatHistory = await insertChatHistory("user", prompt, novelId, 0);
            existMessage.push(prompt);
            const result = await fetchClaude(novelId, existMessage);

            console.log('API Response:', checkedResult);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}



export { generateText }