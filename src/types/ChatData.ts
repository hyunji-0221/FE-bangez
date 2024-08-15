import { JwtPayload } from "jwt-decode"

export type ChatBoxTypes = {
    roomId: string,
    senderId: string,
    receiverId: string,
    message: string
}

export interface UserChatUserId {
    senderId: string,
}

export interface UserChatBoxContentModel extends UserChatUserId {
    roomId: string,
    receiverId: string
    title: string
}

export interface ChatModel extends UserChatBoxContentModel {
    message: string,
    timeStamp: string,
    read: string
}

export interface ChatRoomModel {
    id: string,
    roomTitle: string,
    senderId: string,
    receiverId: string,
    createDate: Date
}

export interface CustomJwtPayload extends JwtPayload {
    id: string
}

export interface UserId {
    userId: string
}

export interface UserInboxProps {
    setRoomId: React.Dispatch<React.SetStateAction<string>>,
    setReceiverId: React.Dispatch<React.SetStateAction<string>>,
    UserId: { userId: string }
}

export type Notification = {
    userId: string,
    notification: number
}