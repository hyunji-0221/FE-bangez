'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { API } from "@/app/api/common/API";
import { CustomJwtPayload } from "@/types/ChatData";

const ContactWithAgent = () => {

  const receiverId = '100'
  const [userId, setUserId] = useState('')

  const router = useRouter();

  const ClickHandler = () => {
    console.log('click')
    const access = Cookies.get('accessToken')
    if(access){
      const decodedToken:CustomJwtPayload = jwtDecode(access as string); // 토큰 디코딩 함수
      const id = decodedToken.id;
      setUserId(id)

      fetch(`${API.CHATSERVER}/open-room/${userId}/${receiverId}`,{
        method:"GET",
      }).then(res => {
        console.log('채팅방 생성', res)
        router.push('/dashboard-message')
      }).catch(error => {
        console.log('채팅방 생성 에러',error)
      })

    }else{
      alert('로그인 후 이용해주세요.')
      router.push('/login')
    }
  }

  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <Image
            width={90}
            height={90}
            className="w90"
            src="/images/team/agent-3.png"
            alt="avatar"
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">Arlene McCoy</h6>
          <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-call pe-1" />
              (920) 012-3421
            </a>
          </div>
          <Link
            href="/agent-single/3"
            className="text-decoration-underline fw600"
          >
            View Listings
          </Link>
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid">
        <button onClick={()=>ClickHandler()} className="ud-btn btn-white2">
          채팅하기
          <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </>
  );
};

export default ContactWithAgent;
