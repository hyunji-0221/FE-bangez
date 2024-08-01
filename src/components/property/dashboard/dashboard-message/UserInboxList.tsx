import { API } from "@/app/api/common/API";
import { ChatRoomModel } from "@/types/ChatData";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { set } from "react-hook-form";

import Cookies from "js-cookie";

const UserItem: React.FC<{
  room: ChatRoomModel
  , setRoomId: Dispatch<SetStateAction<string>>
  , setReceiverId: Dispatch<SetStateAction<string>>
}> = ({ room, setRoomId, setReceiverId }) => {
  return (
    <div className="list-item">
      <button className="my-chat_roomListBtn" onClick={() => {
        setRoomId(room.id);
        setReceiverId(room.receiverId);
      }}>
        <div className="d-flex align-items-center position-relative">
          <Image
            width={50}
            height={50}
            className="img-fluid float-start rounded-circle mr10"
            src='/images/default_user_img.svg'
            alt={`${room.receiverId}'s profile`}
          />
          <div className="d-sm-flex">
            <div className="d-inline-block">
              <div className="fz14 fw600 dark-color ff-heading mb-0">
                {room.roomTitle}
              </div>
              {/* <p className="preview">{room.position}</p> */}
            </div>
            <div className="iul_notific">
              {/* <small>35 mins</small> */}
              {/* {user.notificationStatus !== undefined && (
                <div className={`m_notif ${user.notificationStatus}`}>2</div>
              )} */}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

const UserInboxList: React.FC<{
  setRoomId: Dispatch<SetStateAction<string>>
  , setReceiverId: Dispatch<SetStateAction<string>>
}> = ({ setRoomId, setReceiverId }) => {
  
  const userId = '1';
  const [accessToken, setAccessToken] = useState<string|undefined>('');

  const [rooms, setRooms] = useState<ChatRoomModel[]>([]);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    console.log('accessTokenㅗ', accessToken);
    setAccessToken(accessToken);
    fetch(`${API.CHATSERVER}/get-room-list/${userId}`, {
      method: 'GET',
      headers:  {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }).then(res => res.json())
      .then(data => {
        console.log('채팅방 리스트', data)
        setRooms(data);
      }).catch(error => {
        console.log('채팅방 리스트 에러', error)
      })
  }, []);

  return (
    <>
      {/* {users.map((user, index) => (
        <UserItem key={index} user={user} setRoomId={setRoomId} setReceiverId={setReceiverId} />
      ))} */}
      {rooms.length === 0
        ? <h4 className="my-chat_roomEmpty">채팅방이 없습니다.</h4>
        :
        rooms.map((room, index) => (
          <UserItem key={index} room={{
            id: room.id,
            roomTitle: room.roomTitle,
            senderId: room.senderId,
            receiverId: room.receiverId,
            createDate: room.createDate
          }} setRoomId={setRoomId} setReceiverId={setReceiverId} />
        ))}
        
    </>
  );
};

export default UserInboxList;
