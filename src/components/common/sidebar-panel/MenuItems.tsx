import { useRouter } from 'next/navigation';
import React from 'react';
import Cookies from 'js-cookie';

const MenuItems = () => {
  const router = useRouter();
  const menuItems = [
    { id: 1, href: "/dashboard-add-property", title: "매물등록" },
    { id: 2, href: "/dashboard-message", title: "채팅목록" },
    { id: 3, href: "/dashboard-chargePoint", title: "포인트충전" },
    // { id: 4, href: "/admin", title: "관리자 페이지" },
    { id: 5, href: "/", title: "로그아웃" },
    // { id: 5, title: "Office" },
    // { id: 6, title: "Townhome" },
    // { id: 7, title: "Villa" },
  ];

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    //로그아웃 요청, 현재 프론트의 쿠키는 삭제 되지만 서버에서 토큰 오류로 인해 레디스 refresh토큰이 삭제되지 않음
    try {
      const refresh = Cookies.get('refreshToken');
      const response = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refresh?.trim()}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.reload();
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          {item.title === "로그아웃" ? (
            <a className="nav-link" href={item.href} onClick={handleLogout} role="button">
              {item.title}
            </a>
          ) : (
            <a className="nav-link" href={item.href} role="button">
              {item.title}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
