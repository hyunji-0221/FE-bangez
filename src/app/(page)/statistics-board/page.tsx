'use client'

import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import PropertyDataTable from "@/components/statistics/RankingTable";
import { BarChart, LineChart } from "@/components/statistics/barAndLineChart";
import { BoxChart } from "@/components/statistics/boxChart";
import { PieChart } from "@/components/statistics/pieChart";

const DashboardHome = () => {

  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate)


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
        <div className="dashboard dashboard_wrapper pr30 pr0-xl" style={{ display: 'flex' }}>
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb1">
                <div className="col-lg-12">
                  <DboardMobileNavigation />

                </div>
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2> BANGEZ 통계보드 </h2>
                    <p className="text">최종 업데이트 날짜 : {formattedDate}</p>
                  </div>
                </div>
                {/* col-lg-12 */}
              </div>
              {/* End .row */}

              {/* <div className="row">
                <TopStateBlock />
              </div> */}
              {/* End .row */}

              <div className="row">
                <div className="col-xl-7" >
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                      < BarChart />
                    </div>
                  </div>
                </div>
                <div className="col-xl-5"  >
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb25">최근 1년간 아파트 거래량 순위</h4>
                    <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                      <PropertyDataTable />
                    </div>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="row" style={{ height: '100%' }}>
                      < PieChart />
                    </div>
                  </div>
                </div>
                {/* End col-xl-8 */}
                <div className="col-xl-7">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative" >
                    <div className="row" >
                      <LineChart />
                    </div>
                  </div>
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    {/* <h4 className="title fz17 mb25">지역별 평당 가격 범위</h4> */}
                    <BoxChart />
                  </div>
                </div>
                {/* End .col-xl-4 */}
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

export default DashboardHome;
