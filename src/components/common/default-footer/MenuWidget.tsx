import React from "react";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "매물",
      links: [
        { label: "매물 보기", href: "/map-v4" },
        // { label: "Apartment Low to Hide", href: "#" },
        // { label: "Offices for Buy", href: "#" },
        // { label: "Offices for Rent", href: "#" },
      ],
    },
    {
      title: "입지 정보",
      links: [
        // { label: "마이페이지", href: "#" },
        // { label: "매물 등록하기", href: "/dashboard-add-property" },
        // { label: "Our Services", href: "#" },
        { label: "부동산 통계 정보", href: "/statistics-board" },
        { label: "학교 정보", href: "/school-list" },
        // { label: "FAQs", href: "#" },
      ],
    },
    {
      title: "바로 가기",
      links: [
        { label: "매물 등록하기", href: "/dashboard-add-property" },
        { label: "방 구해요", href: "/buy-board" },
        { label: "포인트 충전", href: "/dashboard-chargePoint" },
        { label: "채팅 목록", href: "/dashboard-message" },
        // { label: "New York", href: "#" },
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
