// configure file model
export interface OpenAIConfig {
    apiKey: string;
    apiUrl: string;
    model: string;
    temperature: number;
}

// api request body model
export interface ChatRequest {
    model: string;
    messages: Array<Message>;
    temperature: number;
}
// api request body messages (chat history)
export interface Messages {
    messages: Array<Message>;
}

// chat history
export interface Message {
    role: string;
    content: string;
}

export interface OpenAIConfig {
    apiKey: string;
    apiUrl: string;
    model: string;
    temperature: number;
}