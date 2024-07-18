const MenuItems = () => {
  const menuItems = [
    { id:1, href: "#", title: "내 정보" },
    { id:2,href: "#", title: "방 내놓기" },
    { id:3,href: "#", title: "찜한 매물" },
    { id:4,href: "#", title: "회원 정보 수정" },
    { id:5,href: "#", title: "로그아웃" },
    // { id: 5, title: "Office" },
    // { id: 6, title: "Townhome" },
    // { id: 7, title: "Villa" },
  ];

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <a className="nav-link" href={item.href} role="button">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
