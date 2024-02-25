// configure file model
interface OpenAIConfig {
    apiKey: string;
    apiUrl: string;
    model: string;
    temperature: number;
}

// api request body model
interface ChatRequest {
    model: string;
    messages: Messages;
    temperature: number;
}
// api request body messages (chat history)
interface Messages {
    messages: Array<Message>;
}

// chat history
interface Message {
    role: string;
    content: string;
}
