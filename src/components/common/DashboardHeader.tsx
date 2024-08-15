"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import { API } from "@/app/api/common/API";
import {Notification } from "@/types/ChatData";

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { EventSourcePolyfill } from "event-source-polyfill";
import { CustomJwtPayload } from "@/types/ChatData";
import { set } from "react-hook-form";

const DashboardHeader = () => {
  // console.log('notification', notification)

  const [notification, setNotification] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => { //새로고침을 해야만 notification이 작동함
  //   setNotification(0)
    const accessToken = Cookies.get('accessToken')

    if (accessToken !== undefined) {
      const decodeToken: CustomJwtPayload = jwtDecode(accessToken as string)
      setUserId(decodeToken.id)
    }
    // const eventSource = new EventSource(`${API.CHATSERVER}/notifications/${userId}`);
    if (userId === '') return;
    const eventSource = new EventSourcePolyfill(`${API.CHATSERVER}/notifications/${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      withCredentials: true
    });
    eventSource.onopen = (event) => {
      console.log('Connection opened:', event);
    };

    eventSource.addEventListener('notification', (event: any) => {
      console.log('Notification event:', event.data);
      setNotification(prev => prev + 1);
    });

    // eventSource.addEventListener('messageRead', (event:any) => {
    //   console.log('Message read event:', event.data);
    //   setNotification(prev => prev + 1);
    // });

    eventSource.addEventListener('error', (e: any) => {
      console.log("An error occurred while attempting to connect.");
      console.error("Error event details:", e);
      console.error("EventSource readyState:", e.target.readyState);
      console.error("EventSource URL:", e.target.url);
      eventSource.close();
    });

    return () => {
      eventSource.close(); // Clean up on unmount
    };
  }, [userId]);


  return (
    <>
      <header className="header-nav nav-homepage-style light-header position-fixed menu-home4 main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link className="logo" href="/">
                      <Image
                        width={138}
                        height={44}
                        src="/images/bangezlogo.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}


                </div>
              </div>
              {/* End .col-auto */}

              <div className="d-none d-lg-block col-lg-auto">
                <MainMenu />
                {/* End Main Menu */}
              </div>
              {/* End d-none d-lg-block */}

              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
                    {/* <li className="d-none d-sm-block">
                      <Link className="text-center mr15" href="/login"> */}
                    {/* <span className="flaticon-email" /> */}
                    {/* </Link>
                    </li> */}
                    {/* End email box */}

                    <li className="d-none d-sm-block">
                      <a className="text-center mr20 notif" href="/dashboard-message">
                        {/* <span className="flaticon-bell" /> */}
                        {
                          !notification ?
                            <MessageOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} />
                            :
                            <MarkUnreadChatAltOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} />
                        }
                      </a>
                    </li>
                    {/* End notification icon */}

                    {/* <li className=" user_setting">
                      <div className="dropdown">
                        <a className="btn" href="#" data-bs-toggle="dropdown">
                          <Image
                            width={44}
                            height={44}
                            src="/images/resource/user.png"
                            alt="user.png"
                          />
                        </a>
                        <div className="dropdown-menu">
                          <div className="user_setting_content">
                            {menuItems.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <p
                                  className={`fz15 fw400 ff-heading ${sectionIndex === 0 ? "mb20" : "mt30"
                                    }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    className={`dropdown-item ${pathname == item.href ? "-is-active" : ""
                                      } `}
                                    href={item.href}
                                  >
                                    <i className={`${item.icon} mr10`} />
                                    {item.text}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li> */}
                    {!userId ?
                      <a
                        href="/login"
                        role="button"
                      >
                        <span className="fw-bold" style={{ fontSize: 14 }}>로그인</span>
                      </a>
                      :
                      <a
                        className="dashboard_sidebar_toggle_icon text-thm1 vam"
                        href="#"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#SidebarPanel"
                        aria-controls="SidebarPanelLabel"
                      >
                        <Image
                          width={25}
                          height={9}
                          className="img-1"
                          src="/images/dark-nav-icon.svg"
                          alt="humberger menu"
                        />
                      </a>}
                    {/* End avatar dropdown */}
                  </ul>
                </div>
              </div>
              {/* End .col-6 */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default DashboardHeader;
