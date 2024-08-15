'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { API } from "@/app/api/common/API";
import { CustomJwtPayload } from "@/types/ChatData";
import { useUserStore } from "@/stores/useUserStore";

const ContactWithAgent = () => {

  const [userId, setUserId] = useState('')

  const user = useUserStore((state) => state.user);
  const receiverId = 6

  const router = useRouter();

  const ClickHandler = () => {
    console.log('click')
    const access = Cookies.get('accessToken')
    if (access) {
      try {
        // fetch(`${API.CHATSERVER}/open-room/${user?.id}/${receiverId}`, {
        fetch(`${API.CHATSERVER}/open-room`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: user?.id,
            receiverId: receiverId,
            roomTitle: '송파레이크파크호반써밋1차'
          }),
        }).then(res => {
          if (res.ok) {
            router.push('/dashboard-message')
          } else {
            alert('채팅방 열기 실패')
          }
        })
      } catch (error) {
        console.log('채팅방 열기 에러', error)
      }

    } else {
      alert('로그인 후 이용해주세요.')
      router.push('/login')
    }
  }

  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">

        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">행복공인중개사</h6>
          <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15">
              <i className="flaticon-call pe-1" />
              (010) 3317-4379
            </a>
          </div>
          <a className="text fz15">
            <i className="flaticon-email" />
            happy@gmail.com
          </a>

        </div>
      </div>

      <div className="d-grid">
        <button onClick={() => ClickHandler()} className="ud-btn btn-white2">
          채팅하기
          <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </>
  );
};

export default ContactWithAgent;
