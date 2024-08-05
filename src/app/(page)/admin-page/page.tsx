'use client'

import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import { getUserCount } from "@/components/statistics-api/StatisticsAPI";
import TopStateBlock from "@/components/statistics/TopStateBlock";
import { useEffect, useState } from "react";

const DashboardHome = () => {

  const [count, setCount] = useState()

  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate)
  
useEffect(() => {
  const fetchCount = async () => {
    try {
        const data = await getUserCount()
        console.log("fetchcount안의 data", data.count)
        setCount(data.count);
    } catch (error) {
        console.error('Error fetching access count:', error);
    }
};

fetchCount();
const intervalId = setInterval(fetchCount, 60000); // 60초마다 업데이트

return () => clearInterval(intervalId);
}, [])

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
                    <h2> 관리자 페이지 </h2>
                    <p className="text">최종 업데이트 날짜 : {formattedDate}</p>
                  </div>
                </div>
                {/* col-lg-12 */}
              </div>
              {/* End .row */}

              <div className="row">
                <TopStateBlock />
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
