import { useUserStore } from "@/stores/useUserStore";
import ContactInfo from "./ContactInfo";
import MenuItems from "./MenuItems";
import SocialLinks from "./SocialLinks";
import { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { CustomJwtPayload } from "@/types/ChatData";

const SidebarPanel = () => {

  const user = useUserStore((state) => state.user);

  const [accessToken, setAccessToken] = useState<string | undefined>();
  useEffect(() => {
    const token = Cookies.get('accessToken');
    setAccessToken(token);
    
    if (token) {
      try {
        const decodedToken: CustomJwtPayload = jwtDecode(token);
        console.log('decodeToken ', decodedToken);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    };
  }, []);
  return (
    <div className="rightside-hidden-bar">
      <div className="hsidebar-header">
        <div
          className="sidebar-close-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <span className="far fa-times"></span>
        </div>
        {accessToken ?
          <h4 className="title">안녕하세요, {user?.name}님!</h4>
          :
          <h4 className="title"><a href="/login" className="">로그인</a></h4>}
      </div>
      {/* End header */}

      <div className="hsidebar-content">
        <div className="hiddenbar_navbar_content">
          <div className="hiddenbar_navbar_menu">
            <MenuItems />
          </div>
          {/* End .hiddenbar_navbar_menu */}

          {/* <div className="hiddenbar_footer position-relative bdrt1"> */}
            {/* <div className="row pt45 pb30 pl30">
              <ContactInfo />
            </div> */}
            {/* End .row */}

            {/* <div className="row pt30 pb30 bdrt1"> */}
              {/* <div className="col-auto"> */}
                {/* <div className="social-style-sidebar d-flex align-items-center pl30"> */}
                  {/* <h6 className="me-4 mb-0">Follow us</h6> */}
                  {/* <SocialLinks /> */}
                {/* </div> */}
              {/* </div> */}
            {/* </div> */}
          {/* </div> */}
          {/* hiddenbar_footer */}
        </div>
      </div>
      {/* End hsidebar-content */}
    </div>
  );
};

export default SidebarPanel;
