export interface ChatMessageProps {
    className: string;
    imageUrl: string;
    name: string;
    time: string;
    message: string;
}

export interface ChatMessage {
    id: string;
    chatRoomId: string;
    senderId: string;
    receiverId: string;
    message: string;
    timeStamp: string;
    status: string;
}