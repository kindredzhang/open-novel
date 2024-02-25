import * as fs from 'fs/promises';

class History {
    async readChatHistory(agent: string): Promise<Array<Message>> {
        const filename = "history/" + agent + ".json";
        try {
          // Read the content of the specified file; if the file doesn't exist, return an empty array.
          const content = await fs.readFile(filename, 'utf-8').catch(() => '[]');
          return JSON.parse(content);
        } catch (error) {
          console.error('Error reading chat history:', error);
          throw error;
        }
    }

    async writeChatHistory(agent: string, newMessage: Message): Promise<void> {
        const filename = "history/" + agent + ".json";
        try {
          // Read the content of the specified file; if the file doesn't exist, return an empty array.
          const content = await fs.readFile(filename, 'utf-8').catch(() => '[]');
          const chatHistory: Array<Message> = JSON.parse(content);
    
          // Add the new message to the chat history
          chatHistory.push(newMessage);
    
          // Write the updated chat history back to the file
          await fs.writeFile(filename, JSON.stringify(chatHistory, null, 2), 'utf-8');
        } catch (error) {
          console.error('Error writing chat history:', error);
          throw error;
        }
      }

    async getMessagesByAgent(agent: string, content: string): Promise<Messages> {
        // read current agent exist chat history
        const agentHistory = new History();
        const chatHistory: Array<Message> = await agentHistory.readChatHistory(agent);
        // current message
        const currentMessage: Message = { role: "user", content: content }
        // Since local conversations require carrying the current content, it is necessary to push it in advance.
        chatHistory.push(currentMessage)
        await agentHistory.writeChatHistory(agent, currentMessage);

        // new messages
        const messages: Messages = {messages: chatHistory};
        return messages;
    }
}


export default History;