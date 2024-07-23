export type ChatBoxTypes = {
    roomId: string,
    senderId: string,
    receiverId: string,
    message: string
}

export interface UserChatBoxContentModel {
    roomId: string,
    senderId: string,
    receiverId: string
}

export interface ChatModel extends UserChatBoxContentModel {
    message: string,
    timeStamp: string,
    read: string
}

export interface ChatRoomModel {
    id:string,
    roomTitle:string,
    senderId:string,
    receiverId:string,
    createDate:Date
}