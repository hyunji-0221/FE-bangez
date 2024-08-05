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
  } = useForm<ChatBoxTypes>({
    defaultValues: {
      roomId: roomId,
      senderId: userId,
      receiverId: receiverId
    }
  });

  const onSubmit: SubmitHandler<ChatBoxTypes> = async (data) => {
    console.log('message 들어옴', data.message)
    console.log('roomId 들어옴', roomId)
    console.log('senderId 들어옴', userId)
    console.log('receiverId 들어옴', receiverId)
    await fetch(`${API.CHATSERVER}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatRoomId:roomId,
        senderId: userId,
        receiverId: receiverId,
        message: data.message
      })
    }).catch(error => {
      console.log('채팅 전송 에러', error)
    })
    reset({
      message:''
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="d-flex align-items-center ">
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