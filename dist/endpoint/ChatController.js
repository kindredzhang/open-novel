import express from 'express';
import { getMessagesForNovel } from '../services/HistoryService.js';
const app = express();
const port = 3000;
app.use(express.json());
app.post('/generateText', async (req, res) => {
    return getMessagesForNovel(1);
    // try {
    //     await ConfigLoader.init();
    //     const openai = new OpenAI();
    //     const { promptList } = req.body;
    //     if (!Array.isArray(promptList)) {
    //         throw new Error('inputList must be an array');
    //     }
    //     const uuid = uuidv4();
    //     const currentAgent = uuid + "-" + "chat";
    //     const responseMessages: string[] = [];
    //     for (let i = 0; i < promptList.length; i++) {
    //         const history = new History();
    //         const currentMessage: Message = { role: UserRole.USER, content: "帮我扩写一下下边这句话:" + promptList[i] };
    //         await history.writeChatHistory(currentAgent, currentMessage);
    //         const chatHistory = await history.readChatHistory(currentAgent);
    //         const responseMessage = await openai.generateText(chatHistory, currentMessage);
    //         await history.writeFinal(currentAgent, responseMessage.content + '****');
    //         responseMessages.push(responseMessage.content);
    //     }
    //     res.json(responseMessages);
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
