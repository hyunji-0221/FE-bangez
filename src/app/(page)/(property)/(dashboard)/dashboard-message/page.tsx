'use client';
import { API } from "@/app/api/common/API";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import SearchBox from "@/components/property/dashboard/dashboard-message/SearchBox";
import UserChatBoxContent from "@/components/property/dashboard/dashboard-message/UserChatBoxContent";
import UserInboxList from "@/components/property/dashboard/dashboard-message/UserInboxList";
import Image from "next/image";
import ChatBoxForm from "@/components/property/dashboard/dashboard-message/ChatBoxForm";
import { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import { CustomJwtPayload } from "@/types/ChatData";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useRouter } from "next/navigation";


const DashboardMessage = () => {

  const [roomId, setRoomId] = useState('')
  const [receiverId, setReceiverId] = useState('')
  const [userId , setUserId] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    const access = Cookies.get('accessToken')
    if(access){
      const decodedToken:CustomJwtPayload = jwtDecode(access as string); // 토큰 디코딩 함수
      const id = decodedToken.id;
      setUserId(id)
    }
  },[])

  // const [notification, setNotification] = useState(0);
  
  // useEffect(() => { //새로고침을 해야만 notification이 작동함
  //   setNotification(0)
  //   const accessToken = Cookies.get('accessToken')

  //   if (accessToken !== undefined) {
  //     const decodeToken: CustomJwtPayload = jwtDecode(accessToken as string)
  //     setUserId(decodeToken.id)
  //   }
  //   // const eventSource = new EventSource(`${API.CHATSERVER}/notifications/${userId}`);
  //   if (userId === '') return;
  //   const eventSource = new EventSourcePolyfill(`${API.CHATSERVER}/notifications/${userId}`, {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`,
  //     },
  //     withCredentials: true
  //   });
  //   eventSource.onopen = (event) => {
  //     console.log('Connection opened:', event);
  //   };

  //   eventSource.addEventListener('notification', (event: any) => {
  //     console.log('Notification event:', event.data);
  //     setNotification(prev => prev + 1);
  //   });

  //   // eventSource.addEventListener('messageRead', (event:any) => {
  //   //   console.log('Message read event:', event.data);
  //   //   setNotification(prev => prev + 1);
  //   // });

  //   eventSource.addEventListener('error', (e: any) => {
  //     console.log("An error occurred while attempting to connect.");
  //     console.error("Error event details:", e);
  //     console.error("EventSource readyState:", e.target.readyState);
  //     console.error("EventSource URL:", e.target.url);
  //     eventSource.close();
  //   });

  //   return () => {
  //     eventSource.close(); // Clean up on unmount
  //   };
  // }, [userId, ]);

  const router = useRouter();
  const handleDeleteConversation = () => {
    if(confirm('채팅방을 삭제하시겠습니까?')){
      fetch(`${API.CHATSERVER}/delete-room/${roomId}`,{
        method:'DELETE'
      }).then(res => {
        console.log('삭제 성공', res)
        router.push('/dashboard/message')
      }).catch(error => {
        console.log('삭제 실패', error)
      })
    }else{
      return
    }
  }

  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr150 pr0-xl">
          {/* <SidebarDashboard /> */}
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  {/* <DboardMobileNavigation /> */}
                </div>
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Messages</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
                {/* col-lg-12 */}
              </div>
              {/* End .row */}

              <div className="row mb40">
                <div className="col-lg-6 col-xl-5 col-xxl-4">
                  <div className="message_container">
                    <div className="inbox_user_list">
                      {/* <div className="iu_heading pr35">
                        <div className="chat_user_search">
                          <SearchBox />
                        </div>
                      </div> */}
                      {/* End search box */}

                      <div className="chat-member-list pr20">
                        <UserInboxList setRoomId={setRoomId} setReceiverId={setReceiverId} setTitle={setTitle}/>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col-6 */}

                <div className="col-lg-6 col-xl-7 col-xxl-8">
                  <div className="message_container mt30-md">
                    <div className="user_heading px-0 mx30">
                      <div className="wrap">
                        <span className="contact-status online" />
                        {receiverId ? <Image
                          width={50}
                          height={50}
                          className="img-fluid mr10"
                          src="/images/default_user_img.svg"
                          alt="ms3.png"
                        /> : null}
                        <div className="meta d-sm-flex justify-content-sm-between align-items-center">
                          <div className="authors">
                            <h6 className="name mb-0">
                              {title}
                              </h6>
                            {/* <p className="preview">Active</p> */}
                          </div>
                          <div>
                            {roomId && <a
                              className="text-decoration-underline fz14 fw600 dark-color ff-heading"
                              onClick={handleDeleteConversation}
                            >
                              대화 삭제하기
                            </a>}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End .user_heading */}

                    <div className="inbox_chatting_box">
                      <UserChatBoxContent UserChatBoxContentModels={{ roomId: `${roomId}`, senderId: `${userId}`, receiverId: "", title:`${title}` }} />
                    </div>
                    {/* End inbox-chatting */}

                    <div className="mi_text">
                      <div className="message_input">
                        <ChatBoxForm ChatBoxFormModels={{ roomId: `${roomId}`, senderId: `${userId}`, receiverId: "2", title:`${title}` }} />
                      </div>
                    </div>
                    {/* End button */}
                  </div>
                </div>
                {/* End .col-6 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMessage;
