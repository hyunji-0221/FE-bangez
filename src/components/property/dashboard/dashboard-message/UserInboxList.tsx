import { API } from "@/app/api/common/API";
import { ChatRoomModel } from "@/types/ChatData";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

// interface ChatUsersProps {
//   roomId: string,
//   receiverId: string,
//   name: string;
//   position: string;
//   imageUrl: string;
//   notificationStatus?: string;
// }

// const users: ChatUsersProps[] = [
//   {
//     roomId: '668e475eb73f2a1eaa46ad00',
//     receiverId: '2',
//     name: "Darlene Robertson",
//     position: "Head of Development",
//     imageUrl: "/images/inbox/ms1.png",
//     notificationStatus: "online",
//   },
//   {
//     roomId: '668e475eb73f2a1eaa46ad00',
//     receiverId: '2',
//     name: "Jane Cooper",
//     position: "Head of Development",
//     imageUrl: "/images/inbox/ms2.png",
//     notificationStatus: "none",
//   },
//   {
//     roomId: '668e475eb73f2a1eaa46ad00',
//     receiverId: '2',
//     name: "Arlene McCoy",
//     position: "Head of Development",
//     imageUrl: "/images/inbox/ms3.png",
//     notificationStatus: "away",
//   },
// ];

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

  const [rooms, setRooms] = useState<ChatRoomModel[]>([]);

  useEffect(() => {
    fetch(`${API.CHATSERVER}/get-room-list/${userId}`, {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWFAYWFhLmNvbSIsImlzcyI6ImJpdGNhbXAiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyMTcwMTk5NywiZXhwIjoxNzIxNzA0OTk3fQ.hoAg7pY8ienSPifxELqJ3JBq2lwIs_Hmvtrb17heJ-k'
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
      {
        rooms.map((room, index) => (
          <UserItem key={index} room={{
            id: room.id,
            roomTitle: room.roomTitle,
            senderId: room.senderId,
            receiverId: room.receiverId,
            createDate: room.createDate
          }} setRoomId={setRoomId} setReceiverId={setReceiverId} />
        ))
      }
    </>
  );
};

export default UserInboxList;
