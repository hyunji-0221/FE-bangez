import { API } from "@/app/api/common/API";
import { ChatBoxTypes, UserChatBoxContentModel } from "@/types/ChatData";
import { SubmitHandler, useForm } from "react-hook-form";


const ChatBoxForm = ({ ChatBoxFormModels }: { ChatBoxFormModels: UserChatBoxContentModel }) => {

  const roomId = ChatBoxFormModels.roomId;
  const userId = ChatBoxFormModels.senderId;
  const receiverId = ChatBoxFormModels.receiverId;

  // console.log('roomId', roomId)

  const {
    register,
    handleSubmit,
    reset
  } = useForm<ChatBoxTypes>();

  const onSubmit: SubmitHandler<ChatBoxTypes> = async (data) => {
    console.log('chatbox 들어옴', data.message)
    await fetch(`${API.CHATSERVER}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatRoomId: data.roomId,
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message
      })
    }).catch(error => {
      console.log('채팅 전송 에러', error)
    })
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="d-flex align-items-center ">
      <input {...register("roomId", { required: true })} value={roomId}></input>
      <input {...register("senderId", { required: true })} type="hidden" value={userId}></input>
      <input {...register("receiverId", { required: true })} type="hidden" value={receiverId}></input>
      <input
        {...register("message", { required: true })}
        className="form-control"
        type="search"
        placeholder="Type a Message"
        aria-label="Search"
        required
      />
      <button type="submit" className="btn ud-btn btn-thm my-button">
        Send Message
        <i className="fal fa-arrow-right-long" />
      </button>
    </form>

  );
};

export default ChatBoxForm;