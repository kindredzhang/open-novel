import * as fs from 'fs/promises';
import * as path from 'path';
export class History {
    async readChatHistory(agent) {
        const filename = path.join("history", agent + ".json");
        try {
            // Read the content of the specified file; if the file doesn't exist, return an empty array.
            const content = await fs.readFile(filename, 'utf-8').catch(() => '[]');
            // Parse JSON content, or return an empty array if content is empty
            return content ? JSON.parse(content) : [];
        }
        catch (error) {
            console.error('Error reading chat history:', error);
            throw error;
        }
    }
    async writeChatHistory(agent, message) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const filename = path.join("history", agent + ".json");
        try {
            let messagesArray = [];
            // Check if file exists
            const fileExists = await fs.access(filename).then(() => true).catch(() => false);
            if (fileExists) {
                // If file exists and is not empty, read current messages
                const content = await fs.readFile(filename, 'utf-8');
                if (content !== '') {
                    messagesArray = JSON.parse(content);
                }
            }
            // Add new message to array
            messagesArray.push(message);
            // Ensure directory exists
            await fs.mkdir(path.dirname(filename), { recursive: true });
            // Serialize messages array to JSON string
            const content = JSON.stringify(messagesArray);
            // Write content to file
            await fs.writeFile(filename, content, { encoding: 'utf-8' });
        }
        catch (error) {
            console.error('Error writing chat history:', error);
            throw error;
        }
    }
    async writeFinal(agent, content) {
        const filename = "history/" + agent + "-" + "final.text";
        try {
            await fs.writeFile(filename, content + '*******', 'utf-8');
        }
        catch (error) {
            console.error('Error writing chat history:', error);
            throw error;
        }
    }
}
