import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/property/dashboard/Footer";
import Pricing from "@/components/pages/pricing/Pricing";

export const metadata = {
  title: "BangEZ",
};

const DashboardChargePoint = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader/>
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
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>포인트 충전하기</h2>
                    <p className="text">포인트 결제하고 원하는 매물을 등록하세요!</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                {/* <ListingsFavourites /> */}
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="mt30">
                      {/* <Pagination /> */}
                      <Pricing />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}
              {/* 추가된 섹션: 좌우 이미지 */}
              <div className="row justify-content-center align-items-center pb40">
                <div className="col-md-5 text-center">
                  <img
                    src="/images/ncp/NCP.jpg"
                    alt="Left Image"
                    style={{
                      maxWidth: '100%',
                      height: '300px',
                      maxHeight: '300px', // 원하는 최대 높이
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div className="col-md-5 text-center">
                  <img
                    src="/images/ncp/bit.jpg"
                    alt="Right Image"
                    style={{
                      maxWidth: '100%',
                      height: '300px',
                      maxHeight: '300px', // 원하는 최대 높이
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
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

export default DashboardChargePoint;
