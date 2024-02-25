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
    messages: Array<Message>;
    temperature: number;
}

// chat history
interface Message {
    role: string;
    content: string;
}
