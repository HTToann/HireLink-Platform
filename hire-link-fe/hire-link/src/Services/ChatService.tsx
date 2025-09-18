import { Client, IMessage } from '@stomp/stompjs';
import axiosInstance from '../Components/Interceptor/AxiosInterceptor';
import { endpoints } from '../Configs/Apis';

let stompClient: Client | null = null;
let isConnected = false;

export interface ChatMessage {
    id?: string;
    clientId?: string;  // 👈 FE-only id để match optimistic message
    sender: string;
    senderName?: string;
    senderAvatarUrl?: string;
    recipient: string;
    recipientAvatarUrl?: string;
    content: string;
    timestamp?: string;
}

export const connectChat = (
    jwtToken: string,
    currentUserId: string,
    onMessage: (msg: ChatMessage) => void,
    onConnectedCallback?: () => void,
    onError?: (error: string) => void
): void => {
    const socket = new WebSocket('ws://localhost:8080/ws');
    stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
            Authorization: `Bearer ${jwtToken}`
        },

        onConnect: () => {
            isConnected = true;
            console.log('[STOMP] Connected');

            stompClient?.subscribe(`/user/queue/messages`, (message: IMessage) => {
                try {
                    const payload: ChatMessage = JSON.parse(message.body);
                    onMessage(payload);
                } catch (err) {
                    console.error('[STOMP] Parse error:', err);
                }
            });

            onConnectedCallback?.();
        },

        onStompError: (frame) => {
            console.error('[STOMP] STOMP error:', frame);
            isConnected = false;
            onError?.(frame.headers['message'] || 'Unknown error');
        },

        onWebSocketClose: (evt) => {
            console.warn('[STOMP] WebSocket closed:', evt);
            isConnected = false;
        }
    });

    stompClient.activate();
};

export const sendPrivateMessage = (message: ChatMessage): void => {
    if (!stompClient || !isConnected) {
        console.warn('[STOMP] Not connected');
        return;
    }
    stompClient.publish({
        destination: '/app/chat.private',
        body: JSON.stringify(message),
    });
};

export const disconnectChat = (): void => {
    if (stompClient?.connected) {
        stompClient.deactivate();
        stompClient = null;
        isConnected = false;
    }
};

export const getConnectionStatus = (): boolean => isConnected;

export const loadMessages = async (recipientId: string): Promise<ChatMessage[]> => {
    const res = await axiosInstance.get(endpoints.loadMessages(recipientId));
    return res.data;
};

export const loadContacts = async () => {
    const res = await axiosInstance.get(endpoints.contactConversations);
    return res.data;
};

export const deleteMessage = async (otherUserId: string) => {
    const res = await axiosInstance.delete(endpoints.deleteMessage(otherUserId));
    return res.data;
};

export const longPollMessages = async (recipientId: string, after: string) => {
    const res = await axiosInstance.get(endpoints.longPollMessages(recipientId, after));
    return res.data;
};