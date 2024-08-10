import React from "react";
import Cookies from 'js-cookie';
import { API } from "@/app/api/common/API";

const accessToken = Cookies.get("accessToken");
console.log("Footer accessToken: ", accessToken);

const MenuWidget = () => {
  const menuSections = [
    {
      title: "매물",
      links: [
        { label: "매물 보기", href: "/map-v4" },
      ],
    },

    {
      title: "게시판",
      links: [
        { label: "방 구해요", href: "/buy-board" },
        { label: "방 내놓아요", href: "/sell-board" },
      ],
    },
  ];

  return (
    <>
      <div className="col-sm-6 col-lg-3">
        <div className="footer-widget mb-4 mb-lg-5 ps-0 ps-lg-5">
          <div className="link-style1 light-style mb-3">
            <h6 className="mb25">입지 정보</h6>
            <ul className="ps-0">
              <li>
                <a href="/statistics-board">부동산 통계 정보</a>
              </li>
              <li>
                <a href="/school-list">학교 정보</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        {menuSections.map((section, index) => (
          <div className="footer-widget mb-4 mb-lg-5 ps-0 ps-lg-5" key={index}>
            <div className="link-style1 light-style mb30 ">
              <h6 className="mb25">{section.title}</h6>
              <ul className="link-list ps-0">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="footer-widget mb-4 mb-lg-5 ps-0 ps-lg-5">
          <div className="link-style1 light-style mb-3">
            <h6 className="mb25">바로 가기</h6>
            <ul className="ps-0">
              <li>
                <a href="dashboard-add-property">매물 등록</a>
              </li>
              <li>
                <a href="dashboard-message">채팅 목록</a>
              </li>
              <li>
                <a href="dashboard-chargePoint">포인트 충전</a>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default MenuWidget;
