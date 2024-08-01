import { API } from "@/app/api/common/API";
import { ChatMessageProps } from "@/module/chat/Chat";
import { ChatModel, UserChatBoxContentModel } from "@/types/ChatData";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

const UserChatBoxContent = ({ UserChatBoxContentModels }: { UserChatBoxContentModels: UserChatBoxContentModel }) => {
  const roomId = UserChatBoxContentModels.roomId
  const userId = UserChatBoxContentModels.senderId
  const receiverId = UserChatBoxContentModels.receiverId

  const [prevMessages, setPrevMessages] = useState<ChatModel[]>([])

  const messageEndRef = useRef<HTMLUListElement>(null);
  const scrollToBottom = () => {
    messageEndRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth', block: 'nearest'
    });
  };



  useEffect(() => {
    console.log('roomId ', roomId)
    setPrevMessages([])
    if (roomId === '') return
    fetch(`${API.CHATSERVER}/read/${roomId}/1`, {
      method: 'GET'
    }).then(res => {
      console.log('채팅 내용 : ', res)
    }).catch(error => {
      console.log('채팅 내용 에러 발생', error)
    })

    // const eventSource = new EventSource(`${API.CHATSERVER}/sse/${roomId}`);
    const eventSource = new EventSourcePolyfill(`${API.CHATSERVER}/sse/${roomId}`, {
      headers: {
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlzcyI6ImJpdGNhbXAiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyMTcyNjU0MCwiZXhwIjoxNzIxNzI5NTQwfQ.vTq2ITDbBv5eAHJZhyXqwLYa5Xd17kFzhvC6BVmurmo'
      }, withCredentials: true
    });
    eventSource.onopen = (event) => {
      console.log('Connection opened:', event);
    };
    eventSource.onmessage = (event) => {
      console.log('Message received:', event.data);
      setPrevMessages(prevMessage => [...prevMessage, JSON.parse(event.data)]);
    };
    eventSource.addEventListener('error', (e: any) => {
      console.log("An error occurred while attempting to connect.");
      console.error("Error event details:", e);
      console.error("EventSource readyState:", e.target.readyState);
      console.error("EventSource URL:", e.target.url);
      eventSource.close();
    });
    return () => {
      eventSource.close();
    }
  }, [roomId])

  useEffect(() => {
    scrollToBottom();
  }, [prevMessages])

  return (
    <ul ref={messageEndRef} className="chatting_content" >
      {prevMessages.map((message, index) => (
        <ChatMessage key={index} message={message} userId={userId} />
      ))}
    </ul>
  );
};

const ChatMessage: React.FC<{ message: ChatModel, userId: string }> = ({ message, userId }) => {
  return (
    <li className={message.senderId === userId ? 'reply float-end' : 'sent float-start'}>
      <div
        className={`d-flex align-items-center
          ${message.senderId !== userId ? "mb15" : "justify-content-end mb15"}`}>

        {message.senderId !== userId
          && (<Image
            width={50}
            height={50}
            className="img-fluid rounded-circle align-self-start mr10"
            src="/images/default_user_img.svg"
            alt={`${message.senderId}'s profile`}
          />)}

        <div
          className={`title fz14 ${message.senderId === userId ? "mr10" : "ml10"}`}>
          {/* <div className="text-black text-[14px]">{message.timeStamp?.toString().slice(0, 10)}</div> */}
          {message.senderId === userId
            ? (
              <small>{new Date(message.timeStamp)?.toLocaleTimeString('ko-KR', { hour12: true }).slice(0, 8)}</small>
            )
            : (<>
              {/*{message.name}*/}
              {message.senderId} <small className="ml10">{message.timeStamp}</small>
            </>)}
        </div>

        {/* {message.userId === "1"
          && (<Image
            width={50}
            height={50}
            className="img-fluid rounded-circle align-self-end ml10"
            src={message.imageUrl}
            alt={`${message.name}'s profile`}
          />) } */}

      </div>
      <p>{message.message}</p>
    </li>
  );
};

export default UserChatBoxContent;
