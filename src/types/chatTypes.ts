export interface Chat {
    message?: string;
    type?: 'question' | 'answer';
    created?: number | string;
}

export interface ChatHistoryProps {
    chat: Chat[];
    title: string;
    id: string;
    created?: number | string;
}

export interface ChatItem {
    message: string;
    type: 'question' | 'answer';
    created?: number;
    loading?: boolean;
}
